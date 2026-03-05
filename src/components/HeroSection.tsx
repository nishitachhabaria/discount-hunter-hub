import { useState } from "react";
import { Search, Mic, MicOff, TrendingDown, Shield, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSearch: (q: string) => void;
}

const HeroSection = ({ searchQuery, setSearchQuery, onSearch }: HeroSectionProps) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Voice search not supported in this browser.");
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      onSearch(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSearch(searchQuery);
  };

  const popularSearches = ["iPhone 15", "Nike Shoes", "Samsung TV", "Headphones", "Jeans"];

  const stats = [
    { icon: TrendingDown, label: "Avg. Savings", value: "32%" },
    { icon: Shield, label: "Fake Deals Caught", value: "1.2K+" },
    { icon: Clock, label: "Time Saved", value: "28 min" },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-secondary/85 backdrop-blur-sm" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <motion.span
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/15 text-primary text-sm font-medium mb-8 border border-primary/25"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Price Comparison
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-bold text-secondary-foreground mb-6 leading-[1.1] font-display tracking-tight">
            Stop Overpaying.
            <br />
            <span className="text-gradient">Find Real Deals.</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Compare prices across platforms, detect fake discounts, and save up to 40% — all in under 2 minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-2xl mx-auto mb-6"
        >
          <div className="flex items-center bg-card rounded-2xl shadow-lg overflow-hidden border border-border/80 hover:border-primary/30 transition-colors">
            <Search className="ml-5 h-5 w-5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for any product... e.g. iPhone 15, Nike shoes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-5 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base font-body"
            />
            <button
              onClick={handleVoiceSearch}
              className={`p-3 mr-2 rounded-xl transition-all ${
                isListening
                  ? "bg-destructive text-destructive-foreground animate-pulse scale-110"
                  : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
              title="Voice search"
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            <button
              onClick={() => onSearch(searchQuery)}
              className="bg-gradient-cta text-primary-foreground px-7 py-5 font-semibold hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          <span className="text-sm text-secondary-foreground/40 mr-1">Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => { setSearchQuery(term); onSearch(term); }}
              className="px-3 py-1 text-sm rounded-full bg-secondary-foreground/10 text-secondary-foreground/60 hover:bg-primary/20 hover:text-primary transition-colors border border-secondary-foreground/10"
            >
              {term}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3 text-secondary-foreground/80"
            >
              <div className="p-2.5 rounded-xl bg-primary/15 border border-primary/20">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold font-display">{stat.value}</div>
                <div className="text-xs text-secondary-foreground/40 uppercase tracking-wider">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
