import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { matchScan, type AiIdentification } from "@/lib/match";
import type { IdentifyApiResponse } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

type SupportedMediaType =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/gif";

interface IdentifyRequest {
  imageBase64: string;
  mediaType: SupportedMediaType;
}

const SYSTEM_PROMPT = `You are a Thailand wildlife identifier for a field-safety app called Snake·ID.
A user has just taken or uploaded a photo. Your job is to identify what living creature is in the image.

Rules:
- If the most prominent subject is a SNAKE (any species, dead or alive, in the wild or in captivity), set "kind": "snake".
  Give the Latin scientific name (binomial: Genus species) in "scientific". Give the common English name in "common". If you know the standard Thai common name, include it in "thai".
- If the most prominent subject is any OTHER living creature (human, dog, cat, bird, lizard, fish, insect, etc.), set "kind": "other".
  Put a short single-word or two-word label in "common" (e.g. "Human", "Dog", "Cat", "Lizard"). Set "scientific" and "thai" to null.
- If the image contains no living creature, or you cannot identify what it is, set "kind": "other" and "common": "Unknown".
- "confidence" is a number between 0 and 1 reflecting how sure you are. Be honest — low confidence is fine.
- Output ONLY the JSON object described, no prose, no markdown fences.`;

function getJsonSchema() {
  return {
    type: "object" as const,
    properties: {
      kind: { type: "string" as const, enum: ["snake", "other"] },
      scientific: { anyOf: [{ type: "string" as const }, { type: "null" as const }] },
      common: { type: "string" as const },
      thai: { anyOf: [{ type: "string" as const }, { type: "null" as const }] },
      confidence: { type: "number" as const },
    },
    required: ["kind", "scientific", "common", "thai", "confidence"],
    additionalProperties: false,
  };
}

function safeParseAi(raw: string): AiIdentification | null {
  const cleaned = raw.trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
  try {
    const obj = JSON.parse(cleaned) as Record<string, unknown>;
    if (obj.kind !== "snake" && obj.kind !== "other") return null;
    if (typeof obj.common !== "string") return null;
    if (typeof obj.confidence !== "number") return null;
    return {
      kind: obj.kind,
      scientific:
        typeof obj.scientific === "string" ? obj.scientific : null,
      common: obj.common,
      thai: typeof obj.thai === "string" ? obj.thai : null,
      confidence: Math.max(0, Math.min(1, obj.confidence)),
    };
  } catch {
    return null;
  }
}

export async function POST(request: Request): Promise<NextResponse<IdentifyApiResponse>> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        error:
          "ANTHROPIC_API_KEY is not configured on the server. Add it to .env.local and restart.",
      },
      { status: 503 },
    );
  }

  let body: IdentifyRequest;
  try {
    body = (await request.json()) as IdentifyRequest;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (!body.imageBase64 || typeof body.imageBase64 !== "string") {
    return NextResponse.json(
      { error: "Missing imageBase64 field." },
      { status: 400 },
    );
  }

  const allowedMedia = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ]);
  if (!allowedMedia.has(body.mediaType)) {
    return NextResponse.json(
      { error: `Unsupported media type: ${body.mediaType}` },
      { status: 400 },
    );
  }

  const client = new Anthropic();

  let response;
  try {
    response = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      output_config: {
        format: {
          type: "json_schema",
          schema: getJsonSchema(),
        },
      },
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: body.mediaType,
                data: body.imageBase64,
              },
            },
            {
              type: "text",
              text: "Identify the most prominent living creature in this image and return the JSON object.",
            },
          ],
        },
      ],
    });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { error: "Invalid ANTHROPIC_API_KEY." },
        { status: 503 },
      );
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "Rate limited by Claude. Try again in a moment." },
        { status: 429 },
      );
    }
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `Claude API error (${error.status}): ${error.message}` },
        { status: 502 },
      );
    }
    return NextResponse.json(
      { error: "Unexpected error calling Claude." },
      { status: 500 },
    );
  }

  if (response.stop_reason === "refusal") {
    return NextResponse.json(
      { error: "Claude declined to identify this image." },
      { status: 422 },
    );
  }

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    return NextResponse.json(
      { error: "No text response from Claude." },
      { status: 502 },
    );
  }

  const ai = safeParseAi(textBlock.text);
  if (!ai) {
    return NextResponse.json(
      { error: "Could not parse Claude's response as JSON." },
      { status: 502 },
    );
  }

  const result = matchScan(ai);
  return NextResponse.json({ result });
}
