import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Search, User, Phone } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Home className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold text-foreground">
              Elite<span className="text-accent">Properties</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Properties
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Buy
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Rent
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Agents
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button variant="default" size="sm">
              List Property
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border mt-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Properties
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Buy
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Rent
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Agents
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button variant="default" size="sm">
                  List Property
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;