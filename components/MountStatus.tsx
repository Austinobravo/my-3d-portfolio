"use client";

import { useEffect, useState } from "react";

export default function MountStatus() {
  const [mounted, setMounted] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    // Executes strictly on client-side JS evaluation and hydration
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        zIndex: 99999,
        padding: "10px 14px",
        borderRadius: "8px",
        fontFamily: "sans-serif",
        fontSize: "12px",
        fontWeight: "bold",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        backgroundColor: mounted ? "#16a34a" : "#dc2626",
        color: "#ffffff",
      }}
    >
      <div>Status: {mounted ? "REACT MOUNTED ✅" : "SERVER HTML ONLY ❌"}</div>
      {mounted && (
        <button
          onClick={() => setClickCount((prev) => prev + 1)}
          style={{
            marginTop: "6px",
            padding: "4px 8px",
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Test Event (Clicks: {clickCount})
        </button>
      )}
    </div>
  );
}