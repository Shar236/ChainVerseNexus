
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WalletButton } from "@/components/WalletButton";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <div className="h-6 w-6 bg-primary rounded-full" />
            <span className="hidden font-bold sm:inline-block">
              ChainVerse Nexus
            </span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Dashboard
            </a>
            <a
              href="/nft-gallery"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              NFT Gallery
            </a>
            <a
              href="/chains"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Chain Explorer
            </a>
           
          </nav>
        </div>
        <Button variant="outline" size="icon" className="mr-2 md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex items-center md:ml-auto md:mr-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search NFTs, Chains..."
                className="pl-8 bg-muted/50 focus-visible:ring-purple-500"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
