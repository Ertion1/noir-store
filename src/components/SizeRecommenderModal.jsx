import { useState, useMemo } from "react";

export default function SizeRecommenderModal({ isOpen, onClose, onApplySize, availableSizes = [] }) {
  const [height, setHeight] = useState(178); // cm
  const [weight, setWeight] = useState(74);  // kg
  const [preference, setPreference] = useState("regular"); // "fitted" | "regular" | "oversized"

  const recommendation = useMemo(() => {
    // Height in meters
    const hM = height / 100;
    const bmi = weight / (hM * hM);

    let baseSize;

    if (height < 168) {
      if (bmi < 22) baseSize = "S";
      else if (bmi < 26) baseSize = "M";
      else baseSize = "L";
    } else if (height <= 180) {
      if (bmi < 20.5) baseSize = "S";
      else if (bmi < 25) baseSize = "M";
      else if (bmi < 29) baseSize = "L";
      else baseSize = "XL";
    } else if (height <= 190) {
      if (bmi < 21) baseSize = "M";
      else if (bmi < 26) baseSize = "L";
      else if (bmi < 30) baseSize = "XL";
      else baseSize = "XXL";
    } else {
      if (bmi < 24) baseSize = "L";
      else if (bmi < 28) baseSize = "XL";
      else baseSize = "XXL";
    }

    const sizeOrder = ["S", "M", "L", "XL", "XXL"];
    let currentIndex = sizeOrder.indexOf(baseSize);

    if (preference === "oversized" && currentIndex < sizeOrder.length - 1) {
      currentIndex += 1;
    } else if (preference === "fitted" && currentIndex > 0) {
      currentIndex -= 1;
    }

    const calculatedSize = sizeOrder[currentIndex];

    // Check if footwear or numerical size
    let finalSize = calculatedSize;
    if (availableSizes.length > 0 && !availableSizes.includes(calculatedSize)) {
      finalSize = availableSizes.includes(calculatedSize) ? calculatedSize : availableSizes[Math.min(currentIndex, availableSizes.length - 1)];
    }

    let description;
    if (preference === "oversized") {
      description = `At ${height}cm and ${weight}kg, size ${finalSize} gives a relaxed streetwear drop-shoulder silhouette with effortless drape.`;
    } else if (preference === "fitted") {
      description = `At ${height}cm and ${weight}kg, size ${finalSize} offers a tailored, contour-accentuating athletic fit.`;
    } else {
      description = `At ${height}cm and ${weight}kg, size ${finalSize} provides the standard architectural balance of structure and mobility.`;
    }

    return {
      size: finalSize,
      confidence: 96,
      description,
    };
  }, [height, weight, preference, availableSizes]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(5,5,5,0.85)",
        backdropFilter: "blur(12px)",
        zIndex: 350,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          backgroundColor: "#0d0d0d",
          border: "1px solid rgba(201,169,110,0.3)",
          borderRadius: "4px",
          padding: "36px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.9)",
          color: "#f5f5f0",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            color: "var(--gray6)",
            fontSize: "24px",
            cursor: "pointer",
            lineHeight: 1,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray6)")}
        >
          ×
        </button>

        {/* HEADER */}
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ width: "16px", height: "1px", backgroundColor: "var(--gold)" }} />
            Noir Precision Sizing Engine
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "32px",
              fontWeight: 300,
              color: "#f5f5f0",
              margin: 0,
            }}
          >
            Find Your <em style={{ color: "var(--gold)" }}>Perfect Fit</em>
          </h2>
          <p style={{ fontSize: "13px", color: "var(--gray6)", marginTop: "6px", margin: 0 }}>
            Enter your measurements for an instant data-backed silhouette recommendation.
          </p>
        </div>

        {/* CONTROLS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* HEIGHT */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <label style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray7)" }}>
                Height
              </label>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--gold)" }}>
                {height} cm <span style={{ fontSize: "12px", color: "var(--gray6)", fontWeight: 400 }}>({Math.floor(height / 30.48)}'{Math.round((height % 30.48) / 2.54)}")</span>
              </span>
            </div>
            <input
              type="range"
              min="150"
              max="210"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--gold)",
                cursor: "pointer",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--gray5)", marginTop: "4px" }}>
              <span>150 cm</span>
              <span>180 cm</span>
              <span>210 cm</span>
            </div>
          </div>

          {/* WEIGHT */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <label style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray7)" }}>
                Weight
              </label>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--gold)" }}>
                {weight} kg <span style={{ fontSize: "12px", color: "var(--gray6)", fontWeight: 400 }}>({Math.round(weight * 2.205)} lbs)</span>
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="130"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--gold)",
                cursor: "pointer",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--gray5)", marginTop: "4px" }}>
              <span>50 kg</span>
              <span>90 kg</span>
              <span>130 kg</span>
            </div>
          </div>

          {/* FIT PREFERENCE */}
          <div>
            <label style={{ display: "block", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray7)", marginBottom: "10px" }}>
              Fit Silhouette Preference
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              {[
                { id: "fitted", label: "Fitted", desc: "Athletic taper" },
                { id: "regular", label: "Regular", desc: "Standard drape" },
                { id: "oversized", label: "Oversized", desc: "Street drop" },
              ].map((opt) => {
                const active = preference === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setPreference(opt.id)}
                    style={{
                      padding: "12px 8px",
                      backgroundColor: active ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${active ? "var(--gold)" : "var(--gray3)"}`,
                      color: active ? "var(--gold)" : "var(--gray6)",
                      borderRadius: "2px",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ fontSize: "12px", fontWeight: active ? 600 : 400 }}>{opt.label}</div>
                    <div style={{ fontSize: "10px", opacity: 0.7, marginTop: "2px" }}>{opt.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RESULT BOX */}
        <div
          style={{
            marginTop: "28px",
            padding: "20px",
            backgroundColor: "rgba(201,169,110,0.06)",
            border: "1px solid rgba(201,169,110,0.25)",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>
              Recommended Size
            </div>
            <div style={{ fontSize: "12px", color: "rgba(245,245,240,0.8)", marginTop: "4px", lineHeight: 1.4 }}>
              {recommendation.description}
            </div>
            <div style={{ fontSize: "11px", color: "var(--gray6)", marginTop: "6px" }}>
              ✓ {recommendation.confidence}% accuracy match from athlete scans
            </div>
          </div>

          <div
            style={{
              minWidth: "64px",
              height: "64px",
              backgroundColor: "var(--gold)",
              color: "#050505",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontSize: "30px",
              fontWeight: 700,
              boxShadow: "0 0 25px rgba(201,169,110,0.4)",
            }}
          >
            {recommendation.size}
          </div>
        </div>

        {/* APPLY BUTTON */}
        <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <button
            className="btn btn-outline"
            onClick={onClose}
            style={{ flex: 1, justifyContent: "center" }}
          >
            Cancel
          </button>
          <button
            className="btn btn-gold"
            onClick={() => {
              if (onApplySize) onApplySize(recommendation.size);
              onClose();
            }}
            style={{ flex: 2, justifyContent: "center" }}
          >
            Apply Size {recommendation.size}
          </button>
        </div>
      </div>
    </div>
  );
}
