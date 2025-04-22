import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { OverviewStats } from "@/components/dashboard/overview-stats";
import { FeaturedNFTs } from "@/components/dashboard/featured-nfts";
import { ChainOverview } from "@/components/dashboard/chain-overview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <div className="container py-10 space-y-10">
          <OverviewStats />
          <ChainOverview />
          <FeaturedNFTs />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
