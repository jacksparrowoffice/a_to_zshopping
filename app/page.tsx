"use client";
import React, { useState, useEffect } from "react";

interface Product {
  id: string;
  title: string;
  store: "Meesho" | "Tira";
  storeBadge: string;
  image: string;
  price: number;
  originalPrice: number;
  lowestPrice: number;
  category: string;
  description: string;
  specs: string[];
  rating: string;
  inStock: boolean;
  upiId?: string;
  affiliateUrl?: string;
  priceHistory: number[];
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  productTitle: string;
  amount: number;
  paymentMethod: "COD" | "Meesho QR" | "Tira Link";
  status: "Pending" | "Dispatched" | "Completed";
  date: string;
}

export default function Storefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<"store" | "user" | "admin">("store");
  const [expandedDetailId, setExpandedDetailId] = useState<string | null>(null);

  // Client User State
  const [user, setUser] = useState({ name: "Rahul Sharma", phone: "9876543210", address: "Kanpur, UP" });

  // Sales & Order Management State
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-1001",
      customerName: "Priya Singh",
      phone: "9123456789",
      address: "Civil Lines, Kanpur",
      productTitle: "Embroidered Anarkali Kurta Set",
      amount: 499,
      paymentMethod: "Meesho QR",
      status: "Pending",
      date: "2026-08-21"
    }
  ]);

  // Checkout State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"form" | "payment" | "success">("form");
  const [paymentType, setPaymentType] = useState<"COD" | "Online">("COD");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  // Fetch scraped data dynamically
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);

  const getMeeshoQR = (upiId: string, amount: number) => {
    const upiUrl = `upi://pay?pa=${upiId}&pn=AtoZ_Store&am=${amount}&cu=INR`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUrl)}`;
  };

  const handleCreateOrder = (method: "COD" | "Meesho QR" | "Tira Link") => {
    if (!selectedProduct) return;
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: form.name || user.name,
      phone: form.phone || user.phone,
      address: form.address || user.address,
      productTitle: selectedProduct.title,
      amount: selectedProduct.price,
      paymentMethod: method,
      status: "Pending",
      date: new Date().toISOString().split("T")[0]
    };
    setOrders([newOrder, ...orders]);
    setCheckoutStep("success");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans max-w-md mx-auto relative border-x border-slate-800 pb-20">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
            A to Z Store
          </h1>
          <p className="text-[10px] text-slate-400 font-semibold tracking-wider">LIVE RESELLING HUB</p>
        </div>

        <nav className="flex bg-slate-800 p-1 rounded-xl text-xs font-bold gap-1">
          <button
            onClick={() => setActiveTab("store")}
            className={`px-2.5 py-1 rounded-lg ${activeTab === "store" ? "bg-purple-600 text-white" : "text-slate-400"}`}
          >
            🛍️ Store
          </button>
          <button
            onClick={() => setActiveTab("user")}
            className={`px-2.5 py-1 rounded-lg ${activeTab === "user" ? "bg-purple-600 text-white" : "text-slate-400"}`}
          >
            👤 Client
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`px-2.5 py-1 rounded-lg ${activeTab === "admin" ? "bg-emerald-600 text-white" : "text-slate-400"}`}
          >
            📊 Sales
          </button>
        </nav>
      </header>

      {/* STORE TAB */}
      {activeTab === "store" && (
        <main className="p-4 space-y-4">
          {products.map((p) => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-3 p-4">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md border backdrop-blur-md ${p.storeBadge}`}>
                  {p.store}
                </span>
              </div>

              <div>
                <div className="flex justify-between items-start">
                  <h2 className="font-bold text-sm text-slate-100">{p.title}</h2>
                  <span className="text-xs font-black text-emerald-400">₹{p.price}</span>
                </div>
                <span className="text-[10px] text-amber-400 font-semibold">{p.rating}</span>
              </div>

              {/* Scraped Description */}
              <p className="text-xs text-slate-400">{p.description}</p>

              {/* Live Price Tracker Widget */}
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400 font-semibold">Live Price Drop Tracker</span>
                  <span className="text-emerald-400 font-bold">Save ₹{p.originalPrice - p.price}</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Trend: {p.priceHistory.map((h) => `₹${h}`).join(" ➔ ")}
                </div>
              </div>

              {/* Toggle Scraped Specifications */}
              <button
                onClick={() => setExpandedDetailId(expandedDetailId === p.id ? null : p.id)}
                className="text-xs text-purple-400 font-bold underline block"
              >
                {expandedDetailId === p.id ? "Hide Specifications ▲" : "View Scraped Specifications ▼"}
              </button>

              {expandedDetailId === p.id && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <span className="font-bold text-purple-400 text-[11px]">Technical Specifications:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-300">
                    {p.specs.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => {
                  setSelectedProduct(p);
                  setCheckoutStep("form");
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Buy Now Direct
              </button>
            </div>
          ))}
        </main>
      )}

      {/* CLIENT / USER MANAGEMENT TAB */}
      {activeTab === "user" && (
        <div className="p-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-sm text-purple-400">👤 User Profile Details</h3>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p><strong className="text-slate-500">Name:</strong> {user.name}</p>
              <p><strong className="text-slate-500">Phone:</strong> {user.phone}</p>
              <p><strong className="text-slate-500">Delivery Address:</strong> {user.address}</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-sm text-slate-100">📦 Order History & Tracking</h3>
            {orders.length === 0 ? (
              <p className="text-xs text-slate-500">No active orders placed yet.</p>
            ) : (
              orders.map((o) => (
                <div key={o.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>{o.productTitle}</span>
                    <span className="text-emerald-400">₹{o.amount}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{o.date} ({o.paymentMethod})</span>
                    <span className="text-amber-400 font-semibold">{o.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SALES MANAGEMENT TAB */}
      {activeTab === "admin" && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Revenue</span>
              <p className="text-xl font-black text-emerald-400 mt-1">₹{totalRevenue}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Orders</span>
              <p className="text-xl font-black text-purple-400 mt-1">{orders.length}</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-sm text-emerald-400">📊 Sales Management Dashboard</h3>
            <div className="space-y-3">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold text-slate-100">
                    <span>{ord.id} - {ord.customerName}</span>
                    <span className="text-emerald-400">₹{ord.amount}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{ord.phone} | {ord.address}</p>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-800/80 text-[10px]">
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">{ord.paymentMethod}</span>
                    <span className="text-emerald-400 font-bold">{ord.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT & PAYMENT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 w-full max-w-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-slate-100">Checkout - {selectedProduct.title}</h3>
              <button onClick={() => setSelectedProduct(null)} className="text-slate-400 text-sm">✕</button>
            </div>

            {/* STEP 1: CLIENT DETAILS */}
            {checkoutStep === "form" && (
              <div className="space-y-3 text-xs">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-100 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Mobile Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-100 focus:outline-none"
                />
                <textarea
                  placeholder="Full Delivery Address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-100 focus:outline-none"
                />

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setPaymentType("COD")}
                    className={`p-2 rounded-xl font-bold border text-center ${paymentType === "COD" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-slate-950 border-slate-800 text-slate-400"}`}
                  >
                    💵 Cash on Delivery
                  </button>
                  <button
                    onClick={() => setPaymentType("Online")}
                    className={`p-2 rounded-xl font-bold border text-center ${paymentType === "Online" ? "bg-purple-500/20 border-purple-500 text-purple-400" : "bg-slate-950 border-slate-800 text-slate-400"}`}
                  >
                    💳 Online Payment
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (paymentType === "COD") {
                      handleCreateOrder("COD");
                    } else {
                      setCheckoutStep("payment");
                    }
                  }}
                  className="w-full bg-purple-600 text-white font-bold py-2.5 rounded-xl mt-2"
                >
                  Proceed to Order (₹{selectedProduct.price}) →
                </button>
              </div>
            )}

            {/* STEP 2: DYNAMIC PAYMENT ROUTING */}
            {checkoutStep === "payment" && (
              <div className="text-center space-y-3 py-2">
                {selectedProduct.store === "Meesho" ? (
                  <>
                    <h4 className="font-bold text-xs text-slate-200">Scan Meesho UPI QR Code</h4>
                    <p className="text-[11px] text-slate-400">Scan with GPay / PhonePe / Paytm to complete payment.</p>
                    <img
                      src={getMeeshoQR(selectedProduct.upiId || "meesho@upi", selectedProduct.price)}
                      alt="Meesho UPI QR"
                      className="w-44 h-44 mx-auto rounded-xl border-2 border-purple-500 p-1 bg-white"
                    />
                    <button
                      onClick={() => handleCreateOrder("Meesho QR")}
                      className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs"
                    >
                      I Have Completed Payment ✅
                    </button>
                  </>
                ) : (
                  <>
                    <h4 className="font-bold text-xs text-slate-200">Tira Affiliate Gateway Redirect</h4>
                    <p className="text-[11px] text-slate-400">Complete checkout directly on Tira's portal.</p>
                    <a
                      href={selectedProduct.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleCreateOrder("Tira Link")}
                      className="block w-full bg-purple-600 text-white font-bold py-2.5 rounded-xl text-xs"
                    >
                      Open Tira Checkout →
                    </a>
                  </>
                )}
              </div>
            )}

            {/* STEP 3: ORDER CONFIRMED */}
            {checkoutStep === "success" && (
              <div className="text-center space-y-3 py-4">
                <div className="text-3xl">🎉</div>
                <h4 className="font-bold text-emerald-400 text-sm">Order Placed Successfully!</h4>
                <p className="text-xs text-slate-400">Order logged in Client Account & Sales Management dashboard.</p>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="bg-slate-800 text-slate-200 px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Close Modal
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

