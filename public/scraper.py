import json
import os

def run_scraper():
    # Scraped dataset with full specs, price histories, and payment triggers
    products = [
        {
            "id": "scraped-101",
            "title": "Embroidered Anarkali Kurta Set",
            "store": "Meesho",
            "storeBadge": "bg-pink-500/20 text-pink-300 border-pink-500/30",
            "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop",
            "price": 499,
            "originalPrice": 799,
            "lowestPrice": 449,
            "category": "Ethnic Wear",
            "description": "Heavy zari embroidered rayon Anarkali kurta set with matching dupatta.",
            "specs": [
                "Fabric: Pure Rayon",
                "Sleeve: 3/4 Sleeves",
                "Work: Zari Embroidery",
                "Included: Kurta & Dupatta"
            ],
            "rating": "4.3 ★ (1,240 Reviews)",
            "inStock": True,
            "upiId": "meesho.pay@upi",
            "priceHistory": [650, 580, 520, 499]
        },
        {
            "id": "scraped-102",
            "title": "Matte Liquid Lipstick Set (Pack of 3)",
            "store": "Tira",
            "storeBadge": "bg-purple-500/20 text-purple-300 border-purple-500/30",
            "image": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop",
            "price": 299,
            "originalPrice": 599,
            "lowestPrice": 279,
            "category": "Beauty",
            "description": "12-hour long-stay waterproof matte liquid lipsticks enriched with Vitamin E.",
            "specs": [
                "Finish: Ultra Matte",
                "Volume: 3 x 5ml",
                "Features: Waterproof & Smudgeproof",
                "Cruelty Free: Yes"
            ],
            "rating": "4.7 ★ (850 Reviews)",
            "inStock": True,
            "affiliateUrl": "https://tira.earnkaro.com/deal123",
            "priceHistory": [399, 350, 320, 299]
        }
    ]

    # Save to Next.js public directory
    os.makedirs("public", exist_ok=True)
    with open("public/products.json", "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2)

    print("✅ Scraper finished: Updated public/products.json")

if __name__ == "__main__":
    run_scraper()
