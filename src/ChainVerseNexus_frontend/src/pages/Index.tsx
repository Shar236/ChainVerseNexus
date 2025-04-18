import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { OverviewStats } from "@/components/dashboard/overview-stats";
import { FeaturedNFTs } from "@/components/dashboard/featured-nfts";
import { ChainOverview } from "@/components/dashboard/chain-overview";

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
      <footer className="bg-gradient-to-r from-[#1c1e2b] via-[#232640] to-[#1f2235] text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           
            <div>
              <h2 className="text-3xl font-bold mb-4 ml-6 text-purple-400">ChainVerse Nexus</h2>
              <p className="text-sm ml-6 text-gray-300">
              Explore the future of blockchain with our seamless NFT and blockchain platform.
              </p>
            </div>

           
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Dashboard</a></li>
                <li><a href="./nft-gallery" className="hover:text-white transition">NFT Gallery</a></li>
                <li><a href="./chains" className="hover:text-white transition">Chain Explorer</a></li>
                <li><a href="#" className="hover:text-white transition">Market Insights</a></li>
              </ul>
            </div>

            
            <div>
              <h3 className="text-lg font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

           
            <div>
              <h3 className="text-lg font-semibold mb-3">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-white">
                  <i className="fab fa-discord"></i>
                </a>
                <a href="https://github.com/Piyush01-672" className="hover:text-white">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="hover:text-white">
                  <i className="fab fa-telegram-plane"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            © 2025 ChainVerse Nexus. Built with 💜 for the blockchain future.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
