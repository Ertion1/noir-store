// Noir Store - Curated Luxury Product Catalog
// Premium dark-aesthetic streetwear, combat performance wear, blackout kits, and luxury hardware.

export const CATEGORIES = [
  "All",
  "Nike & Adidas",
  "UFC & Fightwear",
  "Football Kits",
  "Accessories",
  "Noir Exclusives",
];

export const BRANDS = ["All", "Noir Studio", "Nike", "Adidas", "UFC", "Noir Athletics"];

export const VIBES = [
  "All",
  "Midnight Streetwear",
  "Matchday Ready",
  "Fight Night",
  "Stealth Accessories",
];

export const PROMO_CODES = {
  NOIR10: { code: "NOIR10", discountPercent: 10, description: "10% Welcome Discount" },
  NOIR20: { code: "NOIR20", discountPercent: 20, description: "20% VIP Vault Drop" },
  VIPBLACK: { code: "VIPBLACK", discountPercent: 15, description: "15% Exclusive Access" },
};

export const PRODUCTS = [
  // ─── NIKE & ADIDAS ──────────────────────────────────────────
  {
    id: 1,
    name: "Tech Fleece Stealth Full-Zip",
    brand: "Nike",
    price: 185,
    originalPrice: 210,
    category: "Nike & Adidas",
    vibe: "Midnight Streetwear",
    description: "Engineered thermal fleece with taped chevron seams, bonded sleeve zip compartment, and dual-direction matte black hardware. Cut with articulated contouring for high-mobility street performance.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewsCount: 142,
    stockCount: 4,
    isNewArrival: true,
    isBestseller: true,
    hasDropTimer: true,
    dropEndTime: "2026-10-31T23:59:59Z",
    imageUrls: [
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/B76414s.jpg?im=Resize,width=750",
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/B76414s4.jpg?im=Resize,width=750",
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/B76414s3.jpg?im=Resize,width=750"
    ],
    bundleIds: [16, 20]
  },
  {
    id: 2,
    name: "Air Jordan 1 High 'Shadow Vault'",
    brand: "Nike",
    price: 245,
    originalPrice: 280,
    category: "Nike & Adidas",
    vibe: "Midnight Streetwear",
    description: "Tumbled monochromatic leather with soft-touch graphite nubuck overlays. Features encapsulated Nike Air sole cushioning, debossed wings branding, and waxed cotton tonal laces.",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    rating: 5.0,
    reviewsCount: 238,
    stockCount: 2,
    isNewArrival: false,
    isBestseller: true,
    hasDropTimer: false,
    imageUrls: [
      // Air Jordan 1 High — actual sneaker product shots
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/623042s.jpg?im=Resize,width=750",
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/623042s2.jpg?im=Resize,width=750",
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/623042s3.jpg?im=Resize,width=750"
    ],
    bundleIds: [23, 20]
  },
  {
    id: 3,
    name: "Samba OG Deconstructed 'Blackout'",
    brand: "Adidas",
    price: 135,
    originalPrice: 150,
    category: "Nike & Adidas",
    vibe: "Midnight Streetwear",
    description: "An archival indoor icon re-imagined in raw pitch-black Italian grain leather, darkened gum sole, and stealth serrated 3-Stripes with gold-foil NOIR custom heel foil.",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    rating: 4.8,
    reviewsCount: 189,
    stockCount: 6,
    isNewArrival: true,
    isBestseller: true,
    hasDropTimer: false,
    imageUrls: [
      // Adidas Samba OG — actual Samba shoe shots
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G70332s.jpg?im=Resize,width=750",
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G70332s3.jpg?im=Resize,width=750",
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G70332s4.jpg?im=Resize,width=750",
    ],
    bundleIds: [21, 18]
  },
  {
    id: 4,
    name: "Ultraboost 1.0 Triple Black Carbon",
    brand: "Adidas",
    price: 195,
    originalPrice: 220,
    category: "Nike & Adidas",
    vibe: "Midnight Streetwear",
    description: "Engineered Primeknit upper composed of 50% Parley Ocean Plastic. Full-length blackened BOOST midsole returns kinetic energy with continental rubber stealth tread.",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    rating: 4.9,
    reviewsCount: 94,
    stockCount: 3,
    isNewArrival: false,
    isBestseller: true,
    hasDropTimer: false,
    imageUrls: [
      // Adidas Ultraboost running shoe shots
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/4ff790231b7f461baee3c291e96b74af_9366/Ultraboost_1.0_Shoes_Black_HQ4199_HM1.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/248b016bfd024281899e335acfd561c1_9366/Ultraboost_1.0_Shoes_Black_HQ4199_HM3_hover.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/6f1f29d777e245acb3b107957440fa87_9366/Ultraboost_1.0_Shoes_Black_HQ4199_HM5.jpg"
    ],
    bundleIds: [1, 20]
  },
  {
    id: 5,
    name: "Tiro Modular Dark Track Jacket",
    brand: "Adidas",
    price: 110,
    originalPrice: 125,
    category: "Nike & Adidas",
    vibe: "Matchday Ready",
    description: "Breathable AEROREADY recycled technical weave with stand-up funnel collar, concealed side zip vents, and pitch-black gloss tonal shoulder striping.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewsCount: 63,
    stockCount: 8,
    isNewArrival: false,
    isBestseller: false,
    hasDropTimer: false,
    imageUrls: [
      // Adidas Tiro track jacket shots
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/0bd825db89fd4d898df9af335e87109a_9366/House_of_Tiro_Nations_Pack_Track_Top_Blue_KE6026_21_model.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/29a40b92431c4814a03284647e39d689_9366/House_of_Tiro_Nations_Pack_Track_Top_Blue_KE6026_23_hover_model.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/6e579576741a4b1ca262e8773311d2c0_9366/House_of_Tiro_Nations_Pack_Track_Top_Blue_KE6026_01_laydown.jpg"
    ],
    bundleIds: [13, 20]
  },
  {
    id: 27,
    name: "Nike Air Force 1 '07 Triple Black",
    brand: "Nike",
    price: 120,
    originalPrice: 140,
    category: "Nike & Adidas",
    vibe: "Midnight Streetwear",
    description: "The legendary low-top silhouette fully blacked out. Full-grain leather upper, perforated toe cap, encapsulated Air-Sole unit, and a matte black gum-blend outsole. The all-black AF1 is an undisputed street uniform staple.",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    rating: 4.9,
    reviewsCount: 312,
    stockCount: 5,
    isNewArrival: true,
    isBestseller: true,
    hasDropTimer: false,
    imageUrls: [
      // Nike Air Force 1 actual product shots
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y34015s4.jpg?im=Resize,width=750",
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y34015s6.jpg?im=Resize,width=750",
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y34015s10.jpg?im=Resize,width=750"
    ],
    bundleIds: [21, 20]
  },
  {
    id: 28,
    name: "Adidas ZNE Hoodie 'Stealth Edition'",
    brand: "Adidas",
    price: 155,
    originalPrice: 180,
    category: "Nike & Adidas",
    vibe: "Midnight Streetwear",
    description: "The athlete's pre-match cocoon. Ultra-plush double-knit French terry with Zone No Energy distraction design — sealed crossover hood, side seam pockets, and minimal embroidered 3-Stripes tonal branding.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewsCount: 97,
    stockCount: 6,
    isNewArrival: true,
    isBestseller: false,
    hasDropTimer: true,
    dropEndTime: "2026-11-15T20:00:00Z",
    imageUrls: [
      // Adidas ZNE hoodie — dark hoodie product shots
      "https://assets.adidas.com/images/w_1880,f_auto,q_auto/830f6fa7207a4a14a367cd16806d60d1_9366/KF3776_21_model.jpg",
      "https://assets.adidas.com/images/w_1880,f_auto,q_auto/b100549877844464b71200172d0c567d_9366/KF3776_23_hover_model.jpg",
      "https://assets.adidas.com/images/w_1880,f_auto,q_auto/62708559762f42d9937bd5b4134c1e95_9366/KF3776_01_laydown.jpg"
    ],
    bundleIds: [3, 20]
  },
  {
    id: 29,
    name: "Nike Dri-FIT ADV Run Division Jacket",
    brand: "Nike",
    price: 165,
    originalPrice: 195,
    category: "Nike & Adidas",
    vibe: "Midnight Streetwear",
    description: "Laser-cut ventilation panels meet reflective tonal graphics on Nike's most technical running shell. Zippered hand pockets, packable hood, and seamless underarm panels for elite mobility.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewsCount: 58,
    stockCount: 7,
    isNewArrival: true,
    isBestseller: false,
    hasDropTimer: false,
    imageUrls: [
      // Nike running jacket / windbreaker shots
      "https://www.nike.qa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw5b07d142/nk/373/1/e/e/2/0/3731ee20_7704_41c4_b5fb_3a840c7adaea.jpg?sw=700&sh=700&sm=fit&q=100&strip=false",
      "https://www.nike.qa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwde0fe579/nk/bc0/1/0/9/c/8/bc0109c8_3415_4b27_bc36_1618b40c9d26.jpg?sw=700&sh=700&sm=fit&q=100&strip=false",
      "https://www.nike.qa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw9b595125/nk/9a8/d/9/c/7/1/9a8d9c71_c347_4c10_8c74_49e01c1731a1.jpg?sw=700&sh=700&sm=fit&q=100&strip=false"
    ],
    bundleIds: [27, 20]
  },
  {
    id: 30,
    name: "Adidas Forum Low 'Monochrome Noir'",
    brand: "Adidas",
    price: 115,
    originalPrice: 130,
    category: "Nike & Adidas",
    vibe: "Midnight Streetwear",
    description: "The 1984 basketball icon reimagined in total blackout. Leather upper with perforations, iconic ankle strap with velcro closure, and cupsole construction with heritage herringbone tread.",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    rating: 4.6,
    reviewsCount: 74,
    stockCount: 9,
    isNewArrival: false,
    isBestseller: false,
    hasDropTimer: false,
    imageUrls: [
      // Adidas Forum low sneaker shots
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/9efae4b5ffea4358a156b73db0c88f27_9366/Forum_Low_CL_Shoes_White_IH7830_01_standard.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/ce1598195e2a4c0999afe68b373c5d3d_9366/Forum_Low_CL_Shoes_White_IH7830_04_standard.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/ebe7b1caf608442eb1951810a0616f26_9366/Forum_Low_CL_Shoes_White_IH7830_05_standard.jpg"
    ],
    bundleIds: [21, 23]
  },

  // ─── UFC & FIGHTWEAR ─────────────────────────────────────────
  {
    id: 6,
    name: "UFC Championship Graphic Combat Tee",
    brand: "UFC",
    price: 85,
    originalPrice: 95,
    category: "UFC & Fightwear",
    vibe: "Fight Night",
    description: "Heavyweight 250gsm garment-washed combat jersey featuring vintage washed Octagon duel iconography, reinforced double-needle seams, and anti-shrink enzyme finish.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviewsCount: 312,
    stockCount: 2,
    isNewArrival: true,
    isBestseller: true,
    hasDropTimer: true,
    dropEndTime: "2026-10-25T18:00:00Z",
    imageUrls: [
      "https://img01.ztat.net/article/spp-media-p1/d534e674db9243a1ad1633ca5a716c8d/b2103b5a99914aab9c0db7bad062967e.jpg?imwidth=1800",
      "https://img01.ztat.net/article/spp-media-p1/10cfd4cb84f347ea81826ac52a1f6829/60eb89052a7a40e08358578e634cd2d8.jpg?imwidth=1800",
      "https://img01.ztat.net/article/spp-media-p1/212ef13e37534f7eae000e8a4dd13882/6075c6e5b464453e8c595b7525748779.jpg?imwidth=1800&filter=packshot"
    ],
    bundleIds: [8, 17]
  },
  {
    id: 7,
    name: "Octagon Walkout Fleece Pullover",
    brand: "UFC",
    price: 160,
    originalPrice: 180,
    category: "UFC & Fightwear",
    vibe: "Fight Night",
    description: "Official athlete tunnel-entry silhouette. Thermal French terry lined with brushed moisture-management fleece, thumbhole storm cuffs, and custom matte silver UFC hardware.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewsCount: 88,
    stockCount: 5,
    isNewArrival: true,
    isBestseller: false,
    hasDropTimer: true,
    dropEndTime: "2026-11-05T20:00:00Z",
    imageUrls: [
      // Walkout hoodie / dark hoodie shots
      "https://store.oktagonmma.com/cdn/shop/files/bomber-jacket-oktagon-8617686_1800x1800.png?v=1762042382",
      "https://store.oktagonmma.com/cdn/shop/files/bomber-jacket-oktagon-6010600_800x.png?v=1762042380",
      "https://store.oktagonmma.com/cdn/shop/files/bomber-jacket-oktagon-4147659_1800x1800.png?v=1762513205"
    ],
    bundleIds: [8, 20]
  },
  {
    id: 8,
    name: "Pro Combat Glideway Fight Shorts",
    brand: "UFC",
    price: 95,
    originalPrice: 110,
    category: "UFC & Fightwear",
    vibe: "Fight Night",
    description: "Four-way mechanical micro-stretch fabric with reinforced 4-inch side grappling splits, interlocking silicone waistband gripper, and sublimated stealth hexagonal matrix.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewsCount: 75,
    stockCount: 7,
    isNewArrival: false,
    isBestseller: true,
    hasDropTimer: false,
    imageUrls: [
      // Fight shorts / MMA shorts actual shots
      "https://images.footballfanatics.com/max-holloway/mens-ufc-unrivaled-by-venum-white-max-holloway-vale-tudo-short_ss5_p-201454716+pv-1+u-mq5kl3rdn2wd5nra9wmb+v-tru7xuwnbbc1rcg5ipsn.jpg?_hv=2&w=1018",
      "https://images.footballfanatics.com/max-holloway/mens-ufc-unrivaled-by-venum-white-max-holloway-vale-tudo-short_ss5_p-201454716+pv-2+u-mq5kl3rdn2wd5nra9wmb+v-wwltfm0b2c5qedcb0cd8.jpg?_hv=2&w=1018",
      "https://images.footballfanatics.com/max-holloway/mens-ufc-unrivaled-by-venum-white-max-holloway-vale-tudo-short_ss5_p-201454716+pv-3+u-mq5kl3rdn2wd5nra9wmb+v-5fislr0lhb5twjbqm5on.jpg?_hv=2&w=1018"
    ],
    bundleIds: [6, 9]
  },
  {
    id: 9,
    name: "Shadow Armor Compression Rashguard",
    brand: "UFC",
    price: 88,
    originalPrice: 100,
    category: "UFC & Fightwear",
    vibe: "Fight Night",
    description: "Second-skin compression designed for rigorous grappling and striking sessions. Flatlock anti-abrasion stitching and silver-ion antibacterial odor control mesh inserts.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewsCount: 119,
    stockCount: 3,
    isNewArrival: false,
    isBestseller: true,
    hasDropTimer: false,
    imageUrls: [
      // Compression rashguard / long sleeve compression shots
      "https://www.phantom-athletics.com/cdn/shop/files/Phantom-Athletics-MMA-Rashguard-shortsleeve-Germany-Black-Schwarz-0_2000x.jpg?v=1771582439",
      "https://www.phantom-athletics.com/cdn/shop/files/Phantom-Athletics-MMA-Rashguard-shortsleeve-Germany-Black-Schwarz-2_5000x.jpg?v=1771582439",
      "https://www.phantom-athletics.com/cdn/shop/files/Phantom-Athletics-MMA-Rashguard-shortsleeve-Germany-Black-Schwarz-1_5000x.jpg?v=1771582439"
    ],
    bundleIds: [8, 17]
  },
  {
    id: 10,
    name: "Apex Striker Heavyweight Training Tee",
    brand: "UFC",
    price: 78,
    originalPrice: 90,
    category: "UFC & Fightwear",
    vibe: "Fight Night",
    description: "Crafted for post-fight recovery and heavy camp drills. Features drop-shoulder relaxed cut, reinforced neck ribbing, and tonal combat crest typography.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewsCount: 46,
    stockCount: 12,
    isNewArrival: true,
    isBestseller: false,
    hasDropTimer: false,
    imageUrls: [
      // Heavyweight training tee / black tee shots
      "https://cdn.shopify.com/s/files/1/1367/5207/files/Conditioning_Club_Oversized_T_Shirt_GS_Black_Silver_Reflective_A2B5Y_BDMM_3_1920x.jpg?v=1787329638",
      "https://cdn.shopify.com/s/files/1/1367/5207/files/Conditioning_Club_Oversized_T_Shirt_GS_Black_Silver_Reflective_A2B5Y_BDMM_1_1920x.jpg?v=1787329637",
      "https://cdn.shopify.com/s/files/1/1367/5207/files/Conditioning_Club_Oversized_T_Shirt_GS_Black_Silver_Reflective_A2B5Y_BDMM_6_1920x.jpg?v=1787329634"
    ],
    bundleIds: [8, 16]
  },

  // ─── FOOTBALL KITS ───────────────────────────────────────────
  {
    id: 11,
    name: "Milano 1999 Blackout Heritage Kit",
    brand: "Noir Athletics",
    price: 145,
    originalPrice: 170,
    category: "Football Kits",
    vibe: "Matchday Ready",
    description: "An homage to the iconic late-90s European football aesthetic. Woven jacquard blackout stripes, rubberized matte crest, polo collar with tonal hidden press studs.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviewsCount: 204,
    stockCount: 1,
    isNewArrival: true,
    isBestseller: true,
    hasDropTimer: true,
    dropEndTime: "2026-10-15T22:00:00Z",
    imageUrls: [
      // Football jersey / kit shots
      "https://store.acmilan.com/cdn/shop/files/214396-A00_01_c9da89b1-dabe-4d2f-9176-4582c0c82fb7.jpg?v=1744333436&width=900",
      "https://store.acmilan.com/cdn/shop/files/214396-A00_02_1000x.jpg?v=1748007967",
      "https://store.acmilan.com/cdn/shop/files/214396-A00_03_1000x.jpg?v=1748007967"
    ],
    bundleIds: [16, 18]
  },
  {
    id: 12,
    name: "Madrid Noir Special Edition Matchday Jersey",
    brand: "Noir Athletics",
    price: 155,
    originalPrice: 180,
    category: "Football Kits",
    vibe: "Matchday Ready",
    description: "Ultra-breathable honeycomb ventilation chassis with iridescent carbon crest and sponsor branding. Raglan sleeve cut allows full range of kinetic strike motion.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewsCount: 167,
    stockCount: 4,
    isNewArrival: true,
    isBestseller: true,
    hasDropTimer: false,
    imageUrls: [
      // Football jersey matchday shots
      "https://i0.wp.com/sportclubmemories.com/wp-content/uploads/2025/03/20250420_2143_Stylish-Football-Jersey-Display_remix_01jsabgehfewktx7cath4az7j4-e1745178620229.jpg?fit=785%2C1024&ssl=1",
      "https://i0.wp.com/sportclubmemories.com/wp-content/uploads/2025/03/06ea6b93-fotor-2025032113258-scaled.jpg?fit=768%2C1024&ssl=1",
      "https://i0.wp.com/sportclubmemories.com/wp-content/uploads/2025/03/6dc8a134-fotor-2025032113460.jpg?fit=800%2C800&ssl=1"
    ],
    bundleIds: [20, 3]
  },
  {
    id: 13,
    name: "Pitch-Side Stormproof Warmup Hoodie",
    brand: "Noir Athletics",
    price: 175,
    originalPrice: 200,
    category: "Football Kits",
    vibe: "Matchday Ready",
    description: "Hydrophobic water-repellent heavyweight scuba blend with scuba-style 3-panel hood, magnetic kangaroo pouch, and thumb cuffs designed for cold-weather touchline prep.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewsCount: 92,
    stockCount: 6,
    isNewArrival: false,
    isBestseller: false,
    hasDropTimer: false,
    imageUrls: [
      // Warmup hoodie / training hoodie shots
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/a8fbedf65b154fe49e64cc9ddaff16cc_9366/MERCEDES_-_AMG_PETRONAS_FORMULA_1_TEAM_DRIVER_HOOD_Sweatshirt_Black_KF0166_21_model.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/3b1bb8cb624d4250abec55b85821e4a0_9366/MERCEDES_-_AMG_PETRONAS_FORMULA_1_TEAM_DRIVER_HOOD_Sweatshirt_Black_KF0166_23_hover_model.jpg",
      "https://assets.adidas.com/images/c_crop,f_auto,fl_lossy,g_north,h_840,q_auto,y_40/h_2000/e467d1ee4df34353b07b16aca4732597_9366/MERCEDES_-_AMG_PETRONAS_FORMULA_1_TEAM_DRIVER_HOOD_Sweatshirt_Black_KF0166_01_laydown_hover.jpg"
    ],
    bundleIds: [11, 20]
  },
  {
    id: 14,
    name: "Highbury Blackout Retro Track Top",
    brand: "Noir Athletics",
    price: 165,
    originalPrice: 190,
    category: "Football Kits",
    vibe: "Matchday Ready",
    description: "Structured tricot knit with vintage ribbed baseball collar, tonal embroidered gothic crest, and brushed interior that traps body warmth during chilly match nights.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewsCount: 84,
    stockCount: 2,
    isNewArrival: false,
    isBestseller: true,
    hasDropTimer: true,
    dropEndTime: "2026-11-20T21:00:00Z",
    imageUrls: [
      // Retro track top / zip-up jacket shots
      "https://i.ebayimg.com/thumbs/images/g/nkoAAeSwEoBqCiq9/s-l300.webp",
      "https://i.ebayimg.com/images/g/3WoAAeSw1URqCiq~/s-l1600.webp",
      "https://i.ebayimg.com/images/g/EUcAAeSwxGJqCiq~/s-l1600.webp"
    ],
    bundleIds: [23, 2]
  },
  {
    id: 15,
    name: "London Derby Training Anorak",
    brand: "Noir Athletics",
    price: 190,
    originalPrice: 225,
    category: "Football Kits",
    vibe: "Matchday Ready",
    description: "Ripstop wind-resistant quarter-zip pullover with concealed center storm pocket, elastic drawcord hem, and matte reflective sleeve chevrons for low-light night sessions.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewsCount: 51,
    stockCount: 7,
    isNewArrival: true,
    isBestseller: false,
    hasDropTimer: false,
    imageUrls: [
      // Anorak / windbreaker jacket shots
      "https://images.footballfanatics.com/chelsea/chelsea-nike-anorak-jacket-black_ss5_p-201455166+pv-4+u-ez7ep5ubpqncpol1rzch+v-3wctvylbivnyvywyoxji.png?_hv=2&w=1018",
      "https://images.footballfanatics.com/chelsea/chelsea-nike-anorak-jacket-black_ss5_p-201455166+pv-5+u-ez7ep5ubpqncpol1rzch+v-xeffs5h2u6xftouzxeqs.png?_hv=2&w=1018",
      "https://images.footballfanatics.com/chelsea/chelsea-nike-anorak-jacket-black_ss5_p-201455166+pv-8+u-ez7ep5ubpqncpol1rzch+v-ummi4otnybwi03lwqxgr.png?_hv=2&w=1018"
    ],
    bundleIds: [12, 16]
  },

  // ─── ACCESSORIES ─────────────────────────────────────────────
  {
    id: 16,
    name: "Noir Minimalist Onyx Steel Watch",
    brand: "Noir Studio",
    price: 320,
    originalPrice: 380,
    category: "Accessories",
    vibe: "Stealth Accessories",
    description: "316L surgical-grade stainless steel in matte PVD black finish. Swiss quartz movement, scratch-resistant sapphire crystal glass, and minimal unbranded obsidian dial.",
    sizes: ["One Size"],
    rating: 5.0,
    reviewsCount: 178,
    stockCount: 3,
    isNewArrival: true,
    isBestseller: true,
    hasDropTimer: true,
    dropEndTime: "2026-10-30T12:00:00Z",
    imageUrls: [
      // Black minimalist watch product shots
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80"
    ],
    bundleIds: [17, 18]
  },
  {
    id: 17,
    name: "Heavy Silver Cuban Link Chain (8mm)",
    brand: "Noir Studio",
    price: 195,
    originalPrice: 230,
    category: "Accessories",
    vibe: "Stealth Accessories",
    description: "Solid 925 sterling silver treated with an artisanal dark-oxidized antique patina. Custom heavy box clasp with safety double-latch and laser-etched serial hallmarking.",
    sizes: ["50cm", "55cm", "60cm"],
    rating: 4.9,
    reviewsCount: 145,
    stockCount: 5,
    isNewArrival: true,
    isBestseller: true,
    hasDropTimer: false,
    imageUrls: [
      // Cuban link chain / silver necklace actual shots
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611591475152-477d13031024?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
    ],
    bundleIds: [16, 21]
  },
  {
    id: 18,
    name: "Matte Black Acetate Polarized Sunglasses",
    brand: "Noir Studio",
    price: 165,
    originalPrice: 195,
    category: "Accessories",
    vibe: "Stealth Accessories",
    description: "Mazzucchelli handcrafted acetate frame with squared architectural geometry. Category 3 dark smoke polarized nylon lenses providing 100% UVA/UVB blockage.",
    sizes: ["One Size"],
    rating: 4.8,
    reviewsCount: 98,
    stockCount: 2,
    isNewArrival: false,
    isBestseller: true,
    hasDropTimer: false,
    imageUrls: [
      // Matte black sunglasses actual shots
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1000&q=80"
    ],
    bundleIds: [20, 21]
  },
  {
    id: 19,
    name: "Full-Grain Leather Stealth Cardholder",
    brand: "Noir Studio",
    price: 85,
    originalPrice: 105,
    category: "Accessories",
    vibe: "Stealth Accessories",
    description: "Vegetable-tanned Tuscan leather hand-waxed in midnight black. Features 4 precision card slots, central cash slot, and RFID-blocking electromagnetic shield layer.",
    sizes: ["One Size"],
    rating: 4.9,
    reviewsCount: 112,
    stockCount: 8,
    isNewArrival: false,
    isBestseller: false,
    hasDropTimer: false,
    imageUrls: [
      // Black leather cardholder / wallet shots
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1606503829068-18e388fa909b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1000&q=80"
    ],
    bundleIds: [16, 20]
  },
  {
    id: 20,
    name: "Stealth Boiled Wool 6-Panel Cap",
    brand: "Noir Studio",
    price: 75,
    originalPrice: 90,
    category: "Accessories",
    vibe: "Stealth Accessories",
    description: "Structured high-density boiled wool crown with curved peak, tonal 3D embroidered NOIR sigil, supple cowhide sweatband, and antique brass custom slider clasp.",
    sizes: ["Adjustable"],
    rating: 4.8,
    reviewsCount: 133,
    stockCount: 4,
    isNewArrival: true,
    isBestseller: true,
    hasDropTimer: false,
    imageUrls: [
      // Black 6-panel cap / snapback actual shots
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80"
    ],
    bundleIds: [21, 1]
  },

  // ─── NOIR EXCLUSIVES ─────────────────────────────────────────
  {
    id: 21,
    name: "Monochromatic Void Oversized Tee",
    brand: "Noir Studio",
    price: 95,
    originalPrice: 115,
    category: "Noir Exclusives",
    vibe: "Midnight Streetwear",
    description: "Cut from ultra-dense 300gsm raw Supima combed cotton. Features dropped shoulder profile, high neck collar ribbing, and garment-washed carbon black bath for permanent rich saturation.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviewsCount: 265,
    stockCount: 3,
    isNewArrival: true,
    isBestseller: true,
    hasDropTimer: true,
    dropEndTime: "2026-10-20T19:00:00Z",
    imageUrls: [
      // Oversized black tee product shots
      "https://m.media-amazon.com/images/I/61DMag-TjNL._SY741_.jpg",
      "https://m.media-amazon.com/images/I/51ds4F5onYL._SX569_.jpg",
      "https://m.media-amazon.com/images/I/71mjjQMQ-tL._SY741_.jpg"
    ],
    bundleIds: [23, 17]
  },
  {
    id: 22,
    name: "Heavyweight Tactical Stealth Parka",
    brand: "Noir Studio",
    price: 495,
    originalPrice: 580,
    category: "Noir Exclusives",
    vibe: "Midnight Streetwear",
    description: "Waterproof 3-layer laminated GORE-TEX® grade shell with PrimaLoft® Gold insulation. Magnetic storm flap, fidlock quick-release harness straps, and concealed internal tablet holsters.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewsCount: 79,
    stockCount: 2,
    isNewArrival: true,
    isBestseller: true,
    hasDropTimer: true,
    dropEndTime: "2026-10-18T23:59:59Z",
    imageUrls: [
      // Tactical parka / heavy jacket shots
      "https://legendaryusa.com/cdn/shop/files/rothco-mens-special-ops-tactical-fleece-jacket-legendary-usa-1.webp?v=1757254742&width=1280",
      "https://legendaryusa.com/cdn/shop/files/rothco-mens-special-ops-tactical-fleece-jacket-legendary-usa-9.webp?v=1757254851&width=960",
      "https://legendaryusa.com/cdn/shop/files/rothco-mens-special-ops-tactical-fleece-jacket-legendary-usa-3.webp?v=1757254770&width=960"
    ],
    bundleIds: [23, 20]
  },
  {
    id: 23,
    name: "Architectural Selvedge Cargo Joggers",
    brand: "Noir Studio",
    price: 260,
    originalPrice: 295,
    category: "Noir Exclusives",
    vibe: "Midnight Streetwear",
    description: "Constructed from 12oz Japanese dense twill with articulated knee pleating. 8 tactical pocket compartments with water-sealed taped zips and modular Fidlock magnetic cinch ankles.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewsCount: 154,
    stockCount: 4,
    isNewArrival: false,
    isBestseller: true,
    hasDropTimer: false,
    imageUrls: [
      // Cargo joggers / tactical pants shots
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ee3f5a48-3cba-491b-8a2d-f3cd9f968b3e/K+NSW+CLUB+FLC+CRGO+PNT+LBR.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/19f07beb-7ed5-4568-abfa-7871be2af7e5/K+NSW+CLUB+FLC+CRGO+PNT+LBR.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/5066ad3a-0183-47ea-9964-0580861abd35/K+NSW+CLUB+FLC+CRGO+PNT+LBR.png"
    ],
    bundleIds: [21, 2]
  },
  {
    id: 24,
    name: "Obsidian Cashmere Wool Overcoat",
    brand: "Noir Studio",
    price: 640,
    originalPrice: 720,
    category: "Noir Exclusives",
    vibe: "Midnight Streetwear",
    description: "Double-faced 800gsm melton wool and Mongolian cashmere weave. Architectural peak lapels, deep hidden storm welt pockets, and hand-stitched cupro lining for smooth friction-free layering.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviewsCount: 68,
    stockCount: 2,
    isNewArrival: true,
    isBestseller: false,
    hasDropTimer: true,
    dropEndTime: "2026-11-10T15:00:00Z",
    imageUrls: [
      // Long overcoat / wool coat shots
      "https://cdn.suitsupply.com/image/upload/t_pdp-hero-default-desktop/f_auto,q_auto,w_1296/products/coats/default/winter/j1074_1",
      "https://cdn.suitsupply.com/image/upload/t_pdp-detail-default-desktop/f_auto,q_auto,w_768/products/coats/default/winter/j1074_101",
      "https://cdn.suitsupply.com/image/upload/t_pdp-detail-default-desktop/f_auto,q_auto,w_1296/products/coats/default/winter/j1074_102"
    ],
    bundleIds: [16, 17]
  },
  {
    id: 25,
    name: "Raw Seam Combat Thermal Crewneck",
    brand: "Noir Studio",
    price: 140,
    originalPrice: 165,
    category: "Noir Exclusives",
    vibe: "Fight Night",
    description: "Heavy waffle-knit honeycomb cotton with reversed overlock structural seams, extended thumb loops, and asymmetrical drop hem designed for athletic physique aesthetics.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewsCount: 82,
    stockCount: 5,
    isNewArrival: false,
    isBestseller: false,
    hasDropTimer: false,
    imageUrls: [
      // Crewneck sweatshirt / dark thermal shots
      "https://images.footballfanatics.com/ufc-merchandise/mens-ovo-x-ufc-black-full-zip-hoodie_ss5_p-204089558+pv-1+u-102znakfspir542gnake+v-ydbql7kanmxon5k7tkpi.jpg?_hv=2&w=1018",
      "https://images.footballfanatics.com/ufc-merchandise/mens-ovo-x-ufc-black-full-zip-hoodie_ss5_p-204089558+pv-2+u-102znakfspir542gnake+v-7snlyubekg3crm40prde.jpg?_hv=2&w=1018",
      "https://images.footballfanatics.com/ufc-merchandise/mens-ovo-x-ufc-black-full-zip-hoodie_ss5_p-204089558+pv-3+u-102znakfspir542gnake+v-azltsxr8dpmxkncmsvrj.jpg?_hv=2&w=1018"
    ],
    bundleIds: [23, 20]
  },
  {
    id: 26,
    name: "Stealth Sling Crossbody Utility Pack",
    brand: "Noir Studio",
    price: 150,
    originalPrice: 175,
    category: "Accessories",
    vibe: "Stealth Accessories",
    description: "Ballistic Cordura® 1000D water-repellent construction with magnetic German Fidlock V-buckle, expandable internal divider, and concealable carabiner attachment loop.",
    sizes: ["One Size"],
    rating: 4.9,
    reviewsCount: 117,
    stockCount: 3,
    isNewArrival: true,
    isBestseller: true,
    hasDropTimer: false,
    imageUrls: [
      // Sling bag / crossbody utility pack shots
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80"
    ],
    bundleIds: [21, 18]
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    badge: "Vault Drop 01",
    title: "NOIR FALL / WINTER '26",
    subtitle: "Stealth Streetwear & Outerwear Drops",
    description: "Engineered in silence. Technical parkas, selvedge cargos, and heavyweight oversized silhouettes built for the architectural urban frontier.",
    cta: "Shop Collection",
    categoryFilter: "Noir Exclusives",
    vibeFilter: "Midnight Streetwear",
    // Dark epic mythology / legend image — Achilles / warrior / dark epic mythology aesthetic
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1920&q=85",
    accentColor: "#C9A96E"
  },
  {
    id: 2,
    badge: "Combat Division",
    title: "OCTAGON & PERFORMANCE",
    subtitle: "Official UFC & Fightwear Apparel",
    description: "Tested under championship lights. Thermal walkout hoodies, compression armor, and glideway combat shorts forged for elite battle.",
    cta: "Explore Gear",
    categoryFilter: "UFC & Fightwear",
    vibeFilter: "Fight Night",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1920&q=85",
    accentColor: "#8B0000"
  },
  {
    id: 3,
    badge: "Pitch Black Series",
    title: "BLACKOUT FOOTBALL KITS",
    subtitle: "Limited Edition Matchday Apparel",
    description: "An homage to golden eras of European club heritage. Monochromatic jacquards, iridescent carbon badges, and cold-weather training tops.",
    cta: "View Kits",
    categoryFilter: "Football Kits",
    vibeFilter: "Matchday Ready",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1920&q=85",
    accentColor: "#C9A96E"
  },
  {
    id: 4,
    badge: "Hardware Division",
    title: "LUXURY ESSENTIALS",
    subtitle: "Minimalist Watches & Stainless Accessories",
    description: "Hand-finished 316L stainless steel timepieces, oxidized 925 Cuban link silver chains, and Italian acetate sunglasses.",
    cta: "Shop Accessories",
    categoryFilter: "Accessories",
    vibeFilter: "Stealth Accessories",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=85",
    accentColor: "#C9A96E"
  }
];
