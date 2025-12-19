import { Button } from "@/components/ui/button";
import { Phone, Building2, Menu, X } from "lucide-react";
import { useState } from "react";
import tbLogo from "@/assets/tb-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img src={tbLogo} alt="TB Real Estate Logo" className="h-12 w-auto" />
            <div>
              <h1 className="font-heading text-xl font-bold text-foreground">TB Real Estate</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Premium Real Estate</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#properties" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Properties
            </a>
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              About Us
            </a>
            <a href="#services" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Services
            </a>
            <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </Button>
            <Button variant="hero" size="default">
              <Building2 className="w-4 h-4" />
              List Property
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              <a href="#properties" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Properties
              </a>
              <a href="#about" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                About Us
              </a>
              <a href="#services" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Services
              </a>
              <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Contact
              </a>
              <Button variant="hero" className="mt-2">
                <Building2 className="w-4 h-4" />
                List Property
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
