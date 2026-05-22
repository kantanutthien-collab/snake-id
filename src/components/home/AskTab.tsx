"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  askSuggestions,
  askWelcome,
  matchAnswer,
} from "@/data/ask-qa";
import { BOTTOM_BAR_HEIGHT } from "./BottomTabBar";
import { C, F } from "./theme";

type Role = "bot" | "user";

interface Msg {
  id: string;
  role: Role;
  text: string;
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "85%",
          padding: "10px 14px",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          background: isUser
            ? "linear-gradient(180deg, #7E5BC4 0%, #4A2B7A 100%)"
            : C.surface,
          color: isUser ? "#FFFFFF" : C.ink,
          border: isUser
            ? "1px solid rgba(200,170,240,0.30)"
            : `1px solid ${C.hair}`,
          fontFamily: F.ui,
          fontSize: 13.5,
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          boxShadow: isUser
            ? "0 6px 14px -8px rgba(126,91,196,0.5)"
            : "none",
        }}
      >
        {msg.text}
      </div>
    </div>
  );
}

export function AskTab() {
  const [messages, setMessages] = useState<Msg[]>(() => [
    { id: "welcome", role: "bot", text: askWelcome },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const send = useCallback((text: string) => {
    const t = text.trim();
    if (!t) return;
    const userMsg: Msg = { id: makeId(), role: "user", text: t };
    const botMsg: Msg = { id: makeId(), role: "bot", text: matchAnswer(t) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: `calc(100dvh - 86px - ${BOTTOM_BAR_HEIGHT}px - env(safe-area-inset-top) - env(safe-area-inset-bottom))`,
        minHeight: 400,
        padding: "8px 16px 0",
      }}
    >
      <div
        style={{
          fontFamily: F.disp,
          fontStyle: "italic",
          fontSize: 24,
          color: C.ink,
          marginBottom: 4,
        }}
      >
        Ask
      </div>
      <div
        style={{
          fontFamily: F.mono,
          fontSize: 10,
          color: C.ink3,
          letterSpacing: 0.6,
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        Snake & forest safety helper · offline
      </div>

      {/* Chat — flexes to fill available space, scrolls internally */}
      <div
        ref={chatRef}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          paddingBottom: 8,
        }}
      >
        {messages.map((m) => (
          <Bubble key={m.id} msg={m} />
        ))}
        <div ref={endRef} />
      </div>

      {/* Footer pinned to flex column bottom: suggestions + input */}
      <div
        style={{
          marginInline: -16,
          padding: "12px 16px",
          background: C.cream,
          borderTop: `1px solid ${C.hair}`,
        }}
      >
        {/* Quick suggestions — horizontal scroll */}
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          {askSuggestions.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => send(s.label)}
              style={{
                flexShrink: 0,
                padding: "8px 12px",
                borderRadius: 999,
                background: C.surface,
                border: `1px solid ${C.hair}`,
                color: C.ink,
                fontFamily: F.ui,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span aria-hidden>{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Input row */}
        <div
          style={{
            marginTop: 10,
            display: "flex",
            gap: 8,
            alignItems: "flex-end",
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Type your question here…"
            rows={2}
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 14,
              background: C.surface,
              border: `1px solid ${C.hair}`,
              color: C.ink,
              fontFamily: F.ui,
              fontSize: 14,
              resize: "none",
              outline: "none",
            }}
          />
          <button
            type="button"
            onClick={() => send(input)}
            disabled={!input.trim()}
            style={{
              padding: "10px 16px",
              borderRadius: 14,
              background: input.trim() ? "var(--sid-bg-cta)" : C.surface,
              color: "#FFFFFF",
              border: "none",
              cursor: input.trim() ? "pointer" : "default",
              fontFamily: F.ui,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 0.4,
              boxShadow: input.trim() ? "var(--sid-shadow-cta)" : "none",
              opacity: input.trim() ? 1 : 0.5,
            }}
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
