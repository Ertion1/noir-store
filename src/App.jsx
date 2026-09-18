import { useState, useEffect, useCallback, useMemo } from "react";
import { PRODUCTS } from "./data/products";
import HeroCarousel from "./components/HeroCarousel";
import VibeFilter from "./components/VibeFilter";
import FilterBar from "./components/FilterBar";
import ProductCard from "./components/ProductCard";
import QuickViewModal from "./components/QuickViewModal";
import SizeRecommenderModal from "./components/SizeRecommenderModal";
import CartDrawer from "./components/CartDrawer";
import DropTimer from "./components/DropTimer";
import CompleteTheLook from "./components/CompleteTheLook";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    :root{
      --gold:#C9A96E;--gold-glow:rgba(201,169,110,0.35);--red:#8B0000;
      --black:#050505;--dark:#0d0d0d;--gray1:#111;--gray2:#181818;
      --gray3:#282828;--gray4:#383838;--gray5:#666;--gray6:#999;
      --gray7:#ccc;--white:#f5f5f0;--cream:#e8e4de;
      --font-display:'Cormorant Garamond',serif;
      --font-body:'Space Grotesk',sans-serif;
      --ease:cubic-bezier(.23,1,.32,1);
    }
    html{scroll-behavior:smooth}
    body{background:var(--black);color:var(--white);font-family:var(--font-body);overflow-x:hidden}
    ::selection{background:var(--gold);color:var(--black)}
    ::-webkit-scrollbar{width:5px;height:5px}
    ::-webkit-scrollbar-track{background:var(--black)}
    ::-webkit-scrollbar-thumb{background:var(--gray3);border-radius:2px}
    ::-webkit-scrollbar-thumb:hover{background:var(--gold)}
    input,textarea,select{font-family:var(--font-body)}
    button{font-family:var(--font-body)}
    a{text-decoration:none;color:inherit}
    img{display:block}
    .serif{font-family:var(--font-display)}

    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.85)}}

    /* NAV */
    nav{position:fixed;top:0;left:0;right:0;z-index:200;padding:0 48px;height:72px;display:flex;align-items:center;justify-content:space-between;transition:background .4s,backdrop-filter .4s;border-bottom:1px solid transparent}
    nav.scrolled{background:rgba(5,5,5,.88);backdrop-filter:blur(20px);border-bottom:1px solid rgba(201,169,110,.18)}
    .nav-logo{font-family:var(--font-display);font-size:26px;font-weight:600;letter-spacing:.08em;color:var(--white);background:none;border:none;cursor:pointer}
    .nav-logo span{color:var(--gold)}
    .nav-links{display:flex;gap:36px;list-style:none}
    .nav-links a{font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:var(--gray7);transition:color .3s;position:relative}
    .nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:var(--gold);transition:width .3s var(--ease)}
    .nav-links a:hover,.nav-links a.active{color:var(--white)}
    .nav-links a:hover::after,.nav-links a.active::after{width:100%}
    .nav-actions{display:flex;gap:16px;align-items:center}
    .nav-icon-btn{background:none;border:none;color:var(--gray6);width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:color .3s,background .3s;position:relative;cursor:pointer}
    .nav-icon-btn:hover{color:var(--white);background:rgba(255,255,255,.05)}
    .cart-badge{position:absolute;top:4px;right:4px;background:var(--gold);color:var(--black);width:16px;height:16px;border-radius:50%;font-size:10px;display:flex;align-items:center;justify-content:center;font-weight:700;line-height:1}

    /* BUTTONS */
    .btn{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;font-size:12px;letter-spacing:.15em;text-transform:uppercase;font-weight:600;border-radius:2px;transition:all .35s var(--ease);position:relative;overflow:hidden;cursor:pointer}
    .btn::before{content:'';position:absolute;inset:0;background:rgba(255,255,255,.08);transform:translateX(-101%);transition:transform .4s var(--ease)}
    .btn:hover::before{transform:translateX(0)}
    .btn-gold{background:var(--gold);color:var(--black);border:1px solid var(--gold)}
    .btn-gold:hover{background:transparent;color:var(--gold)}
    .btn-outline{background:transparent;color:var(--white);border:1px solid rgba(255,255,255,.3)}
    .btn-outline:hover{border-color:var(--gold);color:var(--gold)}
    .btn-sm{padding:10px 20px;font-size:11px}

    /* SECTIONS */
    .section{max-width:1400px;margin:0 auto;padding:100px 48px}
    .section-tag{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:16px;display:flex;align-items:center;gap:12px}
    .section-tag::before{content:'';width:24px;height:1px;background:var(--gold)}
    .section-title{font-family:var(--font-display);font-size:clamp(40px,5.5vw,72px);font-weight:300;line-height:1.05;letter-spacing:-.01em;margin-bottom:48px;color:var(--white)}
    .section-title em{font-style:italic;color:var(--gold)}

    /* PRODUCT GRID */
    .product-grid{display:grid;gap:24px}
    .grid-4{grid-template-columns:repeat(4,1fr)}
    .grid-3{grid-template-columns:repeat(3,1fr)}
    .grid-2{grid-template-columns:repeat(2,1fr)}

    /* MARQUEE */
    .marquee-wrap{overflow:hidden;border-top:1px solid var(--gray3);border-bottom:1px solid var(--gray3);padding:18px 0;background:var(--gray1)}
    .marquee-track{display:flex;white-space:nowrap;animation:marquee 28s linear infinite}
    .marquee-track span{display:inline-block;padding:0 32px;font-family:var(--font-display);font-size:24px;font-style:italic;color:var(--gray5)}
    .marquee-track .dot{color:var(--gold)}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

    /* TOAST */
    .toast{position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(100px);background:var(--white);color:var(--black);padding:14px 28px;font-size:13px;font-weight:600;letter-spacing:.05em;z-index:9999;opacity:0;transition:all .4s var(--ease);white-space:nowrap;border-left:4px solid var(--gold);box-shadow:0 12px 40px rgba(0,0,0,0.8)}
    .toast.show{transform:translateX(-50%) translateY(0);opacity:1}

    /* LOADING SCREEN */
    .loader{position:fixed;inset:0;background:var(--black);z-index:9998;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;transition:opacity .8s var(--ease),transform .8s var(--ease)}
    .loader.hidden{opacity:0;pointer-events:none}
    .loader-logo{font-family:var(--font-display);font-size:56px;font-weight:300;letter-spacing:.12em;color:var(--white);animation:logoReveal 1.2s var(--ease) both .3s}
    .loader-logo span{color:var(--gold)}
    @keyframes logoReveal{from{opacity:0;letter-spacing:.4em}to{opacity:1;letter-spacing:.12em}}
    .loader-bar-wrap{width:200px;height:1px;background:var(--gray3);overflow:hidden}
    .loader-bar{height:100%;background:var(--gold);animation:barLoad 1.8s var(--ease) both}
    @keyframes barLoad{from{width:0}to{width:100%}}
    .loader-sub{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--gray5)}

    /* INSTAGRAM GRID */
    .insta-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:4px}
    .insta-item{aspect-ratio:1;overflow:hidden;position:relative;background:var(--gray2)}
    .insta-item img{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease)}
    .insta-item:hover img{transform:scale(1.08)}
    .insta-item:hover .insta-overlay{opacity:1}
    .insta-overlay{position:absolute;inset:0;background:rgba(201,169,110,.5);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .35s}

    /* NEWSLETTER */
    .newsletter{background:var(--gray1);border-top:1px solid var(--gray3);border-bottom:1px solid var(--gray3);padding:80px 48px;text-align:center}
    .newsletter-form{display:flex;max-width:480px;margin:28px auto 0;border:1px solid var(--gray3)}
    .newsletter-form input{flex:1;background:none;border:none;padding:14px 20px;color:var(--white);font-size:13px;outline:none}
    .newsletter-form input::placeholder{color:var(--gray5)}
    .newsletter-form button{padding:14px 24px;background:var(--gold);color:var(--black);border:none;font-size:11px;letter-spacing:.15em;text-transform:uppercase;font-weight:700;cursor:pointer;transition:background .3s}
    .newsletter-form button:hover{background:var(--white)}

    /* FOOTER */
    footer{background:var(--dark);border-top:1px solid var(--gray3);padding:80px 48px 40px}
    .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:64px}
    .footer-brand{font-family:var(--font-display);font-size:32px;font-weight:600;letter-spacing:.06em;margin-bottom:16px}
    .footer-brand span{color:var(--gold)}
    .footer-desc{font-size:13px;color:var(--gray6);line-height:1.8;max-width:280px}
    .footer-heading{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:20px}
    .footer-links{list-style:none}
    .footer-links li{margin-bottom:12px}
    .footer-links a{font-size:13px;color:var(--gray6);transition:color .3s}
    .footer-links a:hover{color:var(--white)}

    /* MOBILE NAV */
    .mobile-nav-toggle{display:none;background:none;border:none;color:var(--white);padding:8px;flex-direction:column;gap:5px;cursor:pointer}
    .mobile-nav-toggle span{display:block;width:22px;height:1px;background:var(--white);transition:all .3s}
    .mobile-menu{position:fixed;inset:0;background:var(--black);z-index:250;padding:100px 48px;display:flex;flex-direction:column;gap:24px;transform:translateY(-100%);transition:transform .5s var(--ease)}
    .mobile-menu.open{transform:translateY(0)}
    .mobile-menu a{font-family:var(--font-display);font-size:44px;font-weight:300;color:var(--white)}

    @media(max-width:1024px){
      .grid-4{grid-template-columns:repeat(2,1fr)}
      .footer-grid{grid-template-columns:1fr 1fr;gap:32px}
    }
    @media(max-width:768px){
      nav{padding:0 20px}
      .nav-links,.nav-actions .btn{display:none}
      .mobile-nav-toggle{display:flex}
      .section{padding:60px 20px}
      .grid-4,.grid-3{grid-template-columns:repeat(2,1fr)}
      .insta-grid{grid-template-columns:repeat(3,1fr)}
      .footer-grid{grid-template-columns:1fr}
      .hero-scroll{display:none}
    }
    @media(max-width:480px){
      .grid-4,.grid-3,.grid-2{grid-template-columns:1fr}
    }
  `}</style>
);

// ─── LOADER ───────────────────────────────────────────────────────────────────
const Loader = ({ onDone }) => {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setHidden(true);
      onDone();
    }, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`loader ${hidden ? "hidden" : ""}`}>
      <div className="loader-logo">N<span>.</span>OIR</div>
      <div className="loader-bar-wrap"><div className="loader-bar" /></div>
      <div className="loader-sub">Vault · FW '26 Collection</div>
    </div>
  );
};

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
const Nav = ({ page, setPage, cartCount, onCartOpen, wishCount, onOpenSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    ["Home", "home"],
    ["Shop", "shop"],
    ["New Drops", "new-drops"],
    ["About", "about"],
    ["Contact", "contact"],
  ];

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <button
          className="nav-logo"
          onClick={() => {
            setPage("home");
            window.scrollTo(0, 0);
          }}
        >
          N<span>.</span>OIR
        </button>

        <ul className="nav-links">
          {links.map(([label, id]) => (
            <li key={id}>
              <a
                href="#"
                className={page === id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(id);
                  window.scrollTo(0, 0);
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="nav-icon-btn"
            onClick={() => {
              setPage("shop");
              if (onOpenSearch) onOpenSearch();
            }}
            title="Search Catalog"
          >
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          <button
            className="nav-icon-btn"
            onClick={() => setPage("shop")}
            title="Wishlist"
          >
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishCount > 0 && <span className="cart-badge" style={{ backgroundColor: "#8B0000", color: "#fff" }}>{wishCount}</span>}
          </button>

          <button
            className="nav-icon-btn"
            onClick={onCartOpen}
            title="View Bag"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button className="btn btn-gold btn-sm" onClick={() => setPage("shop")}>
            Shop Vault
          </button>

          <button className="mobile-nav-toggle" onClick={() => setMobileOpen((o) => !o)}>
            <span style={{ transform: mobileOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ transform: mobileOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        {links.map(([label, id]) => (
          <a
            key={id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPage(id);
              setMobileOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
};

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
const Marquee = () => {
  const items = [
    "Vault Release FW '26",
    "UFC Official Fightwear",
    "Retro Blackout Kits",
    "Swiss Movement Hardware",
    "300gsm Heavyweight Supima",
    "316L Surgical Stainless",
    "Complimentary Global Express Over $200",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i}>
            {item} <span className="dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── INSTAGRAM GRID ────────────────────────────────────────────────────────────
const InstaCommunityGrid = () => {
  const photos = [
    "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=500&q=80",
  ];

  return (
    <div className="insta-grid">
      {photos.map((src, i) => (
        <div key={i} className="insta-item">
          <img src={src} alt="Noir community look" />
          <div className="insta-overlay">
            <svg width="24" height="24" fill="none" stroke="#050505" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
const HomePage = ({
  products,
  onAddToCart,
  onView,
  onQuickView,
  wishlist,
  onWishlist,
  setPage,
  onApplyCategoryFilter,
}) => {
  const [selectedVibe, setSelectedVibe] = useState("All");

  const vibeFiltered = useMemo(() => {
    if (selectedVibe === "All") return products;
    return products.filter((p) => p.vibe === selectedVibe);
  }, [products, selectedVibe]);

  const newDrops = vibeFiltered.filter((p) => p.isNewArrival || p.hasDropTimer).slice(0, 4);
  const bestsellers = vibeFiltered.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <div className="page">
      {/* 4-SLIDE HERO CAROUSEL */}
      <HeroCarousel
        onSelectFilter={({ category, vibe }) => {
          if (onApplyCategoryFilter) onApplyCategoryFilter({ category, vibe });
        }}
        onNavigateShop={() => {
          setPage("shop");
          window.scrollTo(0, 0);
        }}
      />

      {/* MARQUEE */}
      <Marquee />

      {/* VIBE / OCCASION FILTER STRIP */}
      <div className="section" style={{ paddingBottom: 0 }}>
        <VibeFilter
          selectedVibe={selectedVibe}
          onSelectVibe={setSelectedVibe}
          counts={{
            All: products.length,
            "Midnight Streetwear": products.filter((p) => p.vibe === "Midnight Streetwear").length,
            "Matchday Ready": products.filter((p) => p.vibe === "Matchday Ready").length,
            "Fight Night": products.filter((p) => p.vibe === "Fight Night").length,
            "Stealth Accessories": products.filter((p) => p.vibe === "Stealth Accessories").length,
          }}
        />
      </div>

      {/* NEW DROPS & LIVE TIMERS */}
      <div className="section" style={{ paddingTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="section-tag">Limited Allocations</div>
            <h2 className="section-title" style={{ margin: 0 }}>
              Live <em>Vault Drops</em>
            </h2>
          </div>
          <button
            className="btn btn-outline"
            onClick={() => {
              setPage("new-drops");
              window.scrollTo(0, 0);
            }}
          >
            View All Drops
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="product-grid grid-4">
          {newDrops.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              onView={onView}
              onQuickView={onQuickView}
              wishlist={wishlist}
              onWishlist={onWishlist}
            />
          ))}
        </div>
      </div>

      {/* BRAND STORY & PHILOSOPHY */}
      <div style={{ backgroundColor: "#080808", borderTop: "1px solid var(--gray3)", borderBottom: "1px solid var(--gray3)" }}>
        <div className="section">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64, alignItems: "center" }}>
            <div>
              <div className="section-tag">Architectural Discipline</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, lineHeight: 1.05, marginBottom: 28, color: "var(--white)" }}>
                Born in the shadows.<br />
                <em style={{ color: "var(--gold)" }}>Forged for performance.</em>
              </h2>
              <p style={{ fontSize: "14px", color: "var(--gray6)", lineHeight: 1.9, marginBottom: 32, maxWidth: 500 }}>
                NOIR bridges high-concept monochromatic streetwear, official UFC combat engineering, and pitch-heritage European sportswear. Every seam is calculated for kinetic movement, thermal balance, and uncompromising aesthetic dominance.
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                <button
                  className="btn btn-gold"
                  onClick={() => {
                    setPage("shop");
                    window.scrollTo(0, 0);
                  }}
                >
                  Explore Collection
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setPage("about");
                    window.scrollTo(0, 0);
                  }}
                >
                  Our Philosophy
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ aspectRatio: "3/4", borderRadius: "2px", overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80"
                  alt="Streetwear styling"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ aspectRatio: "3/4", borderRadius: "2px", overflow: "hidden", marginTop: "32px" }}>
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
                  alt="UFC combat gear"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BESTSELLERS */}
      <div className="section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="section-tag">Community Favorites</div>
            <h2 className="section-title" style={{ margin: 0 }}>
              The <em>Bestsellers</em>
            </h2>
          </div>
          <button
            className="btn btn-outline"
            onClick={() => {
              setPage("shop");
              window.scrollTo(0, 0);
            }}
          >
            Shop All Pieces
          </button>
        </div>

        <div className="product-grid grid-4">
          {bestsellers.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              onView={onView}
              onQuickView={onQuickView}
              wishlist={wishlist}
              onWishlist={onWishlist}
            />
          ))}
        </div>
      </div>

      {/* INSTAGRAM COMMUNITY */}
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="section-tag">Social Syndicate</div>
        <h2 className="section-title" style={{ marginBottom: 32 }}>
          @noir.<em>vault</em>
        </h2>
      </div>
      <InstaCommunityGrid />
    </div>
  );
};

// ─── SHOP PAGE ─────────────────────────────────────────────────────────────────
const ShopPage = ({
  products,
  onAddToCart,
  onView,
  onQuickView,
  wishlist,
  onWishlist,
  initialFilters,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    initialFilters && initialFilters.category ? initialFilters.category : "All"
  );
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedVibe, setSelectedVibe] = useState(
    initialFilters && initialFilters.vibe ? initialFilters.vibe : "All"
  );
  const [maxPrice, setMaxPrice] = useState(700);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  // Filter pipeline
  const filtered = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        const matchVibe = p.vibe ? p.vibe.toLowerCase().includes(q) : false;
        if (!matchName && !matchBrand && !matchCat && !matchVibe) return false;
      }

      // Category
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;

      // Brand
      if (selectedBrand !== "All" && p.brand !== selectedBrand) return false;

      // Vibe
      if (selectedVibe !== "All" && p.vibe !== selectedVibe) return false;

      // Size
      if (selectedSize !== "All") {
        if (!p.sizes || !p.sizes.includes(selectedSize)) return false;
      }

      // Price
      if (p.price > maxPrice) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, selectedVibe, selectedSize, maxPrice]);

  // Sort pipeline
  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [filtered, sort]);

  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const paged = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const isFiltered =
    searchQuery ||
    selectedCategory !== "All" ||
    selectedBrand !== "All" ||
    selectedSize !== "All" ||
    selectedVibe !== "All" ||
    maxPrice < 700;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSelectedSize("All");
    setSelectedVibe("All");
    setMaxPrice(700);
    setSort("featured");
    setPage(1);
  };

  return (
    <div className="page" style={{ paddingTop: 72 }}>
      <div className="section" style={{ paddingBottom: 0 }}>
        <div style={{ marginBottom: 32 }}>
          <div className="section-tag">Curated Vault Collection</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(44px, 7vw, 76px)", fontWeight: 300, lineHeight: 0.95, color: "var(--white)", margin: "0 0 12px" }}>
            The <em style={{ color: "var(--gold)" }}>Store</em>
          </h1>
          <p style={{ fontSize: "14px", color: "var(--gray6)", maxWidth: "560px" }}>
            Browse high-mobility combat gear, monochromatic techwear, blackout European jerseys, and surgical steel accessories.
          </p>
        </div>

        {/* VIBE FILTER PILLS */}
        <VibeFilter
          selectedVibe={selectedVibe}
          onSelectVibe={(v) => {
            setSelectedVibe(v);
            setPage(1);
          }}
        />

        {/* MULTI-CATEGORY FILTERS & REAL-TIME SEARCH */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            setPage(1);
          }}
          selectedCategory={selectedCategory}
          onSelectCategory={(c) => {
            setSelectedCategory(c);
            setPage(1);
          }}
          selectedBrand={selectedBrand}
          onSelectBrand={(b) => {
            setSelectedBrand(b);
            setPage(1);
          }}
          selectedSize={selectedSize}
          onSelectSize={(s) => {
            setSelectedSize(s);
            setPage(1);
          }}
          maxPrice={maxPrice}
          onMaxPriceChange={(p) => {
            setMaxPrice(p);
            setPage(1);
          }}
          sort={sort}
          onSortChange={setSort}
          totalResults={sorted.length}
          onResetFilters={handleResetFilters}
          isFiltered={isFiltered}
        />
      </div>

      <div className="section" style={{ paddingTop: 0 }}>
        {sorted.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 0", color: "var(--gray5)" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⌀</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--gray6)", marginBottom: "8px" }}>
              No pieces match your filter criteria
            </div>
            <p style={{ fontSize: "13px", color: "var(--gray5)", maxWidth: "340px", margin: "0 auto 24px" }}>
              Try loosening your price threshold or resetting active search filters.
            </p>
            <button className="btn btn-gold btn-sm" onClick={handleResetFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="product-grid grid-4">
              {paged.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={onAddToCart}
                  onView={onView}
                  onQuickView={onQuickView}
                  wishlist={wishlist}
                  onWishlist={onWishlist}
                />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 56 }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      setPage(n);
                      window.scrollTo(0, 300);
                    }}
                    style={{
                      width: 44,
                      height: 44,
                      border: `1px solid ${n === page ? "var(--gold)" : "var(--gray3)"}`,
                      backgroundColor: n === page ? "var(--gold)" : "transparent",
                      color: n === page ? "#050505" : "var(--gray6)",
                      fontSize: "13px",
                      fontWeight: n === page ? 700 : 400,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ─── NEW DROPS PAGE ────────────────────────────────────────────────────────────
const NewDropsPage = ({
  products,
  onAddToCart,
  onView,
  onQuickView,
  wishlist,
  onWishlist,
}) => {
  const drops = products.filter((p) => p.isNewArrival || p.hasDropTimer || p.stockCount <= 3);

  return (
    <div className="page" style={{ paddingTop: 72 }}>
      <div
        style={{
          background: "var(--gray1)",
          borderBottom: "1px solid var(--gray3)",
          padding: "80px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(201,169,110,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.03) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="section-tag" style={{ justifyContent: "center", marginBottom: 12 }}>
            Limited Vault Allocations
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(54px, 9vw, 100px)",
              fontWeight: 300,
              lineHeight: 0.9,
              color: "var(--white)",
              marginBottom: 20,
            }}
          >
            New <em style={{ color: "var(--gold)" }}>Drops</em> & Timers
          </h1>
          <p
            style={{
              color: "var(--gray6)",
              fontSize: "14px",
              letterSpacing: "0.06em",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Exclusive capsule allocations with live drop countdowns and critical stock status. Once inventory depletes, restocks are not guaranteed.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="product-grid grid-4">
          {drops.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              onView={onView}
              onQuickView={onQuickView}
              wishlist={wishlist}
              onWishlist={onWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── PRODUCT DETAIL PAGE ───────────────────────────────────────────────────────
const ProductDetailPage = ({
  product,
  allProducts,
  onAddToCart,
  onAddBundle,
  onView,
  wishlist,
  onWishlist,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : "One Size"
  );
  const [qty, setQty] = useState(1);
  const [isSizeAdvisorOpen, setIsSizeAdvisorOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const images = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls
    : ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80"];

  const isLowStock = product.stockCount <= 3;
  const isWished = wishlist && wishlist.has(product.id);

  const handleAdd = () => {
    onAddToCart(product, { size: selectedSize, qty });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  const related = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.vibe === product.vibe))
    .slice(0, 4);

  return (
    <div className="page" style={{ paddingTop: 72 }}>
      <div className="section" style={{ paddingBottom: 60 }}>
        <div style={{ display: "flex", gap: 56, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* GALLERY */}
          <div style={{ flex: "1 1 500px", minWidth: "320px", display: "flex", gap: "16px" }}>
            {/* THUMBNAILS */}
            {images.length > 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    style={{
                      width: "72px",
                      height: "90px",
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
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}

            {/* MAIN IMAGE */}
            <div
              style={{
                flex: 1,
                aspectRatio: "3/4",
                backgroundColor: "#141414",
                borderRadius: "3px",
                overflow: "hidden",
                position: "relative",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              {product.isNewArrival && (
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    padding: "4px 12px",
                    backgroundColor: "var(--gold)",
                    color: "#050505",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  New Drop
                </div>
              )}
            </div>
          </div>

          {/* DETAILS */}
          <div style={{ flex: "1 1 400px", minWidth: "320px" }}>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              {product.brand} · {product.category}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 300,
                lineHeight: 1.1,
                color: "var(--white)",
                marginBottom: "16px",
              }}
            >
              {product.name}
            </h1>

            {/* REVIEWS */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", fontSize: "13px" }}>
              <div style={{ display: "flex", color: "var(--gold)" }}>
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </div>
              <span style={{ color: "var(--white)", fontWeight: 600 }}>{product.rating}</span>
              <span style={{ color: "var(--gray6)" }}>({product.reviewsCount} customer reviews)</span>
            </div>

            {/* PRICE */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "20px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "36px", color: "var(--white)", fontWeight: 400 }}>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: "18px", color: "var(--gray6)", textDecoration: "line-through" }}>
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
                    padding: "4px 10px",
                    borderRadius: "2px",
                  }}
                >
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* STOCK URGENCY BADGE */}
            {isLowStock ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  backgroundColor: "rgba(220, 38, 38, 0.12)",
                  border: "1px solid rgba(220, 38, 38, 0.35)",
                  borderRadius: "2px",
                  fontSize: "13px",
                  color: "#f87171",
                  fontWeight: 500,
                  marginBottom: "20px",
                }}
              >
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ef4444", boxShadow: "0 0 10px #ef4444" }} />
                <span>
                  ⚡ <strong>Only {product.stockCount} left in vault stock!</strong> High cart activity.
                </span>
              </div>
            ) : (
              <div style={{ fontSize: "12px", color: "#34d399", display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
                <span>●</span> In stock & ready for immediate dispatch
              </div>
            )}

            {/* DROP TIMER */}
            {product.hasDropTimer && (
              <DropTimer targetDate={product.dropEndTime} compact={false} />
            )}

            {/* DESCRIPTION */}
            <p
              style={{
                fontSize: "14px",
                color: "var(--gray7)",
                lineHeight: 1.9,
                marginBottom: "28px",
                borderLeft: "2px solid var(--gray3)",
                paddingLeft: "16px",
              }}
            >
              {product.description}
            </p>

            {/* SIZE SELECTOR + RECOMMENDER */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gray6)" }}>
                    Selected Size: <strong style={{ color: "var(--white)" }}>{selectedSize}</strong>
                  </span>
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

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {product.sizes.map((s) => {
                    const isSel = selectedSize === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        style={{
                          minWidth: "52px",
                          height: "44px",
                          padding: "0 14px",
                          backgroundColor: isSel ? "var(--gold)" : "rgba(255,255,255,0.03)",
                          color: isSel ? "#050505" : "#e8e4de",
                          border: `1px solid ${isSel ? "var(--gold)" : "rgba(255,255,255,0.12)"}`,
                          borderRadius: "2px",
                          fontSize: "13px",
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
            <div style={{ display: "flex", gap: "14px", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--gray3)", borderRadius: "2px" }}>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{ width: "40px", height: "48px", background: "none", border: "none", color: "var(--white)", fontSize: "18px", cursor: "pointer" }}
                >
                  −
                </button>
                <div style={{ width: "44px", textAlign: "center", fontSize: "14px", fontWeight: 600 }}>
                  {qty}
                </div>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  style={{ width: "40px", height: "48px", background: "none", border: "none", color: "var(--white)", fontSize: "18px", cursor: "pointer" }}
                >
                  +
                </button>
              </div>

              <button
                className={`btn ${justAdded ? "btn-outline" : "btn-gold"}`}
                onClick={handleAdd}
                style={{ flex: 1, justifyContent: "center", padding: "16px 32px", fontSize: "12px", letterSpacing: "0.15em" }}
              >
                {justAdded ? "✓ Added to Bag" : `Add to Bag · $${(product.price * qty).toFixed(2)}`}
              </button>
            </div>

            <button
              className="btn btn-outline"
              style={{ width: "100%", justifyContent: "center", marginBottom: "28px" }}
              onClick={() => onWishlist(product.id)}
            >
              <svg width="14" height="14" fill={isWished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {isWished ? "Wishlisted" : "Add to Wishlist"}
            </button>

            {/* TRUST MARKS */}
            <div style={{ borderTop: "1px solid var(--gray3)", paddingTop: "24px" }}>
              {[
                ["Complimentary Express Shipping", "On all orders above $200 worldwide"],
                ["Vault Authentication", "Every hardware piece individually inspected"],
                ["30-Day Hassle-Free Returns", "Complimentary return shipping labels included"],
              ].map(([title, subtitle]) => (
                <div key={title} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontSize: "12px", letterSpacing: "0.08em", color: "var(--gray5)", textTransform: "uppercase" }}>{title}</span>
                  <span style={{ fontSize: "12px", color: "var(--gray7)" }}>{subtitle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COMPLETE THE LOOK BUNDLE */}
        <CompleteTheLook
          currentProduct={product}
          allProducts={allProducts}
          onAddBundle={onAddBundle}
          onViewProduct={onView}
        />
      </div>

      {/* RELATED PRODUCTS */}
      <div style={{ background: "var(--gray1)", borderTop: "1px solid var(--gray3)" }}>
        <div className="section">
          <div className="section-tag">Complementary Silhouettes</div>
          <h2 className="section-title" style={{ marginBottom: 40 }}>
            Related <em>Pieces</em>
          </h2>
          <div className="product-grid grid-4">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onView={onView}
                onQuickView={onView}
                wishlist={wishlist}
                onWishlist={onWishlist}
              />
            ))}
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
    </div>
  );
};

// ─── ABOUT PAGE ────────────────────────────────────────────────────────────────
const AboutPage = () => (
  <div className="page" style={{ paddingTop: 72 }}>
    <div
      style={{
        height: "65vh",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        padding: "0 48px 80px",
        overflow: "hidden",
        backgroundColor: "#0d0d0d",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.35)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>
          Est. 2018 — Tokyo · London · Las Vegas
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 8vw, 100px)", fontWeight: 300, lineHeight: 0.95, color: "var(--white)" }}>
          We Build <em style={{ color: "var(--gold)" }}>Architecture</em><br />for the Human Body
        </h1>
      </div>
    </div>

    <div className="section">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64 }}>
        <div>
          <div className="section-tag">The Genesis</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "38px", fontWeight: 300, color: "var(--white)", marginBottom: 24 }}>
            Silence as a statement of <em style={{ color: "var(--gold)" }}>pure authority.</em>
          </h2>
          <p style={{ fontSize: "14px", color: "var(--gray6)", lineHeight: 1.9, marginBottom: 20 }}>
            Founded by spatial architects Kai Mori and Elise Vanthorpe, NOIR was conceived around an uncompromising principle: clothing is wearable architecture. Every seam must bear tension, every drop of dye must resonate with permanent depth, and every garment must enhance human kinetic movement.
          </p>
          <p style={{ fontSize: "14px", color: "var(--gray6)", lineHeight: 1.9 }}>
            Today, our label unites premier technical fabric mills in Osaka, combat test labs in Nevada, and European heritage sportswear archives into a cohesive nocturnal vision.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            ["300 GSM", "Heavyweight Supima Cotton Density"],
            ["316L", "Surgical Grade PVD Matte Stainless"],
            ["100%", "Full Transparency Supply Chains"],
            ["24+", "Countries Shipped with Stealth Packaging"],
          ].map(([num, label]) => (
            <div key={label} style={{ backgroundColor: "var(--gray1)", border: "1px solid var(--gray3)", padding: "32px 20px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "40px", color: "var(--gold)", marginBottom: "8px" }}>
                {num}
              </div>
              <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray6)" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── CONTACT PAGE ──────────────────────────────────────────────────────────────
const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page" style={{ paddingTop: 72 }}>
      <div className="section">
        <div className="section-tag">Concierge Desk</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(44px, 7vw, 84px)", fontWeight: 300, color: "var(--white)", marginBottom: 48 }}>
          Direct <em style={{ color: "var(--gold)" }}>Communication</em>
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64 }}>
          {sent ? (
            <div style={{ padding: "64px 32px", textAlign: "center", backgroundColor: "var(--gray1)", border: "1px solid rgba(201,169,110,0.3)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "56px", color: "var(--gold)", marginBottom: 16 }}>✓</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", color: "var(--white)", marginBottom: 12 }}>Transmission Dispatched</h2>
              <p style={{ color: "var(--gray6)", fontSize: "14px" }}>A concierge representative will respond within 24 operational hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <input
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--gray3)", color: "var(--white)", padding: "14px 18px", borderRadius: 2 }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--gray3)", color: "var(--white)", padding: "14px 18px", borderRadius: 2 }}
                />
              </div>
              <input
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--gray3)", color: "var(--white)", padding: "14px 18px", borderRadius: 2 }}
              />
              <textarea
                placeholder="Inquiry or order reference..."
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                required
                style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--gray3)", color: "var(--white)", padding: "14px 18px", height: 140, resize: "none", borderRadius: 2 }}
              />
              <button type="submit" className="btn btn-gold" style={{ justifyContent: "center" }}>
                Send Transmission
              </button>
            </form>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              ["Global Flagship Studio", "Shoreditch High Street, London E1 6RF\nMon–Sat: 10:00 — 19:00 GMT"],
              ["VIP Concierge", "concierge@noir-store.com · +44 (0) 20 7946 0912"],
              ["Press & Syndicate Collaborations", "press@noir-store.com"],
              ["Wholesale & Retail Vault", "trade@noir-store.com"],
            ].map(([head, desc]) => (
              <div key={head} style={{ paddingBottom: 16, borderBottom: "1px solid var(--gray3)" }}>
                <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>{head}</div>
                <div style={{ fontSize: "13px", color: "var(--gray6)", lineHeight: 1.6, whiteSpace: "pre-line" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── CHECKOUT PAGE ─────────────────────────────────────────────────────────────
const CheckoutPage = ({ cart, promo, onClearCart, setPage }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", address: "", city: "", zip: "", country: "", card: "", expiry: "", cvv: "" });
  const [orderDone, setOrderDone] = useState(false);
  const [orderId] = useState(() => Math.floor(Math.random() * 90000 + 10000));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmount = promo && promo.discountPercent ? Math.round((subtotal * promo.discountPercent) / 100) : 0;
  const shipping = subtotal >= 200 ? 0 : 15;
  const tax = Math.round((subtotal - discountAmount) * 0.08);
  const total = Math.max(0, subtotal - discountAmount + shipping + tax);

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setOrderDone(true);
    if (onClearCart) onClearCart();
  };

  if (orderDone) {
    return (
      <div className="page" style={{ paddingTop: 72, minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px 20px" }}>
        <div style={{ maxWidth: 540 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "84px", color: "var(--gold)", marginBottom: 16 }}>✓</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 300, color: "var(--white)", marginBottom: 12 }}>
            Order <em style={{ color: "var(--gold)" }}>Confirmed</em>
          </h1>
          <div style={{ fontSize: "14px", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
            #NR-{orderId}
          </div>
          <p style={{ color: "var(--gray6)", fontSize: "14px", lineHeight: 1.8, marginBottom: 32 }}>
            A transmission receipt and live tracking updates have been sent to <strong>{form.email || "your registered email"}</strong>. Estimated dispatch: within 24 operational hours.
          </p>
          <button
            className="btn btn-gold"
            onClick={() => {
              setPage("home");
              window.scrollTo(0, 0);
            }}
          >
            Return to Noir Store
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="page" style={{ paddingTop: 72, minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div>
          <div style={{ fontSize: "40px", marginBottom: "16px", color: "var(--gray4)" }}>○</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", color: "var(--white)", marginBottom: "12px" }}>Your bag is empty</h2>
          <button className="btn btn-gold btn-sm" onClick={() => setPage("shop")}>
            Browse Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ paddingTop: 72 }}>
      <div className="section">
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 300, color: "var(--white)", marginBottom: 40 }}>
          Secure <em style={{ color: "var(--gold)" }}>Checkout</em>
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56, alignItems: "start" }}>
          {/* STEP FORM */}
          <div>
            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "26px", color: "var(--white)", marginBottom: 20 }}>
                  1. Shipping Information
                </h2>
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <input
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                      required
                      style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--gray3)", color: "var(--white)", padding: "14px", borderRadius: 2 }}
                    />
                    <input
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                      required
                      style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--gray3)", color: "var(--white)", padding: "14px", borderRadius: 2 }}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address for tracking"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                    style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--gray3)", color: "var(--white)", padding: "14px", borderRadius: 2 }}
                  />
                  <input
                    placeholder="Street Address"
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    required
                    style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--gray3)", color: "var(--white)", padding: "14px", borderRadius: 2 }}
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                    <input
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                      required
                      style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--gray3)", color: "var(--white)", padding: "14px", borderRadius: 2 }}
                    />
                    <input
                      placeholder="Postal Code"
                      value={form.zip}
                      onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
                      required
                      style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--gray3)", color: "var(--white)", padding: "14px", borderRadius: 2 }}
                    />
                    <input
                      placeholder="Country"
                      value={form.country}
                      onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                      required
                      style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--gray3)", color: "var(--white)", padding: "14px", borderRadius: 2 }}
                    />
                  </div>
                  <button type="submit" className="btn btn-gold" style={{ justifyContent: "center", marginTop: 8 }}>
                    Continue to Payment
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div>
                <button
                  onClick={() => setStep(1)}
                  style={{ background: "none", border: "none", color: "var(--gold)", fontSize: "12px", cursor: "pointer", marginBottom: 16 }}
                >
                  ← Back to Shipping
                </button>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "26px", color: "var(--white)", marginBottom: 20 }}>
                  2. Payment Method
                </h2>
                <form onSubmit={handleCompleteOrder} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ padding: "12px 16px", backgroundColor: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.3)", fontSize: "12px", color: "var(--gold)" }}>
                    🔒 256-Bit SSL Encrypted Mock Gateway
                  </div>
                  <input
                    placeholder="Card Number (mock: 4242 •••• •••• 4242)"
                    value={form.card}
                    onChange={(e) => setForm((f) => ({ ...f, card: e.target.value }))}
                    maxLength={19}
                    required
                    style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--gray3)", color: "var(--white)", padding: "14px", borderRadius: 2 }}
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <input
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={(e) => setForm((f) => ({ ...f, expiry: e.target.value }))}
                      maxLength={5}
                      required
                      style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--gray3)", color: "var(--white)", padding: "14px", borderRadius: 2 }}
                    />
                    <input
                      placeholder="CVV"
                      value={form.cvv}
                      onChange={(e) => setForm((f) => ({ ...f, cvv: e.target.value }))}
                      maxLength={4}
                      required
                      style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--gray3)", color: "var(--white)", padding: "14px", borderRadius: 2 }}
                    />
                  </div>
                  <button type="submit" className="btn btn-gold" style={{ justifyContent: "center", marginTop: 8, padding: "16px" }}>
                    Authorize & Complete Order · ${total.toFixed(2)}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* ORDER SUMMARY */}
          <div style={{ backgroundColor: "#0c0c0c", border: "1px solid var(--gray3)", padding: 32, borderRadius: 2 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--white)", marginBottom: 20 }}>
              Order Review ({cart.reduce((s, i) => s + i.qty, 0)} items)
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24, maxHeight: 300, overflowY: "auto" }}>
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <img
                    src={item.imageUrls && item.imageUrls[0] ? item.imageUrls[0] : ""}
                    alt={item.name}
                    style={{ width: 50, height: 60, objectFit: "cover", borderRadius: 2 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", color: "var(--white)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--gray6)" }}>
                      Size: {item.size} · Qty: {item.qty}
                    </div>
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--gold)" }}>
                    ${item.price * item.qty}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--gray3)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--gray6)" }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--gold)" }}>
                  <span>Promo Discount ({promo.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--gray6)" }}>
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--gray6)" }}>
                <span>Express Shipping</span>
                <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderTop: "1px solid var(--gray3)", paddingTop: 16, marginTop: 8 }}>
                <span style={{ fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gray6)" }}>Total</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "32px", color: "var(--white)", fontWeight: 400 }}>
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── FOOTER ────────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer>
    <div className="footer-grid" style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div>
        <div className="footer-brand">N<span>.</span>OIR</div>
        <p className="footer-desc">
          High-concept technical streetwear, official combat athletics, and blackout European football silhouettes.
        </p>
      </div>
      <div>
        <div className="footer-heading">Vault Collections</div>
        <ul className="footer-links">
          {[
            ["Nike & Adidas", "shop"],
            ["UFC & Fightwear", "shop"],
            ["Blackout Kits", "shop"],
            ["Hardware & Accessories", "shop"],
            ["Noir Exclusives", "new-drops"],
          ].map(([label, pg]) => (
            <li key={label}>
              <a href="#" onClick={(e) => { e.preventDefault(); setPage(pg); window.scrollTo(0, 0); }}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="footer-heading">Maison</div>
        <ul className="footer-links">
          {[
            ["Architectural Origin", "about"],
            ["Concierge Desk", "contact"],
            ["Sustainability", "about"],
            ["Press Transmissions", "contact"],
          ].map(([label, pg]) => (
            <li key={label}>
              <a href="#" onClick={(e) => { e.preventDefault(); setPage(pg); window.scrollTo(0, 0); }}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="footer-heading">Client Services</div>
        <ul className="footer-links">
          {["Complimentary Global Express", "30-Day Noir Guarantee", "Authenticity Inspection", "FAQ & Sizing"].map((item) => (
            <li key={item}>
              <a href="#" onClick={(e) => e.preventDefault()}>{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div
      style={{
        borderTop: "1px solid var(--gray3)",
        paddingTop: 32,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
        maxWidth: 1400,
        margin: "0 auto",
      }}
    >
      <div style={{ fontSize: "12px", color: "var(--gray5)" }}>
        © 2026 NOIR STORE. All rights reserved. Precision engineered in the dark.
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {["INSTAGRAM", "TWITTER", "DISCORD", "YOUTUBE"].map((s) => (
          <div
            key={s}
            style={{
              padding: "6px 12px",
              border: "1px solid var(--gray3)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "var(--gray5)",
              borderRadius: 2,
              cursor: "pointer",
            }}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  </footer>
);

// ─── MAIN APP COMPONENT ────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState("home");
  const [viewProduct, setViewProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [promo, setPromo] = useState(null);
  const [toast, setToast] = useState("");
  const [categoryFilterOverride, setCategoryFilterOverride] = useState(null);

  // CART STATE WITH PERSISTENT LOCALSTORAGE
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("noir_store_cart_fw26");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("noir_store_cart_fw26", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }, []);

  // CART HANDLERS
  const handleAddToCart = useCallback((product, opts = {}) => {
    const size = opts.size || (product.sizes && product.sizes[0]) || "One Size";
    const qty = opts.qty || 1;

    setCart((prev) => {
      const key = `${product.id}-${size}`;
      const existing = prev.find((i) => `${i.id}-${i.size}` === key);
      if (existing) {
        return prev.map((i) => (`${i.id}-${i.size}` === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...product, size, qty }];
    });

    showToast(`✓ Added ${product.name} (Size: ${size}) to Bag`);
    setCartOpen(true);
  }, [showToast]);

  const handleAddBundle = useCallback((bundleItems) => {
    setCart((prev) => {
      let updated = [...prev];
      bundleItems.forEach((item) => {
        const sz = (item.sizes && item.sizes[0]) || "One Size";
        const key = `${item.id}-${sz}`;
        const existing = updated.find((i) => `${i.id}-${i.size}` === key);
        if (existing) {
          updated = updated.map((i) => (`${i.id}-${i.size}` === key ? { ...i, qty: i.qty + 1 } : i));
        } else {
          updated.push({ ...item, size: sz, qty: 1 });
        }
      });
      return updated;
    });

    showToast(`✓ "Complete the Look" 3-Piece Bundle added to Bag!`);
    setCartOpen(true);
  }, [showToast]);

  const handleUpdateQty = useCallback((item, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => !(i.id === item.id && i.size === item.size)));
    } else {
      setCart((prev) => prev.map((i) => (i.id === item.id && i.size === item.size ? { ...i, qty } : i)));
    }
  }, []);

  const handleRemoveItem = useCallback((item) => {
    setCart((prev) => prev.filter((i) => !(i.id === item.id && i.size === item.size)));
    showToast(`Item removed from bag`);
  }, [showToast]);

  const handleWishlist = useCallback((id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast("Removed from wishlist");
      } else {
        next.add(id);
        showToast("Added to wishlist");
      }
      return next;
    });
  }, [showToast]);

  const handleView = useCallback((product) => {
    setViewProduct(product);
    setPage("product");
    window.scrollTo(0, 0);
  }, []);

  const handleQuickView = useCallback((product) => {
    setQuickViewProduct(product);
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // RENDER CURRENT VIEW
  const renderPage = () => {
    const commonProps = {
      products: PRODUCTS,
      allProducts: PRODUCTS,
      onAddToCart: handleAddToCart,
      onAddBundle: handleAddBundle,
      onView: handleView,
      onQuickView: handleQuickView,
      wishlist,
      onWishlist: handleWishlist,
      setPage,
    };

    if (page === "product" && viewProduct) {
      return <ProductDetailPage key={viewProduct.id} product={viewProduct} {...commonProps} />;
    }

    if (page === "shop") {
      return (
        <ShopPage
          {...commonProps}
          initialFilters={categoryFilterOverride}
        />
      );
    }

    if (page === "new-drops") {
      return <NewDropsPage {...commonProps} />;
    }

    if (page === "about") return <AboutPage />;
    if (page === "contact") return <ContactPage />;
    if (page === "checkout") {
      return (
        <CheckoutPage
          cart={cart}
          promo={promo}
          onClearCart={() => setCart([])}
          setPage={setPage}
        />
      );
    }

    return (
      <HomePage
        {...commonProps}
        onApplyCategoryFilter={(filter) => {
          setCategoryFilterOverride(filter);
          setPage("shop");
        }}
      />
    );
  };

  return (
    <>
      <GlobalStyles />
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <Nav
        page={page}
        setPage={setPage}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        wishCount={wishlist.size}
        onOpenSearch={() => {
          setCategoryFilterOverride(null);
          setPage("shop");
        }}
      />

      <main>{renderPage()}</main>

      {/* GLOBAL NEWSLETTER STRIP */}
      {page !== "checkout" && (
        <div className="newsletter">
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div className="section-tag" style={{ justifyContent: "center", marginBottom: 12 }}>
              The Noir Inner Circle
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300, color: "var(--white)", marginBottom: 12 }}>
              Unlock First Vault Access with <em style={{ color: "var(--gold)" }}>NOIR10</em>
            </h2>
            <p style={{ fontSize: "13px", color: "var(--gray6)", letterSpacing: "0.05em", marginBottom: 12 }}>
              Enter code <strong>NOIR10</strong> in your cart for 10% off your inaugural order. Members receive 48-hour early drop notifications.
            </p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address..." />
              <button onClick={() => showToast("Subscribed to the Noir Inner Circle")}>Join</button>
            </div>
          </div>
        </div>
      )}

      <Footer setPage={setPage} />

      {/* CART SLIDE-OVER DRAWER */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false);
          setPage("checkout");
          window.scrollTo(0, 0);
        }}
        promo={promo}
        onApplyPromo={(p) => {
          setPromo(p);
          showToast(`Promo code ${p.code} applied! (${p.discountPercent}% OFF)`);
        }}
        onRemovePromo={() => {
          setPromo(null);
          showToast("Promo code removed");
        }}
      />

      {/* QUICK VIEW MODAL */}
      <QuickViewModal
        key={quickViewProduct ? quickViewProduct.id : "none"}
        product={quickViewProduct}
        allProducts={PRODUCTS}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onAddBundle={handleAddBundle}
        wishlist={wishlist}
        onWishlist={handleWishlist}
        onViewProduct={(p) => {
          setQuickViewProduct(null);
          handleView(p);
        }}
      />

      {/* FLOATING TOAST NOTIFICATION */}
      <div className={`toast ${toast ? "show" : ""}`}>
        {toast}
      </div>
    </>
  );
}