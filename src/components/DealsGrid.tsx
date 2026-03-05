import { useState, useEffect } from "react";
import { Clock, ShieldAlert, ShieldCheck, ExternalLink, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Deal {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  currentPrice: number;
  platform: string;
  category: string;
  expiresAt: Date;
  isFake: boolean;
  discount: number;
}

const mockDeals: Deal[] = [
  { id: 1, name: "iPhone 15 Pro Max 256GB", image: "📱", originalPrice: 159900, currentPrice: 124900, platform: "Amazon", category: "Electronics", expiresAt: new Date(Date.now() + 3600000 * 5), isFake: false, discount: 22 },
  { id: 2, name: "Nike Air Max 270 React", image: "👟", originalPrice: 12995, currentPrice: 7497, platform: "Flipkart", category: "Fashion", expiresAt: new Date(Date.now() + 3600000 * 2), isFake: false, discount: 42 },
  { id: 3, name: "Samsung 55\" OLED Smart TV", image: "📺", originalPrice: 149999, currentPrice: 89999, platform: "Amazon", category: "Electronics", expiresAt: new Date(Date.now() + 3600000 * 8), isFake: false, discount: 40 },
  { id: 4, name: "boAt Rockerz 550 Headphones", image: "🎧", originalPrice: 5999, currentPrice: 1799, platform: "Flipkart", category: "Electronics", expiresAt: new Date(Date.now() + 3600000 * 1), isFake: true, discount: 70 },
  { id: 5, name: "Organic Green Tea 100 Bags", image: "🍵", originalPrice: 599, currentPrice: 349, platform: "BigBasket", category: "Grocery", expiresAt: new Date(Date.now() + 3600000 * 12), isFake: false, discount: 42 },
  { id: 6, name: "Levi's 511 Slim Fit Jeans", image: "👖", originalPrice: 3999, currentPrice: 1599, platform: "Myntra", category: "Fashion", expiresAt: new Date(Date.now() + 3600000 * 3), isFake: true, discount: 60 },
];

const categories = ["All", "Electronics", "Fashion", "Grocery"];

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("Expired"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  return timeLeft;
}

const DealCard = ({ deal }: { deal: Deal }) => {
  const countdown = useCountdown(deal.expiresAt);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
    >
      {deal.isFake && (
        <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-2 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">⚠️ Fake Discount Detected</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{deal.image}</div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary" className="text-xs">{deal.platform}</Badge>
            {!deal.isFake && (
              <div className="flex items-center gap-1 text-deal-verified">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Verified</span>
              </div>
            )}
          </div>
        </div>
        <h3 className="font-semibold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">{deal.name}</h3>
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-2xl font-bold text-card-foreground font-display">₹{deal.currentPrice.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground line-through">₹{deal.originalPrice.toLocaleString()}</span>
          <span className="text-sm font-bold text-deal-savings">{deal.discount}% off</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="h-3.5 w-3.5 text-deal-timer" />
            <span className={`font-medium ${countdown === "Expired" ? "text-destructive" : "text-deal-timer"}`}>{countdown}</span>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            View Deal <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const DealsGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? mockDeals : mockDeals.filter(d => d.category === activeCategory);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingDown className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Live Deals</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">Today's Best Deals</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Real-time prices across platforms. Fake discounts flagged automatically.</p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-cta text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(deal => <DealCard key={deal.id} deal={deal} />)}
        </div>
      </div>
    </section>
  );
};

export default DealsGrid;
