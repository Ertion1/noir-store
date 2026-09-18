import { useState, useEffect, useRef } from "react";
import { HERO_SLIDES } from "../data/products";

export default function HeroCarousel({ onSelectFilter, onNavigateShop }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const total = HERO_SLIDES.length;

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, total]);

  const goToSlide = (index) => {
    setCurrent((index + total) % total);
  };

  const handleCtaClick = (slide) => {
    if (onSelectFilter) {
      onSelectFilter({ category: slide.categoryFilter, vibe: slide.vibeFilter });
    }
    if (onNavigateShop) {
      onNavigateShop();
    }
  };

  return (
    <div
      className="hero-carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "720px",
        overflow: "hidden",
        backgroundColor: "#050505",
      }}
    >
      {/* SLIDES */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === current;
        return (
          <div
            key={slide.id}
            className={`hero-slide ${isActive ? "active" : ""}`}
            style={{
              position: "absolute",
              inset: 0,
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scale(1)" : "scale(1.04)",
              transition: "opacity 1s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)",
              pointerEvents: isActive ? "auto" : "none",
              zIndex: isActive ? 2 : 1,
            }}
          >
            {/* BACKGROUND IMAGE WITH FALLBACK */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center 30%",
                filter: "brightness(0.55) contrast(1.15)",
                transform: isActive ? "scale(1.02)" : "scale(1)",
                transition: "transform 7s ease-out",
              }}
            />

            {/* DARK GRADIENT OVERLAYS */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 70% 30%, rgba(139,0,0,0.15) 0%, transparent 60%), linear-gradient(180deg, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.4) 40%, rgba(5,5,5,0.95) 100%)",
              }}
            />

            {/* GRID OVERLAY ACCENT */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                opacity: 0.7,
              }}
            />

            {/* CONTENT */}
            <div
              style={{
                position: "relative",
                zIndex: 5,
                maxWidth: "1400px",
                margin: "0 auto",
                height: "100%",
                padding: "0 48px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: slide.accentColor || "var(--gold)",
                  marginBottom: "20px",
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    width: "28px",
                    height: "1px",
                    backgroundColor: slide.accentColor || "var(--gold)",
                  }}
                />
                {slide.badge} · {slide.subtitle}
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(48px, 8vw, 110px)",
                  fontWeight: 300,
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  color: "#f5f5f0",
                  marginBottom: "24px",
                  maxWidth: "900px",
                  textShadow: "0 4px 30px rgba(0,0,0,0.8)",
                }}
              >
                {slide.title}
              </h1>

              <p
                style={{
                  fontSize: "15px",
                  letterSpacing: "0.04em",
                  color: "rgba(245,245,240,0.75)",
                  maxWidth: "520px",
                  lineHeight: 1.8,
                  marginBottom: "40px",
                  fontFamily: "var(--font-body)",
                }}
              >
                {slide.description}
              </p>

              <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                <button
                  className="btn btn-gold"
                  onClick={() => handleCtaClick(slide)}
                  style={{
                    padding: "16px 36px",
                    fontSize: "12px",
                    letterSpacing: "0.18em",
                    boxShadow: "0 4px 20px rgba(201,169,110,0.25)",
                  }}
                >
                  {slide.cta}
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                    style={{ marginLeft: "6px" }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  className="btn btn-outline"
                  onClick={onNavigateShop}
                  style={{
                    padding: "16px 32px",
                    fontSize: "12px",
                    letterSpacing: "0.18em",
                    borderColor: "rgba(255,255,255,0.25)",
                  }}
                >
                  View All Drops
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* NAVIGATION CONTROLS */}
      <div
        style={{
          position: "absolute",
          bottom: "48px",
          left: "48px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* ARROWS */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => goToSlide(current - 1)}
            aria-label="Previous slide"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(20,20,20,0.7)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#f5f5f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.color = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = "#f5f5f0";
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => goToSlide(current + 1)}
            aria-label="Next slide"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(20,20,20,0.7)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#f5f5f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.color = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = "#f5f5f0";
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* PILL INDICATORS */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: current === idx ? "36px" : "12px",
                height: "4px",
                borderRadius: "2px",
                backgroundColor: current === idx ? "var(--gold)" : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* NUMERIC COUNTER */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "14px",
            letterSpacing: "0.1em",
            color: "var(--gold)",
            opacity: 0.9,
          }}
        >
          0{current + 1} <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span> 0{total}
        </div>
      </div>

      {/* SCROLL INDICATOR ON RIGHT */}
      <div
        className="hero-scroll"
        style={{
          position: "absolute",
          bottom: "48px",
          right: "48px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gray6)",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Scroll To Explore
        </div>
        <div className="hero-scroll-line" />
      </div>
    </div>
  );
}
