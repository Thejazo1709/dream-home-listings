import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Phone, Mail } from "lucide-react";
import { format } from "date-fns";

interface ScheduledVisit {
  id: string;
  property_id: string;
  property_title: string;
  visit_date: string;
  visit_time: string;
  status: string;
  created_at: string;
}

const MyVisits = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [visits, setVisits] = useState<ScheduledVisit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchVisits();
    }
  }, [user]);

  const fetchVisits = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("scheduled_visits")
        .select("*")
        .eq("user_id", user.id)
        .order("visit_date", { ascending: true });

      if (error) throw error;

      setVisits(data || []);
    } catch (error) {
      console.error("Error fetching visits:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

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
        <title>My Scheduled Visits | TB Real Estate</title>
        <meta name="description" content="View and manage your scheduled property visits." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Calendar className="w-4 h-4" />
                Scheduled Visits
              </div>
              <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">
                My Property Visits
              </h1>
              <p className="text-muted-foreground mt-2">
                {visits.length} visits scheduled
              </p>
            </div>

            {visits.length === 0 ? (
              <Card className="border-border/50 shadow-soft">
                <CardContent className="py-16 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                  <h3 className="font-heading text-xl font-semibold mb-2">No Visits Scheduled</h3>
                  <p className="text-muted-foreground">
                    Schedule a visit to any property you're interested in.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {visits.map((visit) => (
                  <Card key={visit.id} className="border-border/50 shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-heading text-lg font-semibold text-foreground">
                              {visit.property_title}
                            </h3>
                            <Badge className={`${getStatusColor(visit.status)} text-white`}>
                              {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(visit.visit_date), "PPP")}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {visit.visit_time}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Booked on {format(new Date(visit.created_at), "PP")}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Help Section */}
            <Card className="mt-8 border-border/50 shadow-soft bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you need to reschedule or cancel a visit, please contact our support team:
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +91 98765 43210
                  </a>
                  <a
                    href="mailto:support@tbrealestate.com"
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    support@tbrealestate.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MyVisits;
