"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EmergencyStrip } from "@/components/home/EmergencyStrip";
import { PrimaryCTA, type CTAMode } from "@/components/home/PrimaryCTA";
import { RecentList } from "@/components/home/RecentList";
import { ResultPeek } from "@/components/home/ResultPeek";
import { StatRow } from "@/components/home/StatRow";
import { TopBar } from "@/components/home/TopBar";
import { SpeciesList } from "@/components/home/SpeciesList";
import { TabMenu, type TabKey } from "@/components/home/TabMenu";
import { Viewfinder, type ViewfinderMode } from "@/components/home/Viewfinder";
import { C, F } from "@/components/home/theme";
import { processBlob, processVideoFrame } from "@/lib/image";
import { useHistory } from "@/lib/use-history";
import type { IdentifyApiResponse, ScanResult } from "@/lib/types";

const CITY = "Bangkok";

type Phase = "idle" | "camera" | "analyzing";

async function postIdentify(
  imageBase64: string,
  mediaType: "image/jpeg",
): Promise<IdentifyApiResponse> {
  const resp = await fetch("/api/identify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageBase64, mediaType }),
  });
  return (await resp.json()) as IdentifyApiResponse;
}

export default function Home() {
  const [tab, setTab] = useState<TabKey>("snakes");
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { entries, stats, addScan, hydrated } = useHistory();

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) track.stop();
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const openCamera = useCallback(async () => {
    setError(null);
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      setError(
        "Camera is not supported on this device. Use the Scan now button to upload a photo instead.",
      );
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch {
          // play() may reject if user navigates away — safe to ignore
        }
      }
      setPhase("camera");
    } catch {
      setError(
        "Camera permission denied. Use the Scan now button to upload a photo instead.",
      );
      stopCamera();
    }
  }, [stopCamera]);

  const sendAndShow = useCallback(
    async (
      imageBase64: string,
      mediaType: "image/jpeg",
      photoDataUrl: string,
    ) => {
      setPhase("analyzing");
      try {
        const data = await postIdentify(imageBase64, mediaType);
        if (data.error || !data.result) {
          setError(data.error ?? "Identification failed.");
          setPhase("idle");
          return;
        }
        setUserPhoto(photoDataUrl);
        setResult(data.result);
        addScan(data.result);
        setPhase("idle");
      } catch {
        setError("Network error while identifying. Check your connection.");
        setPhase("idle");
      }
    },
    [addScan],
  );

  const capture = useCallback(async () => {
    if (!videoRef.current) return;
    setError(null);
    try {
      const processed = await processVideoFrame(videoRef.current);
      stopCamera();
      await sendAndShow(processed.base64, processed.mediaType, processed.dataUrl);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Capture failed.";
      setError(message);
      stopCamera();
      setPhase("idle");
    }
  }, [stopCamera, sendAndShow]);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      try {
        const processed = await processBlob(file);
        await sendAndShow(processed.base64, processed.mediaType, processed.dataUrl);
      } catch {
        setError("Could not read that image. Try a different file.");
        setPhase("idle");
      }
    },
    [sendAndShow],
  );

  const onCTAClick = useCallback(() => {
    if (phase === "analyzing") return;
    if (phase === "camera") {
      void capture();
      return;
    }
    fileInputRef.current?.click();
  }, [phase, capture]);

  const onViewfinderTap = useCallback(() => {
    if (phase === "idle") void openCamera();
  }, [phase, openCamera]);

  const closeResult = useCallback(() => {
    setResult(null);
    setUserPhoto(null);
  }, []);

  const ctaMode: CTAMode = phase;
  const viewfinderMode: ViewfinderMode = phase === "camera" ? "live" : phase;

  return (
    <div
      style={{
        background: C.cream,
        color: C.ink,
        minHeight: "100vh",
        position: "relative",
        maxWidth: 480,
        margin: "0 auto",
        paddingTop: "max(16px, env(safe-area-inset-top))",
      }}
    >
      <TopBar city={CITY} />
      <TabMenu
        active={tab}
        onChange={(next) => {
          if (next !== "snakes") {
            stopCamera();
            setPhase("idle");
            setError(null);
          }
          setTab(next);
        }}
      />

      {tab === "snakes" ? (
        <>
          <Viewfinder
            mode={viewfinderMode}
            videoRef={videoRef}
            onTap={onViewfinderTap}
            onClose={() => {
              stopCamera();
              setPhase("idle");
            }}
          />
          <PrimaryCTA mode={ctaMode} onClick={onCTAClick} />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) void handleFile(file);
            }}
          />

          {error && (
            <div
              role="alert"
              style={{
                margin: "12px 16px 0",
                padding: "10px 14px",
                borderRadius: 12,
                background: "rgba(242,93,93,0.12)",
                border: "1px solid rgba(242,93,93,0.30)",
                color: "#F25D5D",
                fontFamily: F.mono,
                fontSize: 11,
                letterSpacing: 0.4,
                lineHeight: 1.5,
              }}
            >
              {error}
            </div>
          )}

          <StatRow stats={stats} />
          <RecentList entries={entries} hydrated={hydrated} />
          <EmergencyStrip />
        </>
      ) : (
        <SpeciesList />
      )}
      <div style={{ height: "max(16px, env(safe-area-inset-bottom))" }} />

      <ResultPeek
        result={result}
        userPhotoDataUrl={userPhoto}
        onClose={closeResult}
      />
    </div>
  );
}
