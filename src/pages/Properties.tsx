import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { getStates } from "@/data/properties";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "All");
  const [selectedState, setSelectedState] = useState("All");

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    const type = searchParams.get("type");
    setSelectedType(type || "All");
  }, [searchParams]);

  const propertyTypes = ["All", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "4 BHK Villa", "5 BHK Villa", "Duplex"];
  const states = ["All", ...getStates()];

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || property.type.includes(selectedType.replace(" Villa", ""));
    const matchesState = selectedState === "All" || property.state === selectedState;
    return matchesSearch && matchesType && matchesState;
  });

  return (
    <>
      <Helmet>
        <title>Properties for Sale | TB Real Estate - Premium Apartments & Villas</title>
        <meta name="description" content="Browse our collection of premium properties including 1BHK to 4BHK apartments, villas, duplexes, and independent houses in Bangalore." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Find Your Perfect Home
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Explore our curated collection of premium properties across Bangalore's prime locations.
                </p>

                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by location or property name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-6 text-lg rounded-xl border-border/50 shadow-soft"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="py-8 border-b border-border/50">
            <div className="container mx-auto px-4 lg:px-8 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="font-medium">Type:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {propertyTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                      className="rounded-full"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">State:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {states.map((state) => (
                    <Button
                      key={state}
                      variant={selectedState === state ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedState(state)}
                      className="rounded-full"
                    >
                      {state}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Properties Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredProperties.length}</span> properties
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProperties.map((property, index) => (
                  <Link to={`/property/${property.id}`} key={property.id}>
                    <div
                      className="animate-fade-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <PropertyCard {...property} />
                    </div>
                  </Link>
                ))}
              </div>

              {filteredProperties.length === 0 && (
                <div className="text-center py-16">
                  <MapPin className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No properties found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Properties;
