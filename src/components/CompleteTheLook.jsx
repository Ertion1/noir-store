import { useMemo } from "react";

export default function CompleteTheLook({ currentProduct, allProducts, onAddBundle, onViewProduct }) {
  const bundleItems = useMemo(() => {
    if (!currentProduct || !allProducts) return [];

    let paired = [];
    if (currentProduct.bundleIds && currentProduct.bundleIds.length > 0) {
      paired = currentProduct.bundleIds
        .map((id) => allProducts.find((p) => p.id === id))
        .filter(Boolean);
    }

    // Fallback if less than 2
    if (paired.length < 2) {
      const fallbacks = allProducts.filter(
        (p) => p.id !== currentProduct.id && !paired.some((item) => item.id === p.id)
      );
      while (paired.length < 2 && fallbacks.length > 0) {
        paired.push(fallbacks.shift());
      }
    }

    return paired.slice(0, 2);
  }, [currentProduct, allProducts]);

  if (!bundleItems || bundleItems.length < 2) return null;

  const allThree = [currentProduct, ...bundleItems];
  const originalTotal = allThree.reduce((sum, item) => sum + item.price, 0);
  const discountRate = 0.15; // 15% bundle discount
  const bundleTotal = Math.round(originalTotal * (1 - discountRate));
  const savings = originalTotal - bundleTotal;

  return (
    <div
      style={{
        marginTop: "32px",
        padding: "24px",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(201,169,110,0.2)",
        borderRadius: "4px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 600,
            }}
          >
            Curated Architectural Styling
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: 300,
              color: "#f5f5f0",
              margin: "4px 0 0",
            }}
          >
            Complete the <em style={{ color: "var(--gold)" }}>Look</em>
          </h3>
        </div>

        <div
          style={{
            padding: "4px 10px",
            backgroundColor: "rgba(201,169,110,0.15)",
            border: "1px solid var(--gold)",
            borderRadius: "2px",
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--gold)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Bundle & Save 15% (${savings})
        </div>
      </div>

      {/* ITEMS VISUAL STRIP */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          overflowX: "auto",
          paddingBottom: "12px",
        }}
      >
        {allThree.map((item, index) => {
          const isCurrent = index === 0;
          return (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "90px",
                  cursor: isCurrent ? "default" : "pointer",
                  position: "relative",
                }}
                onClick={() => {
                  if (!isCurrent && onViewProduct) onViewProduct(item);
                }}
              >
                <div
                  style={{
                    width: "90px",
                    height: "110px",
                    backgroundColor: "#141414",
                    borderRadius: "2px",
                    overflow: "hidden",
                    border: `1px solid ${isCurrent ? "var(--gold)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  <img
                    src={item.imageUrls[0]}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  {isCurrent && (
                    <div
                      style={{
                        position: "absolute",
                        top: "4px",
                        left: "4px",
                        padding: "2px 6px",
                        backgroundColor: "var(--gold)",
                        color: "#050505",
                        fontSize: "8px",
                        fontWeight: 700,
                        borderRadius: "1px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      This Item
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#f5f5f0",
                    marginTop: "6px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={item.name}
                >
                  {item.name}
                </div>
                <div style={{ fontSize: "11px", color: "var(--gold)", fontWeight: 600 }}>
                  ${item.price}
                </div>
              </div>

              {index < 2 && (
                <span
                  style={{
                    fontSize: "18px",
                    color: "rgba(255,255,255,0.3)",
                    fontWeight: 300,
                    margin: "0 2px",
                  }}
                >
                  +
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* BUNDLE FOOTER & ACTION */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "16px",
          marginTop: "12px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <div style={{ fontSize: "11px", color: "var(--gray6)" }}>
            Total Bundle Value:{" "}
            <span style={{ textDecoration: "line-through", color: "var(--gray5)" }}>
              ${originalTotal}
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "24px",
              color: "var(--white)",
              fontWeight: 400,
            }}
          >
            ${bundleTotal}{" "}
            <span style={{ fontSize: "12px", color: "var(--gold)", fontFamily: "var(--font-body)" }}>
              (15% OFF Applied)
            </span>
          </div>
        </div>

        <button
          className="btn btn-gold btn-sm"
          onClick={() => onAddBundle(allThree, bundleTotal)}
          style={{
            padding: "12px 24px",
            fontSize: "11px",
            letterSpacing: "0.15em",
          }}
        >
          Add 3 Items to Cart
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
