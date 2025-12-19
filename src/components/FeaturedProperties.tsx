import PropertyCard from "./PropertyCard";
import property1BHK from "@/assets/property-1bhk.jpg";
import property2BHK from "@/assets/property-2bhk.jpg";
import property3BHK from "@/assets/property-3bhk.jpg";
import property4BHK from "@/assets/property-4bhk.jpg";
import propertyDuplex from "@/assets/property-duplex.jpg";
import heroProperty from "@/assets/hero-property.jpg";

const properties = [
  {
    image: property1BHK,
    title: "Cozy Studio Apartment",
    location: "Koramangala, Bangalore",
    price: "₹45 Lac",
    pricePerSqft: "₹8,500",
    bedrooms: 1,
    bathrooms: 1,
    area: "530 sq.ft",
    type: "1 BHK",
    features: ["Modular Kitchen", "Power Backup", "Lift"],
    isNew: true,
    isFeatured: false,
  },
  {
    image: property2BHK,
    title: "Modern City View Apartment",
    location: "Whitefield, Bangalore",
    price: "₹85 Lac",
    pricePerSqft: "₹7,800",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,090 sq.ft",
    type: "2 BHK",
    features: ["City View", "Gym Access", "24/7 Security"],
    isNew: false,
    isFeatured: true,
  },
  {
    image: property3BHK,
    title: "Spacious Family Residence",
    location: "HSR Layout, Bangalore",
    price: "₹1.25 Cr",
    pricePerSqft: "₹7,200",
    bedrooms: 3,
    bathrooms: 3,
    area: "1,736 sq.ft",
    type: "3 BHK",
    features: ["Vastu Compliant", "Balcony", "Club House"],
    isNew: true,
    isFeatured: true,
  },
  {
    image: property4BHK,
    title: "Luxury Pool Villa",
    location: "Electronic City, Bangalore",
    price: "₹2.5 Cr",
    pricePerSqft: "₹6,500",
    bedrooms: 4,
    bathrooms: 4,
    area: "3,845 sq.ft",
    type: "4 BHK Villa",
    features: ["Private Pool", "Garden", "Covered Parking"],
    isNew: false,
    isFeatured: true,
  },
  {
    image: propertyDuplex,
    title: "Contemporary Duplex Home",
    location: "Sarjapur Road, Bangalore",
    price: "₹1.75 Cr",
    pricePerSqft: "₹6,800",
    bedrooms: 3,
    bathrooms: 3,
    area: "2,574 sq.ft",
    type: "Duplex",
    features: ["Terrace Garden", "Smart Home", "2 Parking"],
    isNew: true,
    isFeatured: false,
  },
  {
    image: heroProperty,
    title: "Premium Independent House",
    location: "Indiranagar, Bangalore",
    price: "₹3.8 Cr",
    pricePerSqft: "₹9,200",
    bedrooms: 5,
    bathrooms: 5,
    area: "4,130 sq.ft",
    type: "Independent House",
    features: ["Corner Plot", "Landscaped Garden", "Premium Location"],
    isNew: false,
    isFeatured: true,
  },
];

const FeaturedProperties = () => {
  return (
    <section id="properties" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Featured Listings
          </span>
          <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            Discover Our Premium Properties
          </h2>
          <p className="text-muted-foreground text-lg">
            Handpicked residential properties ranging from comfortable 1BHKs to luxurious villas, 
            perfect for families, professionals, and investors.
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {properties.map((property, index) => (
            <div
              key={index}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all duration-300">
            View All Properties
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
