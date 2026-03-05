import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const festivals = [
  { name: "Amazon Great Indian Festival", platform: "Amazon", dates: "Oct 8 - Oct 15", status: "upcoming", deals: "50-80% off" },
  { name: "Flipkart Big Billion Days", platform: "Flipkart", dates: "Oct 6 - Oct 13", status: "live", deals: "Up to 85% off" },
  { name: "Myntra End of Season Sale", platform: "Myntra", dates: "Nov 1 - Nov 7", status: "upcoming", deals: "40-70% off" },
  { name: "Croma Diwali Dhamaka", platform: "Croma", dates: "Oct 20 - Oct 30", status: "upcoming", deals: "30-60% off" },
];

const FestivalTracker = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CalendarDays className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Sale Tracker</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">Upcoming Sales & Festivals</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Never miss a major sale event. We track all platforms for you.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {festivals.map((fest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border shadow-card p-6 hover:shadow-card-hover transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-card-foreground font-display text-lg group-hover:text-primary transition-colors">{fest.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{fest.dates}</p>
                </div>
                <Badge
                  variant={fest.status === "live" ? "default" : "secondary"}
                  className={fest.status === "live" ? "bg-gradient-cta border-0 animate-pulse" : ""}
                >
                  {fest.status === "live" ? "🔴 LIVE" : "Upcoming"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">{fest.platform}</span>
                  <span className="mx-2 text-muted-foreground">·</span>
                  <span className="text-sm font-semibold text-deal-savings">{fest.deals}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FestivalTracker;
