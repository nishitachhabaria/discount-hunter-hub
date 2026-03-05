import { useState } from "react";
import { Search, Mic, MicOff, TrendingDown, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
      setSearchQuery(event.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const stats = [
    { icon: TrendingDown, label: "Avg. Savings", value: "32%" },
    { icon: Shield, label: "Fake Deals Caught", value: "1.2K+" },
    { icon: Clock, label: "Time Saved", value: "28 min" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-secondary/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 border border-primary/30">
            🔥 Smart Price Comparison
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-secondary-foreground mb-6 leading-tight font-display">
            Stop Overpaying.
            <br />
            <span className="text-gradient">Find Real Deals.</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary-foreground/70 mb-10 max-w-2xl mx-auto">
            Compare prices across platforms, detect fake discounts, and save up to 40% — all in under 2 minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-2xl mx-auto mb-12"
        >
          <div className="flex items-center bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
            <Search className="ml-5 h-5 w-5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for any product... e.g. iPhone 15, Nike shoes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-5 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
            />
            <button
              onClick={handleVoiceSearch}
              className={`p-3 mr-2 rounded-xl transition-colors ${
                isListening
                  ? "bg-destructive text-destructive-foreground animate-pulse"
                  : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            <button className="bg-gradient-cta text-primary-foreground px-6 py-5 font-semibold hover:opacity-90 transition-opacity">
              Search
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 text-secondary-foreground/80">
              <div className="p-2 rounded-lg bg-primary/20">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold font-display">{stat.value}</div>
                <div className="text-sm text-secondary-foreground/50">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
