import PropertyCard from "./PropertyCard";
import { properties } from "@/data/properties";

const FeaturedProperties = () => {
  const featured = properties.slice(0, 6);

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
          {featured.map((property, index) => (
            <div
              key={property.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <a href="/properties" className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all duration-300">
            View All Properties
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
