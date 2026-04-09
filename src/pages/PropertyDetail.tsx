import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPropertyById } from "@/data/properties";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Calendar,
  Car,
  Compass,
  Building2,
  Home,
  Check,
  Phone,
  Mail,
  Clock
} from "lucide-react";

// Import interior images
import interiorLiving from "@/assets/interior-living.jpg";
import interiorBedroom from "@/assets/interior-bedroom.jpg";
import interiorKitchen from "@/assets/interior-kitchen.jpg";
import interiorBathroom from "@/assets/interior-bathroom.jpg";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const property = getPropertyById(id || "");
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
            <p className="text-muted-foreground mb-8">The property you're looking for doesn't exist.</p>
            <Link to="/properties">
              <Button variant="hero">View All Properties</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const galleryImages = [
    { src: property.image, label: "Exterior" },
    { src: interiorLiving, label: "Living Room" },
    { src: interiorBedroom, label: "Bedroom" },
    { src: interiorKitchen, label: "Kitchen" },
    { src: interiorBathroom, label: "Bathroom" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Sent!",
      description: "Our team will contact you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Property link has been copied to clipboard.",
    });
  };

  return (
    <>
      <Helmet>
        <title>{property.title} | TB Real Estate</title>
        <meta name="description" content={property.description.substring(0, 160)} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          {/* Back Button */}
          <div className="container mx-auto px-4 lg:px-8 py-4">
            <Link to="/properties" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Properties
            </Link>
          </div>

          {/* Image Gallery */}
          <section className="container mx-auto px-4 lg:px-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                  <img
                    src={galleryImages[selectedImage].src}
                    alt={galleryImages[selectedImage].label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-3 rounded-full backdrop-blur-md transition-all ${
                        isLiked ? "bg-red-500 text-white" : "bg-white/90 text-foreground hover:bg-white"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 rounded-full bg-white/90 backdrop-blur-md text-foreground hover:bg-white transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {property.isNew && (
                      <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                        New
                      </span>
                    )}
                    {property.isFeatured && (
                      <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                        Featured
                      </span>
                    )}
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      {property.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 lg:grid-cols-1 gap-2 lg:gap-4">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] lg:aspect-[16/9] transition-all ${
                      selectedImage === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 text-[10px] lg:text-xs font-medium text-white bg-black/50 px-2 py-0.5 rounded">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Property Details */}
          <section className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Title & Price */}
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>
                  <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {property.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <span className="text-3xl font-bold text-primary">{property.price}</span>
                      <span className="text-muted-foreground ml-2">({property.pricePerSqft}/sq.ft)</span>
                    </div>
                  </div>
                </div>

                {/* Quick Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                    <Bed className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="font-semibold">{property.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                    <Bath className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <p className="font-semibold">{property.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                    <Maximize className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Area</p>
                      <p className="font-semibold">{property.area}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                    <Car className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Parking</p>
                      <p className="font-semibold">{property.parking}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </div>

                {/* Property Details Grid */}
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Property Details</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <Home className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Property Type</p>
                        <p className="font-medium">{property.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Floor</p>
                        <p className="font-medium">{property.floor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Compass className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Facing</p>
                        <p className="font-medium">{property.facing}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Property Age</p>
                        <p className="font-medium">{property.age}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Home className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Furnishing</p>
                        <p className="font-medium">{property.furnishing}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Possession</p>
                        <p className="font-medium">{property.possession}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-muted-foreground">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar - Contact Form */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-soft">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    Interested in this property?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Fill in your details and our expert will contact you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                    <Textarea
                      placeholder="I'm interested in this property..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                    />
                    <Button type="submit" variant="hero" className="w-full">
                      Schedule a Visit
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">Or contact us directly:</p>
                    <div className="space-y-3">
                       <a href="tel:+918259855188" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                         <Phone className="w-4 h-4" />
                         <span>+91 82598 55188</span>
                       </a>
                       <a href="mailto:25mcaa54@kristujayanti.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                         <Mail className="w-4 h-4" />
                         <span>25mcaa54@kristujayanti.com</span>
                       </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PropertyDetail;
