import { useState } from "react";
import { properties, Property } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeftRight, 
  X, 
  Bed, 
  Bath, 
  Maximize, 
  Car, 
  Compass, 
  Building2,
  Calendar,
  Home,
  Check,
  Minus
} from "lucide-react";
import { Link } from "react-router-dom";

const PropertyComparison = () => {
  const [selectedProperties, setSelectedProperties] = useState<(Property | null)[]>([null, null, null]);

  const handleSelectProperty = (index: number, propertyId: string) => {
    const property = properties.find(p => p.id === propertyId) || null;
    const newSelected = [...selectedProperties];
    newSelected[index] = property;
    setSelectedProperties(newSelected);
  };

  const handleRemoveProperty = (index: number) => {
    const newSelected = [...selectedProperties];
    newSelected[index] = null;
    setSelectedProperties(newSelected);
  };

  const getAvailableProperties = (currentIndex: number) => {
    const selectedIds = selectedProperties
      .filter((_, i) => i !== currentIndex)
      .filter(p => p !== null)
      .map(p => p!.id);
    return properties.filter(p => !selectedIds.includes(p.id));
  };

  const hasSelectedProperties = selectedProperties.some(p => p !== null);

  const ComparisonRow = ({ 
    label, 
    icon: Icon, 
    getValue 
  }: { 
    label: string; 
    icon: React.ElementType; 
    getValue: (p: Property) => string | number;
  }) => (
    <tr className="border-b border-border/50">
      <td className="py-4 px-4 font-medium flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" />
        {label}
      </td>
      {selectedProperties.map((property, index) => (
        <td key={index} className="py-4 px-4 text-center">
          {property ? getValue(property) : "-"}
        </td>
      ))}
    </tr>
  );

  const AmenityRow = ({ amenity }: { amenity: string }) => (
    <tr className="border-b border-border/50">
      <td className="py-3 px-4 text-sm">{amenity}</td>
      {selectedProperties.map((property, index) => (
        <td key={index} className="py-3 px-4 text-center">
          {property?.amenities.includes(amenity) ? (
            <Check className="w-5 h-5 text-green-500 mx-auto" />
          ) : (
            <Minus className="w-5 h-5 text-muted-foreground/30 mx-auto" />
          )}
        </td>
      ))}
    </tr>
  );

  const allAmenities = Array.from(
    new Set(selectedProperties.filter(p => p !== null).flatMap(p => p!.amenities))
  ).sort();

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <ArrowLeftRight className="w-4 h-4" />
            Property Comparison
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Compare Properties Side by Side
          </h2>
          <p className="text-muted-foreground text-lg">
            Select up to 3 properties to compare their features and make an informed decision
          </p>
        </div>

        {/* Property Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {selectedProperties.map((property, index) => (
            <Card key={index} className="border-border/50 shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Property {index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {property ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemoveProperty(index)}
                        className="absolute top-2 right-2 p-1 bg-background/90 rounded-full hover:bg-background transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground line-clamp-1">
                        {property.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{property.location}</p>
                      <p className="text-primary font-bold mt-1">{property.price}</p>
                    </div>
                    <Link to={`/property/${property.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Select onValueChange={(value) => handleSelectProperty(index, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a property" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableProperties(index).map((prop) => (
                        <SelectItem key={prop.id} value={prop.id}>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{prop.title}</span>
                            <span className="text-muted-foreground">- {prop.city}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        {hasSelectedProperties && (
          <Card className="border-border/50 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left py-4 px-4 font-semibold">Feature</th>
                    {selectedProperties.map((property, index) => (
                      <th key={index} className="py-4 px-4 text-center font-semibold min-w-[200px]">
                        {property ? property.title : `Property ${index + 1}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <ComparisonRow label="Price" icon={Home} getValue={(p) => p.price} />
                  <ComparisonRow label="Price/sq.ft" icon={Home} getValue={(p) => p.pricePerSqft} />
                  <ComparisonRow label="Area" icon={Maximize} getValue={(p) => p.area} />
                  <ComparisonRow label="Bedrooms" icon={Bed} getValue={(p) => p.bedrooms} />
                  <ComparisonRow label="Bathrooms" icon={Bath} getValue={(p) => p.bathrooms} />
                  <ComparisonRow label="Type" icon={Building2} getValue={(p) => p.type} />
                  <ComparisonRow label="Floor" icon={Building2} getValue={(p) => p.floor} />
                  <ComparisonRow label="Facing" icon={Compass} getValue={(p) => p.facing} />
                  <ComparisonRow label="Parking" icon={Car} getValue={(p) => p.parking} />
                  <ComparisonRow label="Furnishing" icon={Home} getValue={(p) => p.furnishing} />
                  <ComparisonRow label="Age" icon={Calendar} getValue={(p) => p.age} />
                  <ComparisonRow label="Possession" icon={Calendar} getValue={(p) => p.possession} />
                </tbody>
              </table>

              {/* Amenities Comparison */}
              {allAmenities.length > 0 && (
                <>
                  <div className="bg-muted/50 py-3 px-4">
                    <h4 className="font-semibold">Amenities</h4>
                  </div>
                  <table className="w-full">
                    <tbody>
                      {allAmenities.map((amenity) => (
                        <AmenityRow key={amenity} amenity={amenity} />
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </Card>
        )}

        {!hasSelectedProperties && (
          <div className="text-center py-12 text-muted-foreground">
            <ArrowLeftRight className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Select properties above to start comparing</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyComparison;
