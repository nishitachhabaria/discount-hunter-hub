import { useState, useEffect, useMemo } from "react";
import { Clock, ShieldAlert, ShieldCheck, ExternalLink, TrendingDown, Search, PackageOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Deal {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  currentPrice: number;
  platform: string;
  platformUrl: string;
  category: string;
  expiresAt: Date;
  isFake: boolean;
  discount: number;
}

const mockDeals: Deal[] = [
  { id: 1, name: "iPhone 15 Pro Max 256GB", image: "📱", originalPrice: 159900, currentPrice: 124900, platform: "Amazon", platformUrl: "https://www.amazon.in", category: "Electronics", expiresAt: new Date(Date.now() + 3600000 * 5), isFake: false, discount: 22 },
  { id: 2, name: "Nike Air Max 270 React", image: "👟", originalPrice: 12995, currentPrice: 7497, platform: "Flipkart", platformUrl: "https://www.flipkart.com", category: "Fashion", expiresAt: new Date(Date.now() + 3600000 * 2), isFake: false, discount: 42 },
  { id: 3, name: "Samsung 55\" OLED Smart TV", image: "📺", originalPrice: 149999, currentPrice: 89999, platform: "Amazon", platformUrl: "https://www.amazon.in", category: "Electronics", expiresAt: new Date(Date.now() + 3600000 * 8), isFake: false, discount: 40 },
  { id: 4, name: "boAt Rockerz 550 Headphones", image: "🎧", originalPrice: 5999, currentPrice: 1799, platform: "Flipkart", platformUrl: "https://www.flipkart.com", category: "Electronics", expiresAt: new Date(Date.now() + 3600000 * 1), isFake: true, discount: 70 },
  { id: 5, name: "Organic Green Tea 100 Bags", image: "🍵", originalPrice: 599, currentPrice: 349, platform: "BigBasket", platformUrl: "https://www.bigbasket.com", category: "Grocery", expiresAt: new Date(Date.now() + 3600000 * 12), isFake: false, discount: 42 },
  { id: 6, name: "Levi's 511 Slim Fit Jeans", image: "👖", originalPrice: 3999, currentPrice: 1599, platform: "Myntra", platformUrl: "https://www.myntra.com", category: "Fashion", expiresAt: new Date(Date.now() + 3600000 * 3), isFake: true, discount: 60 },
  { id: 7, name: "Sony WH-1000XM5 Wireless", image: "🎧", originalPrice: 29990, currentPrice: 21990, platform: "Amazon", platformUrl: "https://www.amazon.in", category: "Electronics", expiresAt: new Date(Date.now() + 3600000 * 6), isFake: false, discount: 27 },
  { id: 8, name: "Adidas Ultraboost Light", image: "👟", originalPrice: 16999, currentPrice: 10199, platform: "Flipkart", platformUrl: "https://www.flipkart.com", category: "Fashion", expiresAt: new Date(Date.now() + 3600000 * 4), isFake: false, discount: 40 },
  { id: 9, name: "Tata Sampann Turmeric 500g", image: "🫙", originalPrice: 199, currentPrice: 139, platform: "BigBasket", platformUrl: "https://www.bigbasket.com", category: "Grocery", expiresAt: new Date(Date.now() + 3600000 * 10), isFake: false, discount: 30 },
];

const categories = ["All", "Electronics", "Fashion", "Grocery"];

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const update = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("Expired"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  return timeLeft;
}

const DealCard = ({ deal }: { deal: Deal }) => {
  const countdown = useCountdown(deal.expiresAt);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
    >
      {deal.isFake && (
        <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-2 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">⚠️ Fake Discount Detected</span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl p-3 bg-muted rounded-xl">{deal.image}</div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary" className="text-xs font-medium">{deal.platform}</Badge>
            {!deal.isFake && (
              <div className="flex items-center gap-1 text-deal-verified">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Verified</span>
              </div>
            )}
          </div>
        </div>
        <h3 className="font-semibold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">{deal.name}</h3>
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-2xl font-bold text-card-foreground font-display">₹{deal.currentPrice.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground line-through">₹{deal.originalPrice.toLocaleString()}</span>
          <span className="text-xs font-bold text-deal-savings bg-deal-savings/10 px-2 py-0.5 rounded-full">{deal.discount}% off</span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="h-3.5 w-3.5 text-deal-timer" />
            <span className={`font-medium ${countdown === "Expired" ? "text-destructive" : "text-deal-timer"}`}>{countdown}</span>
          </div>
          <a
            href={deal.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View Deal <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

interface DealsGridProps {
  searchQuery: string;
}

const DealsGrid = ({ searchQuery }: DealsGridProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    let deals = mockDeals;
    if (activeCategory !== "All") {
      deals = deals.filter(d => d.category === activeCategory);
    }
    if (searchQuery) {
      deals = deals.filter(d =>
        d.name.toLowerCase().includes(searchQuery) ||
        d.platform.toLowerCase().includes(searchQuery) ||
        d.category.toLowerCase().includes(searchQuery)
      );
    }
    return deals;
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingDown className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Live Deals</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
            {searchQuery ? (
              <>Results for "<span className="text-primary">{searchQuery}</span>"</>
            ) : (
              "Today's Best Deals"
            )}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {searchQuery
              ? `Found ${filtered.length} deal${filtered.length !== 1 ? "s" : ""} matching your search.`
              : "Real-time prices across platforms. Fake discounts flagged automatically."
            }
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-cta text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map(deal => <DealCard key={deal.id} deal={deal} />)}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <PackageOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2 font-display">No deals found</h3>
            <p className="text-muted-foreground">Try a different search term or category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DealsGrid;
