import React from "react";

const PRODUCTS = [
  {
    id: "1",
    title: "Embroidered Anarkali Kurta Set",
    brand: "Meesho",
    price: "₹499",
    lowestPrice: "₹449",
    highestPrice: "₹799",
    profitLink: "https://earnkaro.com/YOUR_PROFIT_LINK_1", // Paste EarnKaro link here
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
    isOnSale: true,
  },
  {
    id: "2",
    title: "Matte Liquid Lipstick Set",
    brand: "Tira Beauty",
    price: "₹899",
    lowestPrice: "₹799",
    highestPrice: "₹1,200",
    profitLink: "https://earnkaro.com/YOUR_PROFIT_LINK_2", // Paste EarnKaro link here
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600",
    isOnSale: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 max-w-md mx-auto">
      <header className="text-center py-6 border-b border-slate-800 mb-6">
        <h1 className="text-2xl font-black tracking-tight text-rose-500">A to Z Shopping</h1>
        <p className="text-xs text-slate-400 mt-1">Daily Deals & Live Price History</p>
      </header>

      <div className="space-y-6">
        {PRODUCTS.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-xl mb-3" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">{item.brand}</span>
            <h2 className="text-sm font-semibold text-slate-100">{item.title}</h2>
            <p className="text-lg font-extrabold text-emerald-400 mt-1">{item.price}</p>

            {/* Price Tracker Map */}
            <div className="mt-3 p-2 bg-slate-950 rounded-lg text-[10px] border border-slate-800">
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Lowest: {item.lowestPrice}</span>
                <span>Highest: {item.highestPrice}</span>
              </div>
              {item.isOnSale && <span className="text-emerald-400 font-bold">🔥 Price Drop Active!</span>}
            </div>

            <a
              href={item.profitLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full text-center bg-rose-600 hover:bg-rose-500 font-bold text-xs py-2.5 rounded-xl transition-colors"
            >
              Buy Now (Official Store)
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
