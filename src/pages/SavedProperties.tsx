import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getPropertyById } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart, Trash2, MapPin, Bed, Bath, Maximize, ArrowRight } from "lucide-react";

const SavedProperties = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchSavedProperties();
    }
  }, [user]);

  const fetchSavedProperties = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("saved_properties")
        .select("property_id")
        .eq("user_id", user.id);

      if (error) throw error;

      setSavedIds(data?.map((item) => item.property_id) || []);
    } catch (error) {
      console.error("Error fetching saved properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (propertyId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("saved_properties")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", propertyId);

      if (error) throw error;

      setSavedIds(savedIds.filter((id) => id !== propertyId));
      toast({
        title: "Property Removed",
        description: "The property has been removed from your saved list.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove property.",
        variant: "destructive",
      });
    }
  };

  const savedProperties = savedIds.map((id) => getPropertyById(id)).filter(Boolean);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Saved Properties | TB Real Estate</title>
        <meta name="description" content="View your saved and favorite properties on TB Real Estate." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Heart className="w-4 h-4" />
                Saved Properties
              </div>
              <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">
                Your Saved Properties
              </h1>
              <p className="text-muted-foreground mt-2">
                {savedProperties.length} properties saved
              </p>
            </div>

            {savedProperties.length === 0 ? (
              <Card className="border-border/50 shadow-soft">
                <CardContent className="py-16 text-center">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                  <h3 className="font-heading text-xl font-semibold mb-2">No Saved Properties</h3>
                  <p className="text-muted-foreground mb-6">
                    Start exploring and save properties you love!
                  </p>
                  <Link to="/properties">
                    <Button variant="hero">
                      Browse Properties
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((property) => property && (
                  <Card key={property.id} className="border-border/50 shadow-soft overflow-hidden group">
                    <div className="relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={() => handleRemove(property.id)}
                        className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="absolute bottom-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                        {property.type}
                      </span>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2 line-clamp-1">
                        {property.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                        <MapPin className="w-4 h-4" />
                        {property.location}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Bed className="w-4 h-4" /> {property.bedrooms}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-4 h-4" /> {property.bathrooms}
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize className="w-4 h-4" /> {property.area}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{property.price}</span>
                        <Link to={`/property/${property.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SavedProperties;
