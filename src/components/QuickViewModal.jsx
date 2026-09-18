import { useState } from "react";
import DropTimer from "./DropTimer";
import CompleteTheLook from "./CompleteTheLook";
import SizeRecommenderModal from "./SizeRecommenderModal";

export default function QuickViewModal({
  product,
  allProducts,
  isOpen,
  onClose,
  onAddToCart,
  onAddBundle,
  wishlist,
  onWishlist,
  onViewProduct,
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product && product.sizes && product.sizes.length > 0 ? product.sizes[0] : "One Size"
  );
  const [qty, setQty] = useState(1);
  const [isSizeAdvisorOpen, setIsSizeAdvisorOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !product) return null;

  const images = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls
    : ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80"];

  const isLowStock = product.stockCount <= 3;
  const isWished = wishlist && wishlist.has(product.id);

  const handleAddToCart = () => {
    onAddToCart(product, { size: selectedSize, qty });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(5,5,5,0.85)",
          backdropFilter: "blur(12px)",
          zIndex: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
          overflowY: "auto",
        }}
        onClick={onClose}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "960px",
            maxHeight: "92vh",
            backgroundColor: "#0d0d0d",
            border: "1px solid rgba(201,169,110,0.25)",
            borderRadius: "4px",
            boxShadow: "0 30px 100px rgba(0,0,0,0.95)",
            color: "#f5f5f0",
            overflowY: "auto",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--gray6)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              cursor: "pointer",
              zIndex: 10,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--white)";
              e.currentTarget.style.borderColor = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--gray6)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            ×
          </button>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "36px",
              padding: "36px",
            }}
          >
            {/* GALLERY SECTION */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* MAIN IMAGE */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3/4",
                  backgroundColor: "#141414",
                  borderRadius: "3px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <img
                  src={images[activeImageIndex]}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80";
                  }}
                />

                {/* BADGE */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {product.isNewArrival && (
                    <span
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "var(--gold)",
                        color: "#050505",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      New Release
                    </span>
                  )}
                  {product.isBestseller && (
                    <span
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "#1a1a1a",
                        color: "var(--gold)",
                        border: "1px solid rgba(201,169,110,0.3)",
                        fontSize: "9px",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Bestseller
                    </span>
                  )}
                </div>

                {/* WISHLIST BUTTON */}
                <button
                  onClick={() => onWishlist(product.id)}
                  aria-label="Wishlist"
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(5,5,5,0.7)",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${isWished ? "var(--gold)" : "rgba(255,255,255,0.15)"}`,
                    color: isWished ? "var(--gold)" : "var(--white)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    fill={isWished ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* THUMBNAILS */}
              {images.length > 1 && (
                <div style={{ display: "flex", gap: "10px" }}>
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      style={{
                        width: "68px",
                        height: "80px",
                        backgroundColor: "#141414",
                        border: `1px solid ${activeImageIndex === i ? "var(--gold)" : "rgba(255,255,255,0.1)"}`,
                        borderRadius: "2px",
                        overflow: "hidden",
                        cursor: "pointer",
                        padding: 0,
                        opacity: activeImageIndex === i ? 1 : 0.6,
                        transition: "all 0.2s",
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PRODUCT DETAILS & BUY SECTION */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* CATEGORY & BRAND */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "8px",
                }}
              >
                <span>{product.brand}</span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span>{product.category}</span>
                {product.vibe && (
                  <>
                    <span style={{ opacity: 0.4 }}>•</span>
                    <span style={{ color: "var(--gray6)" }}>{product.vibe}</span>
                  </>
                )}
              </div>

              {/* TITLE */}
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(26px, 3.5vw, 36px)",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  color: "var(--white)",
                  marginBottom: "12px",
                }}
              >
                {product.name}
              </h1>

              {/* REVIEWS */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                  fontSize: "12px",
                }}
              >
                <div style={{ display: "flex", color: "var(--gold)" }}>
                  {"★".repeat(Math.round(product.rating))}
                  {"☆".repeat(5 - Math.round(product.rating))}
                </div>
                <span style={{ color: "var(--white)", fontWeight: 600 }}>{product.rating}</span>
                <span style={{ color: "var(--gray6)" }}>({product.reviewsCount} reviews)</span>
              </div>

              {/* PRICE */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "16px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "30px",
                    fontWeight: 400,
                    color: "var(--white)",
                  }}
                >
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span
                    style={{
                      fontSize: "16px",
                      color: "var(--gray6)",
                      textDecoration: "line-through",
                    }}
                  >
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      backgroundColor: "rgba(201,169,110,0.12)",
                      padding: "2px 8px",
                      borderRadius: "2px",
                    }}
                  >
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              {/* URGENCY BADGE */}
              {isLowStock ? (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 14px",
                    backgroundColor: "rgba(220, 38, 38, 0.12)",
                    border: "1px solid rgba(220, 38, 38, 0.35)",
                    borderRadius: "2px",
                    fontSize: "12px",
                    color: "#f87171",
                    fontWeight: 500,
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#ef4444",
                      boxShadow: "0 0 10px #ef4444",
                    }}
                  />
                  <span>
                    ⚡ <strong>Only {product.stockCount} left in stock!</strong> High cart activity.
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#34d399",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "16px",
                  }}
                >
                  <span>●</span> In stock & ready for immediate dispatch
                </div>
              )}

              {/* DROP TIMER IF APPLICABLE */}
              {product.hasDropTimer && (
                <DropTimer targetDate={product.dropEndTime} compact={false} />
              )}

              {/* DESCRIPTION */}
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--gray7)",
                  lineHeight: 1.8,
                  marginBottom: "24px",
                  borderLeft: "2px solid var(--gray3)",
                  paddingLeft: "14px",
                }}
              >
                {product.description}
              </p>

              {/* SIZE SELECTION */}
              {product.sizes && product.sizes.length > 0 && (
                <div style={{ marginBottom: "24px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--gray6)",
                      }}
                    >
                      Select Size:{" "}
                      <strong style={{ color: "var(--white)" }}>{selectedSize}</strong>
                    </span>

                    {/* SMART FIT RECOMMENDER TRIGGER */}
                    <button
                      onClick={() => setIsSizeAdvisorOpen(true)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--gold)",
                        fontSize: "12px",
                        letterSpacing: "0.08em",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                      Find Your Size (Fit Recommender)
                    </button>
                  </div>

                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {product.sizes.map((s) => {
                      const isSel = selectedSize === s;
                      return (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          style={{
                            minWidth: "48px",
                            height: "40px",
                            padding: "0 12px",
                            backgroundColor: isSel ? "var(--gold)" : "rgba(255,255,255,0.03)",
                            color: isSel ? "#050505" : "#e8e4de",
                            border: `1px solid ${isSel ? "var(--gold)" : "rgba(255,255,255,0.12)"}`,
                            borderRadius: "2px",
                            fontSize: "12px",
                            fontWeight: isSel ? 700 : 400,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* QUANTITY & ACTIONS */}
              <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid var(--gray3)",
                    borderRadius: "2px",
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    style={{
                      width: "36px",
                      height: "44px",
                      background: "none",
                      border: "none",
                      color: "var(--white)",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    −
                  </button>
                  <div
                    style={{
                      width: "36px",
                      textAlign: "center",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {qty}
                  </div>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    style={{
                      width: "36px",
                      height: "44px",
                      background: "none",
                      border: "none",
                      color: "var(--white)",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  className={`btn ${justAdded ? "btn-outline" : "btn-gold"}`}
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: "14px 28px",
                    fontSize: "12px",
                    letterSpacing: "0.15em",
                  }}
                >
                  {justAdded ? (
                    <>✓ Added to Cart</>
                  ) : (
                    <>
                      Add to Cart · ${(product.price * qty).toFixed(2)}
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* VALUE PROPS */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  fontSize: "11px",
                  color: "var(--gray6)",
                }}
              >
                <div>✓ Worldwide Express Shipping</div>
                <div>✓ 30-Day Noir Guarantee</div>
                <div>✓ Verified Authentic Hardware</div>
                <div>✓ Encrypted 256-bit Checkout</div>
              </div>
            </div>
          </div>

          {/* COMPLETE THE LOOK BUNDLE SUGGESTION */}
          <div style={{ padding: "0 36px 36px" }}>
            <CompleteTheLook
              currentProduct={product}
              allProducts={allProducts}
              onAddBundle={onAddBundle}
              onViewProduct={onViewProduct}
            />
          </div>
        </div>
      </div>

      {/* SIZE RECOMMENDER MODAL */}
      <SizeRecommenderModal
        isOpen={isSizeAdvisorOpen}
        onClose={() => setIsSizeAdvisorOpen(false)}
        onApplySize={(sz) => setSelectedSize(sz)}
        availableSizes={product.sizes || []}
      />
    </>
  );
}
