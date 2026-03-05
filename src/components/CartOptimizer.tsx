import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, CheckCircle } from "lucide-react";

const cartItems = [
  { name: "iPhone 15 Pro Max", bestSite: "Amazon", bestPrice: 124900, otherPrice: 128000, savings: 3100 },
  { name: "Nike Air Max 270", bestSite: "Flipkart", bestPrice: 7497, otherPrice: 8999, savings: 1502 },
  { name: "Samsung 55\" TV", bestSite: "Croma", bestPrice: 87999, otherPrice: 89999, savings: 2000 },
];

const totalSavings = cartItems.reduce((sum, item) => sum + item.savings, 0);

const CartOptimizer = () => {
  return (
    <section className="py-20 px-6 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Smart Cart</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">Cart Optimizer</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">We split your cart across platforms to maximize savings.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
        >
          <div className="divide-y divide-border">
            {cartItems.map((item, i) => (
              <div key={i} className="px-6 py-5 flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-card-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    <span className="line-through">₹{item.otherPrice.toLocaleString()}</span>
                    <ArrowRight className="inline h-3 w-3 mx-2" />
                    <span className="font-semibold text-deal-savings">₹{item.bestPrice.toLocaleString()}</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5 text-sm text-deal-verified mb-1">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span className="font-medium">{item.bestSite}</span>
                  </div>
                  <span className="text-xs text-deal-savings font-bold">Save ₹{item.savings.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-5 bg-gradient-deal border-t border-border flex items-center justify-between">
            <span className="font-semibold text-foreground font-display">Total Optimized Savings</span>
            <span className="text-2xl font-bold text-deal-savings font-display">₹{totalSavings.toLocaleString()}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CartOptimizer;
