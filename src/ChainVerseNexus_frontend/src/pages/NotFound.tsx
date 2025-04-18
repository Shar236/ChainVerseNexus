
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container max-w-md mx-auto text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <h1 className="relative text-9xl font-extrabold text-primary">404</h1>
          </div>
          <h2 className="text-2xl font-bold">Chain Not Found</h2>
          <p className="text-muted-foreground">
            The blockchain destination you're searching for doesn't exist in our multiverse.
          </p>
          <Button className="mt-4 gap-2" asChild>
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
