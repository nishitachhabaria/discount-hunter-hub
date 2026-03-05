import { useState } from "react";
import { Copy, Check, Tag, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Coupon {
  id: number;
  code: string;
  description: string;
  platform: string;
  category: string;
  discount: string;
  verified: boolean;
  usedCount: number;
}

const coupons: Coupon[] = [
  { id: 1, code: "SAVE500", description: "₹500 off on electronics above ₹5000", platform: "Amazon", category: "Electronics", discount: "₹500", verified: true, usedCount: 2340 },
  { id: 2, code: "FLAT40", description: "40% off on first order", platform: "Swiggy", category: "Food", discount: "40%", verified: true, usedCount: 5120 },
  { id: 3, code: "STYLE25", description: "25% off on clothing & accessories", platform: "Myntra", category: "Fashion", discount: "25%", verified: true, usedCount: 1890 },
  { id: 4, code: "FRESH100", description: "₹100 off on grocery orders above ₹999", platform: "BigBasket", category: "Grocery", discount: "₹100", verified: true, usedCount: 980 },
  { id: 5, code: "TRIP30", description: "30% off on domestic flights", platform: "MakeMyTrip", category: "Travel", discount: "30%", verified: false, usedCount: 450 },
  { id: 6, code: "GADGET15", description: "15% off on all gadgets", platform: "Flipkart", category: "Electronics", discount: "15%", verified: true, usedCount: 3200 },
];

const CouponCard = ({ coupon }: { coupon: Coupon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    toast.success(`Coupon ${coupon.code} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card rounded-2xl border border-border shadow-card p-5 flex flex-col justify-between hover:shadow-card-hover transition-all"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary">{coupon.platform}</Badge>
          {coupon.verified && (
            <div className="flex items-center gap-1 text-deal-verified">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Verified</span>
            </div>
          )}
        </div>
        <p className="text-sm text-card-foreground mb-2">{coupon.description}</p>
        <p className="text-xs text-muted-foreground">{coupon.usedCount.toLocaleString()} used today</p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 bg-muted rounded-lg px-4 py-2.5 border-2 border-dashed border-primary/30 text-center font-mono font-bold text-primary tracking-wider">
          {coupon.code}
        </div>
        <button
          onClick={handleCopy}
          className="p-2.5 rounded-lg bg-gradient-cta text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </motion.div>
  );
};

const CouponSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Tag className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Coupons</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">Verified Promo Codes</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Tested & verified coupons across food, fashion, electronics and travel.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map(c => <CouponCard key={c.id} coupon={c} />)}
        </div>
      </div>
    </section>
  );
};

export default CouponSection;
