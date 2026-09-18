# Noir Store 🖤 — Premium E-Commerce Experience

**Noir Store** is a luxury streetwear, sportswear, and combat-gear e-commerce web application engineered with React and Vite. It features high-heat drop timers, dynamic bundle calculations, an interactive size recommender, and a pure dark-aesthetic UI.

---

 Features & Highlights

Smart Shopping & Interactive Features
* **Smart Size & Fit Recommender:** Calculates tailored size recommendations based on Height (cm), Weight (kg), and Fit Preference (*Fitted*, *Regular*, *Oversized*) with one-click direct application.
* **"Complete the Look" Bundles:** Curated 2-item complementary product suggestions on detail pages with automated 15% bundle discounts and single-click cart integration.
* **Shop by Vibe / Occasion:** Quick pill filters for *Midnight Streetwear*, *Matchday Ready*, *Fight Night*, and *Stealth Accessories*.
* **Live Stock Urgency & Drop Timers:** Pulsating low-inventory badges (`stockCount <= 3`) and real-time countdown timers (`HH:MM:SS`) for limited release drops.
* **Hero Banner Carousel:** 4-slide responsive hero banner with smooth 6s auto-play, hover pause, progress indicators, and custom slide counters (`01 / 04`).

 Cart, Checkout & Multi-Filtering
* **Advanced Multi-Filter & Live Search:** Real-time search engine matching titles, brands, categories, price range sliders, and size chips.
* **Product Quick-View Modal:** Interactive modal with multi-thumbnail gallery zoom hover, size pickers, and live stock statuses.
* **Slide-Over Cart Drawer:** Persistent `localStorage` synchronization with a dynamic **Free Express Shipping Progress Bar** ($200 threshold).
* **Promo Code Engine:** Working discounts at checkout (`NOIR10` for 10% off, `NOIR20` for 20% off, `VIPBLACK` for 15% off).

---

 Design System

Built on a pure dark luxury aesthetic:
* **Color Palette:** Deep Onyx (`#050505`), Matte Charcoal (`#0E0E0E`), Champagne Gold (`#C9A96E`).
* **Typography:** *Cormorant Garamond* display serif paired with *Space Grotesk*.
* **Visual FX:** Subtle glassmorphism borders (`rgba(255,255,255,0.08)`) and deep gradient overlays.

---

 Product Catalog Categories

1. **Nike & Adidas:** Tech Fleece Hoodies, Jordan 1 Retro High 'Shadow', Samba OG Blackout, Ultraboost 1.0 Triple Black.
2. **UFC & Fightwear:** Official Walkout Hoodies, Compression Rashguards, Fight Night Pro Octagon Shorts, Graphic Combat Tees.
3. **Football Kits:** Blackout Retro Heritage Kit, Noir Matchday Warmup Hoodie, Pitch Training Raincoat.
4. **Accessories:** Noir Minimalist Onyx Steel Watch, Sterling Silver Cuban Link Chain, Matte Black Polarized Shades.
5. **Noir Exclusives:** Heavyweight Oversized Heavy-Cotton Tee, Stealth Modular Parka, Technical Selvedge Cargo Pants.

---

 Tech Stack

* **Frontend Framework:** React 18
* **Build Tool:** Vite
* **Styling:** CSS Modules / Glassmorphism UI
* **State Management:** React Context API & `localStorage`
* **Icons & Assets:** Lucide React / Local Assets

---

 Getting Started

 Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

 Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Ertion1/noir-store.git](https://github.com/Ertion1/noir-store.git)
   cd noir-store
