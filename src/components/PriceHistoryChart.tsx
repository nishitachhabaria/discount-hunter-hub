import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingDown } from "lucide-react";

const priceData = [
  { date: "Jan", amazon: 149900, flipkart: 152000, croma: 155000 },
  { date: "Feb", amazon: 145000, flipkart: 148000, croma: 150000 },
  { date: "Mar", amazon: 139900, flipkart: 142000, croma: 148000 },
  { date: "Apr", amazon: 142000, flipkart: 140000, croma: 145000 },
  { date: "May", amazon: 135000, flipkart: 138000, croma: 142000 },
  { date: "Jun", amazon: 130000, flipkart: 132000, croma: 140000 },
  { date: "Jul", amazon: 128000, flipkart: 130000, croma: 138000 },
  { date: "Aug", amazon: 124900, flipkart: 128000, croma: 135000 },
  { date: "Sep", amazon: 126000, flipkart: 125000, croma: 132000 },
];

const PriceHistoryChart = () => {
  return (
    <section className="py-20 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingDown className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Price History</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">90-Day Price Trends</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Track price fluctuations and buy at the perfect moment.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border shadow-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-card-foreground font-display text-lg">iPhone 15 Pro Max</h3>
              <p className="text-sm text-muted-foreground">Price comparison across platforms</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /> Amazon</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent" /> Flipkart</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-muted-foreground" /> Croma</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={priceData}>
              <defs>
                <linearGradient id="colorAmazon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" />
              <XAxis dataKey="date" stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 15%, 88%)", borderRadius: "12px" }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
              />
              <Area type="monotone" dataKey="amazon" stroke="hsl(25, 95%, 53%)" strokeWidth={2.5} fill="url(#colorAmazon)" />
              <Line type="monotone" dataKey="flipkart" stroke="hsl(160, 60%, 45%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="croma" stroke="hsl(220, 10%, 45%)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default PriceHistoryChart;
