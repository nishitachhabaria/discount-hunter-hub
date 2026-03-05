import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DealsGrid from "@/components/DealsGrid";
import PriceHistoryChart from "@/components/PriceHistoryChart";
import CouponSection from "@/components/CouponSection";
import CartOptimizer from "@/components/CartOptimizer";
import FestivalTracker from "@/components/FestivalTracker";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const handleSearch = useCallback((query: string) => {
    setActiveSearch(query.trim().toLowerCase());
    if (query.trim()) {
      document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <div id="deals">
        <DealsGrid searchQuery={activeSearch} />
      </div>
      <div id="price-history">
        <PriceHistoryChart />
      </div>
      <div id="coupons">
        <CouponSection />
      </div>
      <div id="cart-optimizer">
        <CartOptimizer />
      </div>
      <div id="sales">
        <FestivalTracker />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
