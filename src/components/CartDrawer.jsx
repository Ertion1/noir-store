import { useState } from "react";
import { PROMO_CODES } from "../data/products";

export default function CartDrawer({
  open,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  promo,
  onApplyPromo,
  onRemovePromo,
}) {
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const FREE_SHIPPING_THRESHOLD = 200;
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  // Discount calculation
  let discountAmount = 0;
  if (promo && promo.discountPercent) {
    discountAmount = Math.round((subtotal * promo.discountPercent) / 100);
  }

  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15;
  const tax = Math.round((subtotal - discountAmount) * 0.08);
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping + tax);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    const cleaned = promoInput.trim().toUpperCase();
    if (!cleaned) return;

    if (PROMO_CODES[cleaned]) {
      onApplyPromo(PROMO_CODES[cleaned]);
      setPromoInput("");
    } else {
      setPromoError("Invalid code. Try 'NOIR10' or 'VIPBLACK'");
    }
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`cart-overlay ${open ? "open" : ""}`}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(5,5,5,0.75)",
          backdropFilter: "blur(6px)",
          zIndex: 400,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* DRAWER */}
      <div
        className={`cart-drawer ${open ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "480px",
          maxWidth: "100%",
          backgroundColor: "#0d0d0d",
          borderLeft: "1px solid rgba(201,169,110,0.2)",
          zIndex: 401,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.8)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "24px 28px",
            borderBottom: "1px solid var(--gray3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                fontWeight: 300,
                color: "var(--white)",
              }}
            >
              Your Bag
            </div>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              {cart.reduce((s, i) => s + i.qty, 0)} Items Selected
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close cart"
            style={{
              background: "none",
              border: "none",
              color: "var(--gray5)",
              fontSize: "26px",
              cursor: "pointer",
              lineHeight: 1,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray5)")}
          >
            ×
          </button>
        </div>

        {/* FREE SHIPPING PROGRESS BAR */}
        <div
          style={{
            padding: "16px 28px",
            backgroundColor: "rgba(255,255,255,0.02)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "11px",
              letterSpacing: "0.08em",
              marginBottom: "8px",
            }}
          >
            {amountNeeded === 0 ? (
              <span style={{ color: "#34d399", fontWeight: 600 }}>
                ✓ You have unlocked FREE Express Shipping!
              </span>
            ) : (
              <span style={{ color: "var(--white)" }}>
                Add <strong style={{ color: "var(--gold)" }}>${amountNeeded}</strong> more for Free Express Shipping
              </span>
            )}
            <span style={{ color: "var(--gray6)" }}>{Math.round(shippingProgress)}%</span>
          </div>

          {/* PROGRESS TRACK */}
          <div
            style={{
              width: "100%",
              height: "4px",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${shippingProgress}%`,
                height: "100%",
                backgroundColor: amountNeeded === 0 ? "#34d399" : "var(--gold)",
                transition: "width 0.4s ease, background-color 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* CART ITEMS BODY */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 28px",
          }}
        >
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--gray5)" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px", color: "var(--gray4)" }}>○</div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  color: "var(--gray6)",
                  marginBottom: "8px",
                }}
              >
                Your bag is empty
              </div>
              <p style={{ fontSize: "13px", color: "var(--gray5)", maxWidth: "260px", margin: "0 auto 24px" }}>
                Discover our latest dark drops and performance combat apparel.
              </p>
              <button className="btn btn-gold btn-sm" onClick={onClose}>
                Explore Collection
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {cart.map((item) => {
                const itemImg = item.imageUrls && item.imageUrls[0] ? item.imageUrls[0] : "";
                return (
                  <div
                    key={`${item.id}-${item.size}`}
                    style={{
                      display: "flex",
                      gap: "16px",
                      paddingBottom: "16px",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      position: "relative",
                    }}
                  >
                    {/* THUMBNAIL */}
                    <div
                      style={{
                        width: "76px",
                        height: "94px",
                        backgroundColor: "#141414",
                        borderRadius: "2px",
                        overflow: "hidden",
                        flexShrink: 0,
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <img
                        src={itemImg}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80";
                        }}
                      />
                    </div>

                    {/* META & ACTIONS */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--gold)",
                          marginBottom: "4px",
                        }}
                      >
                        {item.brand}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "16px",
                          color: "var(--white)",
                          marginBottom: "4px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--gray6)",
                          letterSpacing: "0.08em",
                          marginBottom: "10px",
                        }}
                      >
                        Size: <strong style={{ color: "var(--white)" }}>{item.size}</strong>
                      </div>

                      {/* CONTROLS */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid var(--gray3)",
                            borderRadius: "2px",
                          }}
                        >
                          <button
                            onClick={() => onUpdateQty(item, item.qty - 1)}
                            style={{
                              width: "28px",
                              height: "28px",
                              background: "none",
                              border: "none",
                              color: "var(--white)",
                              cursor: "pointer",
                            }}
                          >
                            −
                          </button>
                          <div
                            style={{
                              width: "28px",
                              textAlign: "center",
                              fontSize: "12px",
                            }}
                          >
                            {item.qty}
                          </div>
                          <button
                            onClick={() => onUpdateQty(item, item.qty + 1)}
                            style={{
                              width: "28px",
                              height: "28px",
                              background: "none",
                              border: "none",
                              color: "var(--white)",
                              cursor: "pointer",
                            }}
                          >
                            +
                          </button>
                        </div>

                        <div
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "16px",
                            color: "var(--gold)",
                          }}
                        >
                          ${item.price * item.qty}
                        </div>
                      </div>
                    </div>

                    {/* REMOVE BTN */}
                    <button
                      onClick={() => onRemoveItem(item)}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: "none",
                        border: "none",
                        color: "var(--gray5)",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                      title="Remove item"
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6b6b")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray5)")}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER & CHECKOUT */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "20px 28px 28px",
              borderTop: "1px solid var(--gray3)",
              backgroundColor: "#0a0a0a",
            }}
          >
            {/* PROMO CODE SECTION */}
            <div style={{ marginBottom: "18px" }}>
              {promo ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    backgroundColor: "rgba(201,169,110,0.12)",
                    border: "1px solid var(--gold)",
                    borderRadius: "2px",
                    fontSize: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--gold)" }}>
                    <span>🏷️</span>
                    <span>
                      <strong>{promo.code}</strong> Applied ({promo.discountPercent}% OFF)
                    </span>
                  </div>
                  <button
                    onClick={onRemovePromo}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--gray5)",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    placeholder="Promo code (e.g. NOIR10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: `1px solid ${promoError ? "#ef4444" : "var(--gray3)"}`,
                      padding: "10px 14px",
                      color: "var(--white)",
                      fontSize: "12px",
                      borderRadius: "2px",
                      outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: "0 18px",
                      backgroundColor: "rgba(255,255,255,0.08)",
                      border: "1px solid var(--gray3)",
                      color: "var(--white)",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      borderRadius: "2px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--gold)";
                      e.currentTarget.style.color = "var(--gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--gray3)";
                      e.currentTarget.style.color = "var(--white)";
                    }}
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <div style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px" }}>
                  {promoError}
                </div>
              )}
            </div>

            {/* BREAKDOWN */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--gray6)" }}>
                <span>Subtotal</span>
                <span style={{ color: "var(--white)" }}>${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--gold)" }}>
                  <span>Promo Discount ({promo.discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--gray6)" }}>
                <span>Estimated Tax (8%)</span>
                <span style={{ color: "var(--white)" }}>${tax.toFixed(2)}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--gray6)" }}>
                <span>Express Shipping</span>
                <span style={{ color: shipping === 0 ? "var(--gold)" : "var(--white)" }}>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  borderTop: "1px solid var(--gray3)",
                  paddingTop: "12px",
                  marginTop: "4px",
                }}
              >
                <span style={{ fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gray6)" }}>
                  Estimated Total
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--white)", fontWeight: 400 }}>
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* CHECKOUT ACTION */}
            <button
              className="btn btn-gold"
              onClick={onCheckout}
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "16px",
                fontSize: "12px",
                letterSpacing: "0.18em",
              }}
            >
              Checkout Now · ${finalTotal.toFixed(2)}
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <div
              style={{
                textAlign: "center",
                marginTop: "12px",
                fontSize: "11px",
                color: "var(--gray5)",
                letterSpacing: "0.08em",
              }}
            >
              🔒 256-Bit SSL Encrypted Checkout · 30-Day Returns
            </div>
          </div>
        )}
      </div>
    </>
  );
}
