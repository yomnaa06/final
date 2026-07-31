
export interface Collection {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    heroImage?: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    slug: string;
    collection: string;
    price: number;
    description: string;
    longDescription: string;
    materials: string;
    dimensions?: string;
    images: string[];
    featured?: boolean;
    new?: boolean;
    brand?: string;
  }
  
  export const collections: Collection[] = [
    {
      id: "filtres",
      name: "Filtration",
      slug: "filtres",
      description: "Filtres à huile, air, habitacle et carburant sélectionnés pour un usage professionnel intensif.",
      image: "/images/categories/filtrations.png",
      heroImage: "/images/categories/filtrations.png",
    },
    {
      id: "fluides",
      name: "Fluides",
      slug: "fluides",
      description: "Ad-Blue, eau batterie, huile de frein, liquide nettoyant, liquide refroidissement.",
      image: "/images/categories/fluides.png",
      heroImage: "/images/categories/fluides.png",
    },
    {
      id: "lubrifiants",
      name: "Lubrifiants",
      slug: "lubrifiants",
      description: "Huiles moteur, transmission et graisses techniques de qualité constructeur.",
      image: "/images/categories/lubrifiants.png",
      heroImage: "/images/categories/lubrifiants2.png",
    },
    {
      id: "freinage",
      name: "Freinage",
      slug: "freinage",
      description: "Plaquettes, disques, mâchoires et liquides — la sécurité au cœur de chaque référence.",
      image: "/images/categories/freinages.png",
      heroImage:"/images/categories/freinages.png",
    },
    {
      id: "suspensions",
      name: "Suspensions",
      slug: "suspensions",
      description: "Amortisseurs, ressorts et pièces de train roulant conçus pour durer.",
      image: "/images/categories/suspensions.png",
      heroImage: "/images/categories/suspensions.png",
    },
    {
      id: "refroidissement",
      name: "Refroidissement",
      slug: "refroidissement",
      description: "Radiateurs, thermostats, pompes à eau et liquides pour préserver le moteur.",
      image: "/images/categories/refroidissements2.png",
      heroImage:"/images/categories/refroidissements2.png",
    },
    {
      id: "carrosserie",
      name: "Carrosserie",
      slug: "carrosserie",
      description: "Optiques, rétroviseurs, boucliers et éléments de carrosserie d'origine.",
      image: "/images/categories/carrosseries.png",
      heroImage: "/images/categories/carrosseries2.png",
    },
  ];
  
  export const products: Product[] = [
    // filtration
    {
      id: "filtre-huile-bosch",
      name: "Filtre à huile P3316",
      slug: "filtre-huile-bosch",
      collection: "filtres",
      price: 18,
      brand: "Bosch",
      description: "Cartouche filtrante haute capacité pour moteurs Diesel.",
      longDescription: "Cartouche filtrante haute capacité pour moteurs Diesel.",
      materials: "Compatible VAG 1.9 TDI / 2.0 TDI",
      dimensions: "0 451 103 316",
      images: ["/images/products/p3116.png"],
      featured: true,
      new: true,
    },
    {
      id: "filtre-air-mahle",
      name: "Filtre à air LX 1566",
      slug: "filtre-air-mahle",
      collection: "filtres",
      price: 24,
      brand: "Mahle",
      description: "Media filtrant micro-fibre pour un débit d'air optimal.",
      longDescription: "Media filtrant micro-fibre pour un débit d'air optimal.",
      materials: "Renault Clio / Kangoo 1.5 dCi",
      dimensions: "LX 1566",
      images: ["/images/products/filtre_a_l'air_lx.png"],
      featured: false,
      new: false,
    },
    
    // fluides
    {
      id: "ad-blue-total",
      name: "Ad-Blue 10 L",
      slug: "ad-blue-total",
      collection: "fluides",
      price: 45,
      brand: "Total",
      description: "Solution pour réduction des émissions NOx.",
      longDescription: "Solution pour réduction des émissions NOx. Qualité constructeur.",
      materials: "Tous véhicules Diesel",
      dimensions: "10 L",
      images: ["/images/products/adblue_10_litres_total.jpg"],
      featured: true,
      new: true,
    },
    {
      id: "liquide-frein-ferodo",
      name: "Liquide de frein DOT 4 — 1 L",
      slug: "liquide-frein-ferodo",
      collection: "fluides",
      price: 14,
      brand: "Ferodo",
      description: "Point d'ébullition ≥ 260 °C, résistance à l'humidité.",
      longDescription: "Liquide de frein haute performance DOT 4.",
      materials: "Toutes marques",
      dimensions: "1 L",
      images:   ["/images/products/ferodo_liquide_frein_dot4_1l.jpg"],
      featured: false,
      new: false,
    },
    
    // freinage
    {
      id: "plaquettes-brembo",
      name: "Plaquettes avant P85 020",
      slug: "plaquettes-brembo",
      collection: "freinage",
      price: 84,
      brand: "Brembo",
      description: "Garniture faible poussière, freinage progressif.",
      longDescription: "Garniture faible poussière, freinage progressif.",
      materials: "VW Golf V / Audi A3",
      dimensions: "P 85 020",
      images:  ["/images/products/brembo_plaquettes_avant_p85_020.jpg"],
      featured: true,
      new: false,
    },
    {
      id: "disques-ate",
      name: "Disques ventilés Ø 288 mm",
      slug: "disques-ate",
      collection: "freinage",
      price: 96,
      brand: "ATE",
      description: "Disques ventilés haute performance, revêtement anti-corrosion.",
      longDescription: "Disques ventilés haute performance.",
      materials: "BMW Série 3 E90",
      dimensions: "288 mm",
      images: ["/images/products/disquettes_ventile_288mm.jpg"],
      featured: false,
      new: true,
    },
    
    // lubrifiants
    {
      id: "total-quartz",
      name: "Total Quartz 9000 5W-40 — 5 L",
      slug: "total-quartz",
      collection: "lubrifiants",
      price: 108,
      brand: "Total",
      description: "Huile 100 % synthèse pour moteurs modernes.",
      longDescription: "Huile 100 % synthèse pour moteurs modernes.",
      materials: "Essence & Diesel — ACEA A3/B4",
      dimensions: "5 L",
      images: ["/images/products/total_quartz_9000.png"],
      featured: true,
      new: true,
    },
    {
      id: "elf-evolution",
      name: "Elf Evolution Fulltech 5W-30 — 5 L",
      slug: "elf-evolution",
      collection: "lubrifiants",
      price: 118,
      brand: "Elf",
      description: "Formulation FAP compatible pour Diesel équipés de filtre à particules.",
      longDescription: "Huile moteur haute performance.",
      materials: "Renault RN0720",
      dimensions: "5 L",
      images: ["/images/products/elf_evolution_fulltech_5w.jpeg"],
      featured: false,
      new: false,
    },
    
    //suspensions
    {
      id: "amortisseur-monroe",
      name: "Amortisseur avant G8108",
      slug: "amortisseur-monroe",
      collection: "suspensions",
      price: 128,
      brand: "Monroe",
      description: "Amortisseur à gaz — tenue de route et confort.",
      longDescription: "Amortisseur à gaz — tenue de route et confort.",
      materials: "Peugeot 208 / 2008",
      dimensions: "G8108",
      images: ["/images/products/monroe_amortisseur_avant.png"],
      featured: true,
      new: true,
    },
    {
      id: "ressort-lesjofors",
      name: "Ressort avant renforcé",
      slug: "ressort-lesjofors",
      collection: "suspensions",
      price: 68,
      brand: "Lesjöfors",
      description: "Acier à haute résistance pour charges lourdes.",
      longDescription: "Ressort de suspension renforcé.",
      materials: "Fiat Ducato",
      dimensions: "4095029",
      images: ["/images/products/lesjofores_ressort_avant.png"],
      featured: false,
      new: false,
    },
    
    // refroidissement
    {
      id: "radiateur-valeo",
      name: "Radiateur moteur",
      slug: "radiateur-valeo",
      collection: "refroidissement",
      price: 246,
      brand: "Valeo",
      description: "Structure aluminium brasé, connectique renforcée.",
      longDescription: "Radiateur moteur haute performance.",
      materials: "Renault Mégane III 1.5 dCi",
      dimensions: "732913",
      images: ["/images/products/radiateur_moteur_valeo.jpg"],
      featured: false,
      new: false,
    },
    {
      id: "thermostat-behr",
      name: "Thermostat TX 110",
      slug: "thermostat-behr",
      collection: "refroidissement",
      price: 38,
      brand: "Behr",
      description: "Ouverture à 87 °C, montage direct.",
      longDescription: "Thermostat de refroidissement.",
      materials: "VW Passat B6 / Skoda Octavia II",
      dimensions: "TX 110 87D",
      images: ["/images/products/behr_thermosthat.png"],
      featured: false,
      new: true,
    },
    
    // carrosserie
    {
      id: "optique-valeo",
      name: "Projecteur avant droit",
      slug: "optique-valeo",
      collection: "carrosserie",
      price: 312,
      brand: "Valeo",
      description: "Bloc optique halogène, connectique d'origine.",
      longDescription: "Projecteur avant halogène.",
      materials: "Peugeot 208 phase 1",
      dimensions: "043827",
      images: ["/images/products/projecteur_avantdroit_valeo.jpg"],
      featured: false,
      new: true,
    },
    {
      id: "retro-hella",
      name: "Rétroviseur extérieur gauche",
      slug: "retro-hella",
      collection: "carrosserie",
      price: 148,
      brand: "Hella",
      description: "Coque à peindre, réglage électrique.",
      longDescription: "Rétroviseur extérieur.",
      materials: "Renault Clio IV",
      dimensions: "9MX 181 815-011",
      images: ["/images/products/retroviseur_ext_gauche_hella.jpg"],
      featured: false,
      new: false,
    },
  ];
  
  export const getProductBySlug = (slug: string) =>
    products.find((p) => p.slug === slug);
  
  export const getProductsByCollection = (slug: string) =>
    products.filter((p) => p.collection === slug);
  
  export const getFeaturedProducts = () => products.filter((p) => p.featured);
  
  export const getNewProducts = () => products.filter((p) => p.new);
  
  export const getCollectionBySlug = (slug: string) =>
    collections.find((c) => c.slug === slug);
  
  export const getRelatedProducts = (productId: string, limit = 4) => {
    const source = products.find((p) => p.id === productId);
    if (!source) return products.slice(0, limit);
    return products
      .filter((p) => p.id !== productId && p.collection === source.collection)
      .slice(0, limit);
  };