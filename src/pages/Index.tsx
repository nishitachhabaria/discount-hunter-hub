import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DealsGrid from "@/components/DealsGrid";
import PriceHistoryChart from "@/components/PriceHistoryChart";
import CouponSection from "@/components/CouponSection";
import CartOptimizer from "@/components/CartOptimizer";
import FestivalTracker from "@/components/FestivalTracker";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div id="deals"><DealsGrid /></div>
      <div id="price-history"><PriceHistoryChart /></div>
      <div id="coupons"><CouponSection /></div>
      <div id="cart-optimizer"><CartOptimizer /></div>
      <div id="sales"><FestivalTracker /></div>
      <Footer />
    </div>
  );
};

export default Index;
