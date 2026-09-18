import { VIBES } from "../data/products";

export default function VibeFilter({ selectedVibe, onSelectVibe, counts = {} }) {
  return (
    <div style={{ margin: "24px 0 36px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "12px",
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
          fontWeight: 600,
        }}
      >
        <span style={{ width: "16px", height: "1px", backgroundColor: "var(--gold)" }} />
        Shop By Vibe & Aesthetic
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "8px",
          scrollbarWidth: "none",
        }}
      >
        {VIBES.map((vibe) => {
          const isActive = selectedVibe === vibe;
          const count = counts[vibe];
          return (
            <button
              key={vibe}
              onClick={() => onSelectVibe(vibe)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                backgroundColor: isActive ? "var(--gold)" : "rgba(255,255,255,0.03)",
                color: isActive ? "#050505" : "#e8e4de",
                border: `1px solid ${isActive ? "var(--gold)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: "2px",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.25s ease",
                boxShadow: isActive ? "0 4px 16px rgba(201,169,110,0.3)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.color = "var(--white)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "#e8e4de";
                }
              }}
            >
              <span>{vibe}</span>
              {count !== undefined && (
                <span
                  style={{
                    fontSize: "10px",
                    padding: "2px 6px",
                    borderRadius: "10px",
                    backgroundColor: isActive ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.08)",
                    color: isActive ? "#050505" : "var(--gray6)",
                    fontWeight: 600,
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
