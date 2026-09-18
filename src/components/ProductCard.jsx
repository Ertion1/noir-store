import DropTimer from "./DropTimer";

export default function ProductCard({
  product,
  onAddToCart,
  onView,
  onQuickView,
  wishlist,
  onWishlist,
}) {
  const wished = wishlist && wishlist.has(product.id);
  const isLowStock = product.stockCount <= 3;
  const mainImage = product.imageUrls && product.imageUrls[0]
    ? product.imageUrls[0]
    : "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80";

  return (
    <div
      className="product-card"
      style={{
        position: "relative",
        backgroundColor: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "3px",
        overflow: "hidden",
        transition: "all 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* BADGES */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {isLowStock && (
          <span
            style={{
              padding: "4px 8px",
              backgroundColor: "rgba(220, 38, 38, 0.9)",
              color: "#ffffff",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: "1px",
              boxShadow: "0 2px 8px rgba(220, 38, 38, 0.4)",
            }}
          >
            ⚡ Only {product.stockCount} Left!
          </span>
        )}
        {product.isNewArrival && !isLowStock && (
          <span
            style={{
              padding: "4px 8px",
              backgroundColor: "var(--gold)",
              color: "#050505",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: "1px",
            }}
          >
            New Drop
          </span>
        )}
        {product.isBestseller && !product.isNewArrival && !isLowStock && (
          <span
            style={{
              padding: "4px 8px",
              backgroundColor: "#1f1f1f",
              color: "var(--gold)",
              border: "1px solid rgba(201,169,110,0.3)",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: "1px",
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
          top: "12px",
          right: "12px",
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          backgroundColor: "rgba(5,5,5,0.7)",
          backdropFilter: "blur(6px)",
          border: `1px solid ${wished ? "var(--gold)" : "rgba(255,255,255,0.12)"}`,
          color: wished ? "var(--gold)" : "var(--white)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 3,
          transition: "all 0.2s",
        }}
      >
        <svg
          width="13"
          height="13"
          fill={wished ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* IMAGE & HOVER OVERLAY */}
      <div
        style={{
          position: "relative",
          aspectRatio: "3/4",
          backgroundColor: "#141414",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={() => onView(product)}
      >
        <img
          src={mainImage}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* COMPACT DROP TIMER ON IMAGE IF APPLICABLE */}
        {product.hasDropTimer && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              zIndex: 2,
            }}
          >
            <DropTimer targetDate={product.dropEndTime} compact={true} />
          </div>
        )}

        {/* HOVER ACTIONS OVERLAY */}
        <div
          className="product-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.2) 60%, transparent 100%)",
            display: "flex",
            alignItems: "flex-end",
            padding: "16px",
            opacity: 0,
            transition: "opacity 0.3s ease",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", gap: "8px", width: "100%" }}>
            <button
              className="btn btn-gold btn-sm"
              style={{ flex: 1, justifyContent: "center", padding: "10px 12px" }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
              Quick Add
            </button>
            <button
              className="btn btn-outline btn-sm"
              style={{ padding: "10px 14px", backgroundColor: "rgba(5,5,5,0.7)" }}
              onClick={(e) => {
                e.stopPropagation();
                if (onQuickView) onQuickView(product);
                else onView(product);
              }}
            >
              Quick View
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div
        style={{
          padding: "16px 16px 18px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "6px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 600,
            }}
          >
            {product.brand} · {product.category}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--gray6)" }}>
            <span style={{ color: "var(--gold)" }}>★</span>
            <span>{product.rating}</span>
          </div>
        </div>

        <h3
          onClick={() => onView(product)}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            fontWeight: 400,
            color: "var(--white)",
            margin: "0 0 10px 0",
            cursor: "pointer",
            lineHeight: 1.25,
            flex: 1,
          }}
          title={product.name}
        >
          {product.name}
        </h3>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                color: "var(--white)",
                fontWeight: 400,
              }}
            >
              ${product.price}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--gray6)",
                  textDecoration: "line-through",
                }}
              >
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div style={{ fontSize: "10px", color: "var(--gray6)", letterSpacing: "0.08em" }}>
            {product.sizes ? `${product.sizes.length} sizes` : "One Size"}
          </div>
        </div>
      </div>
    </div>
  );
}
