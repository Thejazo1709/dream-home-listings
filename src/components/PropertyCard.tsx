import { MapPin, Bed, Bath, Maximize, Heart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  pricePerSqft?: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: string;
  features: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

const PropertyCard = ({
  image,
  title,
  location,
  price,
  pricePerSqft,
  bedrooms,
  bathrooms,
  area,
  type,
  features,
  isNew,
  isFeatured,
}: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-soft card-hover border border-border/50">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isNew && (
            <Badge className="bg-accent text-accent-foreground font-semibold shadow-soft">
              New
            </Badge>
          )}
          {isFeatured && (
            <Badge className="bg-primary text-primary-foreground font-semibold shadow-soft">
              Featured
            </Badge>
          )}
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm text-foreground font-medium">
            {type}
          </Badge>
        </div>

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-soft hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"
            }`}
          />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-soft">
          <p className="font-heading text-xl font-bold text-foreground">{price}</p>
          {pricePerSqft && (
            <p className="text-xs text-muted-foreground">{pricePerSqft}/sq.ft</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 pb-4 border-b border-border/50">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{area}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mt-4 mb-4">
          {features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md"
            >
              <CheckCircle className="w-3 h-3 text-primary" />
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex gap-2">
          <Button variant="heroOutline" className="flex-1">
            View Details
          </Button>
          <Button variant="hero" className="flex-1">
            Schedule Visit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
