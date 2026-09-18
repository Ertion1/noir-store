import { useState, useEffect } from "react";

export default function DropTimer({ targetDate, compact = false }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    // Generate a consistent end time ~ 2 days in the future if not provided or valid
    const end = targetDate ? new Date(targetDate).getTime() : Date.now() + 1000 * 60 * 60 * 36;

    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, "0");

  if (compact) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "4px 10px",
          backgroundColor: "rgba(139,0,0,0.18)",
          border: "1px solid rgba(139,0,0,0.4)",
          borderRadius: "2px",
          fontSize: "11px",
          color: "#ff6b6b",
          fontWeight: 500,
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#ff4d4d",
            boxShadow: "0 0 8px #ff4d4d",
            animation: "pulse 1.5s infinite",
          }}
        />
        <span>Drop Closes:</span>
        <span style={{ fontFamily: "monospace", fontWeight: 700 }}>
          {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "16px 20px",
        backgroundColor: "rgba(139,0,0,0.12)",
        border: "1px solid rgba(139,0,0,0.35)",
        borderRadius: "2px",
        margin: "16px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#ff6b6b",
          fontWeight: 600,
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#ff4d4d",
            boxShadow: "0 0 10px #ff4d4d",
          }}
        />
        Limited Drop Countdown · High Urgency
      </div>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {[
          { label: "HRS", value: pad(timeLeft.hours) },
          { label: "MIN", value: pad(timeLeft.minutes) },
          { label: "SEC", value: pad(timeLeft.seconds) },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                backgroundColor: "#050505",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "8px 12px",
                borderRadius: "2px",
                textAlign: "center",
                minWidth: "52px",
              }}
            >
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#f5f5f0",
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: "var(--gray6)",
                  marginTop: "2px",
                }}
              >
                {item.label}
              </div>
            </div>
            {i < 2 && (
              <span style={{ fontSize: "18px", color: "var(--gray5)", fontWeight: 700 }}>:</span>
            )}
          </div>
        ))}

        <div style={{ marginLeft: "auto", fontSize: "12px", color: "var(--gray6)" }}>
          Strict allocation per customer
        </div>
      </div>
    </div>
  );
}
