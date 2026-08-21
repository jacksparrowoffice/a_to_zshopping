"use client";
import React, { useState } from "react";

const PRODUCTS = [
  {
    id: "1",
    title: "Embroidered Anarkali Kurta Set",
    store: "Meesho",
    storeBadge: "bg-pink-100 text-pink-700 border-pink-200",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop",
    price: 499,
    originalPrice: 799,
    lowestPrice: 449,
    rating: 4.6,
    reviews: 1280,
    affiliateUrl: "YOUR_EARNKARO_OR_EXTRAPE_LINK",
    matchTag: "98% Trend Match"
  },
  {
    id: "2",
    title: "Matte Liquid Lipstick Set (Pack of 3)",
    store: "Tira Beauty",
    storeBadge: "bg-purple-100 text-purple-700 border-purple-200",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop",
    price: 299,
    originalPrice: 599,
    lowestPrice: 279,
    rating: 4.8,
    reviews: 840,
    affiliateUrl: "YOUR_EARNKARO_OR_EXTRAPE_LINK",
    matchTag: "Tira Bestseller"
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cameraImage, setCameraImage] = useState<string | null>(null);
  const [isMatching, setIsMatching] = useState(false);

  const handleCameraUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsMatching(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCameraImage(reader.result as string);
        setTimeout(() => setIsMatching(false), 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans pb-16 max-w-md mx-auto relative border-x border-slate-800">
      
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            A to Z Shopping
          </h1>
          <p className="text-[10px] text-slate-400 font-semibold tracking-wider">AI PRICE TRACKER & LOOK MATCH</p>
        </div>

        <label className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer shadow-lg shadow-pink-500/20 active:scale-95 transition-all">
          <span>📷 AI Match</span>
          <input type="file" accept="image/*" capture="environment" onChange={handleCameraUpload} className="hidden" />
        </label>
      </header>

      {/* AI Outfit Matcher Banner */}
      {cameraImage && (
        <div className="m-4 p-3 bg-slate-800/80 border border-pink-500/30 rounded-2xl flex items-center gap-3">
          <img src={cameraImage} alt="Uploaded outfit" className="w-14 h-14 object-cover rounded-xl border border-pink-500" />
          <div className="flex-1">
            <span className="text-xs font-bold text-pink-400">
              {isMatching ? "⚡ AI Scanning Outfit..." : "✨ Best Matching Products Found!"}
            </span>
            <p className="text-[11px] text-slate-300">Showing top style matches below.</p>
          </div>
          <button onClick={() => setCameraImage(null)} className="text-slate-400 text-xs px-2">✕</button>
        </div>
      )}

      {/* Trending Stories */}
      <div className="px-4 mt-4">
        <p className="text-xs font-bold text-slate-400 mb-2">🔥 WHAT'S IN TREND</p>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { label: "Anarkali", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150" },
            { label: "Tira Glow", img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=150" },
            { label: "Earbuds", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=150" },
            { label: "Watches", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150" }
          ].map((story, i) => (
            <div key={i} className="flex flex-col items-center shrink-0">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 to-indigo-500">
                <img src={story.img} alt={story.label} className="w-full h-full object-cover rounded-full border-2 border-slate-900" />
              </div>
              <span className="text-[10px] font-medium text-slate-300 mt-1">{story.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 mt-3 flex gap-2 overflow-x-auto">
        {["All", "Meesho Kurtas", "Tira Beauty", "Price Drops"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                : "bg-slate-800 text-slate-400 border border-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      <main className="px-4 mt-4 space-y-5">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
            <div className="relative aspect-4/3">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-lg border backdrop-blur-md ${product.storeBadge}`}>
                {product.store}
              </span>
              <span className="absolute top-3 right-3 text-[10px] font-extrabold bg-emerald-500 text-slate-950 px-2 py-1 rounded-lg">
                {product.matchTag}
              </span>
            </div>

            <div className="p-4 space-y-3">
              <h2 className="font-bold text-slate-100 text-base">{product.title}</h2>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-emerald-400">₹{product.price}</span>
                <span className="text-xs text-slate-500 line-through">₹{product.originalPrice}</span>
                <span className="text-xs text-pink-400 font-bold ml-auto">
                  Lowest: ₹{product.lowestPrice}
                </span>
              </div>

              {/* Price Graph */}
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/50">
                <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                  <span>Price History Trend</span>
                  <span className="text-emerald-400 font-bold">📉 Dropped Recently</span>
                </div>
                <svg className="w-full h-8 stroke-emerald-400 fill-none" viewBox="0 0 100 30">
                  <path d="M 0 5 L 25 12 L 50 20 L 75 28 L 100 22" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>

              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-500/25 active:scale-98 transition-all text-sm"
              >
                Grab Lowest Price Deal →
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
