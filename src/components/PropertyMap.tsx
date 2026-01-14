import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Building2 } from "lucide-react";
import { properties, Property } from "@/data/properties";
import { Link } from "react-router-dom";

// Static map component using OpenStreetMap tiles (no API key required)
const PropertyMap = () => {
  const [selectedState, setSelectedState] = useState<string>("all");
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);

  // Group properties by state
  const propertyByState = properties.reduce((acc, prop) => {
    if (!acc[prop.state]) {
      acc[prop.state] = [];
    }
    acc[prop.state].push(prop);
    return acc;
  }, {} as Record<string, Property[]>);

  const states = Object.keys(propertyByState).sort();
  const displayedProperties = selectedState === "all" 
    ? properties 
    : propertyByState[selectedState] || [];

  // Mock coordinates for Indian states (for visual representation)
  const stateCoordinates: Record<string, { lat: number; lng: number }> = {
    "Karnataka": { lat: 15.3173, lng: 75.7139 },
    "Maharashtra": { lat: 19.7515, lng: 75.7139 },
    "Delhi": { lat: 28.7041, lng: 77.1025 },
    "Tamil Nadu": { lat: 11.1271, lng: 78.6569 },
    "Telangana": { lat: 18.1124, lng: 79.0193 },
    "Gujarat": { lat: 22.2587, lng: 71.1924 },
    "Rajasthan": { lat: 27.0238, lng: 74.2179 },
    "West Bengal": { lat: 22.9868, lng: 87.8550 },
    "Kerala": { lat: 10.8505, lng: 76.2711 },
    "Uttar Pradesh": { lat: 26.8467, lng: 80.9462 },
    "Haryana": { lat: 29.0588, lng: 76.0856 },
    "Punjab": { lat: 31.1471, lng: 75.3412 },
    "Madhya Pradesh": { lat: 22.9734, lng: 78.6569 },
    "Goa": { lat: 15.2993, lng: 74.1240 },
    "Andhra Pradesh": { lat: 15.9129, lng: 79.7400 }
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Property Locations
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Explore Properties Across India
          </h2>
          <p className="text-muted-foreground text-lg">
            Find your dream home in major cities across the country
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Visual */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 shadow-soft overflow-hidden">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 h-[500px] rounded-lg overflow-hidden">
                  {/* India Map Outline (SVG representation) */}
                  <svg viewBox="0 0 400 450" className="absolute inset-0 w-full h-full p-8">
                    {/* Simplified India outline */}
                    <path
                      d="M200 50 L280 80 L320 120 L340 180 L350 250 L340 320 L300 380 L250 420 L200 430 L150 420 L100 380 L60 320 L50 250 L60 180 L80 120 L120 80 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary/30"
                    />
                    
                    {/* Property markers */}
                    {states.map((state) => {
                      const coords = stateCoordinates[state];
                      if (!coords) return null;
                      
                      // Map lat/lng to SVG coordinates
                      const x = ((coords.lng - 68) / 30) * 300 + 50;
                      const y = ((35 - coords.lat) / 28) * 400 + 25;
                      const count = propertyByState[state].length;
                      
                      return (
                        <g
                          key={state}
                          className="cursor-pointer transition-transform hover:scale-110"
                          onMouseEnter={() => setHoveredProperty(propertyByState[state][0])}
                          onMouseLeave={() => setHoveredProperty(null)}
                          onClick={() => setSelectedState(state)}
                        >
                          <circle
                            cx={x}
                            cy={y}
                            r={Math.min(15, 8 + count * 2)}
                            className={`transition-colors ${
                              selectedState === state
                                ? "fill-primary"
                                : "fill-primary/60 hover:fill-primary"
                            }`}
                          />
                          <text
                            x={x}
                            y={y + 4}
                            textAnchor="middle"
                            className="fill-primary-foreground text-xs font-bold"
                          >
                            {count}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Hover tooltip */}
                  {hoveredProperty && (
                    <div className="absolute top-4 left-4 bg-card rounded-lg shadow-lg p-4 max-w-xs animate-fade-in">
                      <h4 className="font-semibold text-foreground">{hoveredProperty.state}</h4>
                      <p className="text-sm text-muted-foreground">
                        {propertyByState[hoveredProperty.state].length} properties available
                      </p>
                      <p className="text-sm text-primary mt-1">
                        Starting from ₹{Math.min(...propertyByState[hoveredProperty.state].map(p => parseInt(p.price.replace(/[^0-9]/g, ''))))}
                      </p>
                    </div>
                  )}

                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Click markers to filter</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Property List */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 shadow-soft h-[500px] overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    {selectedState === "all" ? "All Properties" : selectedState}
                  </CardTitle>
                  {selectedState !== "all" && (
                    <Button variant="ghost" size="sm" onClick={() => setSelectedState("all")}>
                      Show All
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {displayedProperties.length} properties found
                </p>
              </CardHeader>
              <CardContent className="overflow-y-auto h-[calc(100%-80px)] space-y-3 pr-2">
                {displayedProperties.slice(0, 10).map((property) => (
                  <Link
                    key={property.id}
                    to={`/property/${property.id}`}
                    className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex gap-3">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm line-clamp-1">
                          {property.title}
                        </h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {property.city}, {property.state}
                        </p>
                        <p className="text-sm font-semibold text-primary mt-1">
                          {property.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}

                {displayedProperties.length > 10 && (
                  <Link
                    to={`/properties${selectedState !== "all" ? `?state=${selectedState}` : ""}`}
                    className="block text-center py-2 text-primary hover:underline text-sm"
                  >
                    View all {displayedProperties.length} properties →
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* State Filter Chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedState === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedState("all")}
          >
            All States ({properties.length})
          </Button>
          {states.map((state) => (
            <Button
              key={state}
              variant={selectedState === state ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedState(state)}
            >
              {state} ({propertyByState[state].length})
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyMap;
