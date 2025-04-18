
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden py-10 md:py-16">
      {/* Background hexagon pattern */}
      <div className="absolute inset-0 hex-grid-pattern opacity-10" />
      
      {/* Decorative glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-gradient block">ChainVerse Nexus</span>
            <span className="block mt-2">Explore the Omnichain Universe</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Discover the dynamic intersection of blockchain technologies and NFT ecosystems
            all in one powerful, intuitive interface.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
           <a href="./chains" > <Button size="lg" className="animate-float">
              Explore Networks
            </Button>
            </a>
            <a href="./nft-gallery" ><Button size="lg"  variant="outline" className="animate-float" style={{ animationDelay: "0.2s" }}>
              Browse NFT Gallery
            </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
