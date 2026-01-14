import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Building2,
  Home,
  MapPin,
  IndianRupee,
  Bed,
  Bath,
  Maximize,
  Car,
  Compass,
  Calendar,
  Check,
  Upload,
  ArrowRight
} from "lucide-react";

const propertyTypes = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "Villa", "Duplex", "Independent House", "Penthouse"];
const states = [
  "Karnataka", "Maharashtra", "Delhi", "Tamil Nadu", "Telangana",
  "Gujarat", "Rajasthan", "West Bengal", "Kerala", "Uttar Pradesh",
  "Haryana", "Punjab", "Madhya Pradesh", "Goa", "Andhra Pradesh"
];
const furnishingOptions = ["Unfurnished", "Semi-Furnished", "Fully Furnished"];
const parkingOptions = ["No Parking", "Covered Parking", "Open Parking", "Both"];
const facingOptions = ["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"];

const amenitiesList = [
  "Swimming Pool", "Gym", "Clubhouse", "24/7 Security", "Power Backup",
  "Lift", "Children's Play Area", "Garden", "Jogging Track", "Indoor Games",
  "Intercom", "CCTV Surveillance", "Fire Safety", "Rain Water Harvesting",
  "Covered Car Parking", "Visitor Parking", "Multipurpose Hall", "Library",
  "Senior Citizen Area", "Vastu Compliant"
];

const ListProperty = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    price: "",
    location: "",
    city: "",
    state: "",
    description: "",
    furnishing: "",
    parking: "",
    floorDetails: "",
    facing: "",
    amenities: [] as string[],
    vastuCompliant: false
  });

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please login to list a property.",
        variant: "destructive"
      });
      navigate("/auth");
    }
  }, [user, loading, navigate, toast]);

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to list a property.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("property_listings").insert({
        user_id: user.id,
        title: formData.title,
        type: formData.type,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseInt(formData.area),
        price: parseFloat(formData.price),
        location: formData.location,
        city: formData.city,
        state: formData.state,
        description: formData.description,
        furnishing: formData.furnishing,
        parking: formData.parking,
        floor_details: formData.floorDetails,
        amenities: formData.amenities,
        vastu_compliant: formData.vastuCompliant,
        status: "pending"
      });

      if (error) throw error;

      toast({
        title: "Property Listed Successfully! 🎉",
        description: "Your property has been submitted for review. Our team will verify and publish it within 24-48 hours.",
      });

      navigate("/properties");
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>List Your Property | TB Real Estate</title>
        <meta name="description" content="List your property for sale on TB Real Estate. Reach thousands of potential buyers across India." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Building2 className="w-4 h-4" />
                List Your Property
              </div>
              <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Sell or Rent Your Property
              </h1>
              <p className="text-muted-foreground text-lg">
                Fill in the details below to list your property. Our team will review and publish it within 24-48 hours.
              </p>
            </div>

            {/* Progress Steps */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex items-center justify-center gap-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {step > s ? <Check className="w-5 h-5" /> : s}
                    </div>
                    <span className={`hidden sm:block text-sm ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                      {s === 1 ? "Basic Info" : s === 2 ? "Details" : "Amenities"}
                    </span>
                    {s < 3 && <ArrowRight className="w-4 h-4 text-muted-foreground mx-2" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <Card className="max-w-4xl mx-auto border-border/50 shadow-soft">
              <CardHeader>
                <CardTitle>
                  {step === 1 ? "Basic Information" : step === 2 ? "Property Details" : "Amenities & Features"}
                </CardTitle>
                <CardDescription>
                  {step === 1 ? "Tell us about your property" : step === 2 ? "Provide more details about the property" : "Select the amenities available"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="title" className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-muted-foreground" />
                          Property Title *
                        </Label>
                        <Input
                          id="title"
                          placeholder="e.g., Luxurious 3 BHK in Prime Location"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            Property Type *
                          </Label>
                          <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {propertyTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="price" className="flex items-center gap-2">
                            <IndianRupee className="w-4 h-4 text-muted-foreground" />
                            Price (₹) *
                          </Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="e.g., 7500000"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bedrooms" className="flex items-center gap-2">
                            <Bed className="w-4 h-4 text-muted-foreground" />
                            Bedrooms *
                          </Label>
                          <Input
                            id="bedrooms"
                            type="number"
                            min="1"
                            placeholder="3"
                            value={formData.bedrooms}
                            onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bathrooms" className="flex items-center gap-2">
                            <Bath className="w-4 h-4 text-muted-foreground" />
                            Bathrooms *
                          </Label>
                          <Input
                            id="bathrooms"
                            type="number"
                            min="1"
                            placeholder="2"
                            value={formData.bathrooms}
                            onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="area" className="flex items-center gap-2">
                            <Maximize className="w-4 h-4 text-muted-foreground" />
                            Area (sq.ft) *
                          </Label>
                          <Input
                            id="area"
                            type="number"
                            placeholder="1500"
                            value={formData.area}
                            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            State *
                          </Label>
                          <Select value={formData.state} onValueChange={(v) => setFormData({ ...formData, state: v })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {states.map((state) => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            placeholder="e.g., Bangalore"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Locality/Area *</Label>
                          <Input
                            id="location"
                            placeholder="e.g., Whitefield"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-muted-foreground" />
                            Furnishing Status
                          </Label>
                          <Select value={formData.furnishing} onValueChange={(v) => setFormData({ ...formData, furnishing: v })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {furnishingOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Car className="w-4 h-4 text-muted-foreground" />
                            Parking
                          </Label>
                          <Select value={formData.parking} onValueChange={(v) => setFormData({ ...formData, parking: v })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select parking" />
                            </SelectTrigger>
                            <SelectContent>
                              {parkingOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Compass className="w-4 h-4 text-muted-foreground" />
                            Facing Direction
                          </Label>
                          <Select value={formData.facing} onValueChange={(v) => setFormData({ ...formData, facing: v })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select facing" />
                            </SelectTrigger>
                            <SelectContent>
                              {facingOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="floor" className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            Floor Details
                          </Label>
                          <Input
                            id="floor"
                            placeholder="e.g., 5th of 12 floors"
                            value={formData.floorDetails}
                            onChange={(e) => setFormData({ ...formData, floorDetails: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Property Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your property in detail. Include special features, nearby landmarks, and why it's a great investment..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={5}
                          required
                        />
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="space-y-4">
                        <Label>Select Available Amenities</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {amenitiesList.map((amenity) => (
                            <div
                              key={amenity}
                              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                                formData.amenities.includes(amenity)
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                              onClick={() => handleAmenityToggle(amenity)}
                            >
                              <Checkbox
                                checked={formData.amenities.includes(amenity)}
                                onCheckedChange={() => handleAmenityToggle(amenity)}
                              />
                              <span className="text-sm">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                        <Checkbox
                          id="vastu"
                          checked={formData.vastuCompliant}
                          onCheckedChange={(checked) => setFormData({ ...formData, vastuCompliant: checked as boolean })}
                        />
                        <Label htmlFor="vastu" className="cursor-pointer">
                          This property is Vastu Compliant
                        </Label>
                      </div>
                    </>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    {step > 1 ? (
                      <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                        Previous
                      </Button>
                    ) : (
                      <div />
                    )}

                    {step < 3 ? (
                      <Button type="button" variant="hero" onClick={() => setStep(step + 1)}>
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button type="submit" variant="hero" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Property"}
                        <Upload className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ListProperty;
