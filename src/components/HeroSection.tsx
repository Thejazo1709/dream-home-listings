import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Home, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-property.jpg";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    if (propertyType) params.set("type", propertyType);
    navigate(`/properties?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury villa exterior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 mb-6 animate-fade-up">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse-soft" />
            <span className="text-sm font-medium text-primary-foreground/90">Trusted by 10,000+ Families</span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Find Your
            <span className="block text-accent">Dream Home</span>
            Today
          </h1>

          {/* Description */}
          <p className="text-lg lg:text-xl text-primary-foreground/80 mb-8 max-w-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Discover premium residential properties from cozy 1BHKs to spacious 4BHKs. 
            Your perfect home awaits with expert guidance every step of the way.
          </p>

          {/* Search Bar */}
          <div className="bg-card/95 backdrop-blur-md rounded-2xl p-2 shadow-elevated mb-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-background">
                <MapPin className="w-5 h-5 text-primary" />
                <input
                  type="text"
                  placeholder="Enter city, locality or project"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background sm:w-48">
                <Home className="w-5 h-5 text-primary" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground appearance-none cursor-pointer"
                >
                  <option value="">Property Type</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                </select>
              </div>
              <Button variant="hero" size="lg" className="gap-2 btn-shine" onClick={handleSearch}>
                <Search className="w-5 h-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 lg:gap-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-primary-foreground">500+</p>
              <p className="text-primary-foreground/70 text-sm">Properties Listed</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-primary-foreground">1000+</p>
              <p className="text-primary-foreground/70 text-sm">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-primary-foreground">50+</p>
              <p className="text-primary-foreground/70 text-sm">Cities Covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <a href="#properties" className="flex flex-col items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
          <span className="text-sm font-medium">Explore Properties</span>
          <ArrowRight className="w-5 h-5 rotate-90" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
