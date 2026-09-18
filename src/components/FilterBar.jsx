import { CATEGORIES, BRANDS } from "../data/products";

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  selectedSize,
  onSelectSize,
  maxPrice,
  onMaxPriceChange,
  sort,
  onSortChange,
  totalResults,
  onResetFilters,
  isFiltered,
}) {
  const SIZES = ["All", "S", "M", "L", "XL", "XXL", "One Size"];

  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "4px",
        padding: "24px",
        marginBottom: "36px",
      }}
    >
      {/* TOP ROW: SEARCH BAR + SORT SELECT */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        {/* REAL-TIME SEARCH BAR */}
        <div
          style={{
            position: "relative",
            flex: "1 1 320px",
            maxWidth: "500px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--gray5)",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Search Tech Fleece, Samba, UFC, Football Kits, Watches..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "#111",
              border: "1px solid var(--gray3)",
              borderRadius: "2px",
              padding: "12px 40px 12px 42px",
              color: "var(--white)",
              fontSize: "13px",
              outline: "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.boxShadow = "0 0 12px rgba(201,169,110,0.2)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--gray3)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />

          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "var(--gray5)",
                fontSize: "16px",
                cursor: "pointer",
                padding: "4px",
              }}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* RESULTS COUNT & SORT */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ fontSize: "12px", color: "var(--gray5)", letterSpacing: "0.08em" }}>
            <strong style={{ color: "var(--gold)" }}>{totalResults}</strong> Pieces Found
          </div>

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              backgroundColor: "#111",
              border: "1px solid var(--gray3)",
              color: "var(--white)",
              padding: "11px 16px",
              fontSize: "12px",
              letterSpacing: "0.05em",
              borderRadius: "2px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Alphabetical</option>
          </select>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              style={{
                background: "none",
                border: "1px solid rgba(220, 38, 38, 0.4)",
                color: "#ff6b6b",
                padding: "8px 14px",
                fontSize: "11px",
                letterSpacing: "0.08em",
                borderRadius: "2px",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* CATEGORIES STRIP */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--gray6)",
            marginBottom: "8px",
          }}
        >
          Category
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: active ? "var(--gold)" : "rgba(255,255,255,0.03)",
                  color: active ? "#050505" : "var(--gray7)",
                  border: `1px solid ${active ? "var(--gold)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "2px",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: active ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECONDARY ROW: BRAND, SIZE, AND PRICE RANGE */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
          paddingTop: "16px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* BRAND FILTER */}
        <div>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gray6)",
              marginBottom: "8px",
            }}
          >
            Brand
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {BRANDS.map((brand) => {
              const active = selectedBrand === brand;
              return (
                <button
                  key={brand}
                  onClick={() => onSelectBrand(brand)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: active ? "rgba(201,169,110,0.15)" : "transparent",
                    color: active ? "var(--gold)" : "var(--gray6)",
                    border: `1px solid ${active ? "var(--gold)" : "var(--gray3)"}`,
                    borderRadius: "2px",
                    fontSize: "11px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {brand}
                </button>
              );
            })}
          </div>
        </div>

        {/* SIZE FILTER */}
        <div>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gray6)",
              marginBottom: "8px",
            }}
          >
            Size Filter
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {SIZES.map((sz) => {
              const active = selectedSize === sz;
              return (
                <button
                  key={sz}
                  onClick={() => onSelectSize(sz)}
                  style={{
                    padding: "6px 10px",
                    minWidth: "32px",
                    backgroundColor: active ? "var(--white)" : "transparent",
                    color: active ? "#050505" : "var(--gray6)",
                    border: `1px solid ${active ? "var(--white)" : "var(--gray3)"}`,
                    borderRadius: "2px",
                    fontSize: "11px",
                    fontWeight: active ? 700 : 400,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>

        {/* PRICE RANGE FILTER */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gray6)",
              marginBottom: "8px",
            }}
          >
            <span>Max Price</span>
            <span style={{ color: "var(--gold)", fontWeight: 600 }}>${maxPrice}</span>
          </div>
          <input
            type="range"
            min="60"
            max="700"
            step="10"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            style={{
              width: "100%",
              accentColor: "var(--gold)",
              cursor: "pointer",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
              color: "var(--gray5)",
              marginTop: "4px",
            }}
          >
            <span>$60</span>
            <span>$700</span>
          </div>
        </div>
      </div>
    </div>
  );
}
