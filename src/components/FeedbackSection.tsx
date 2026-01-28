import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Star, Send, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  propertyType: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    location: "Mumbai, Maharashtra",
    rating: 5,
    comment: "TB Real Estate made my home buying experience absolutely seamless. Their team was professional, responsive, and helped me find the perfect 3BHK in Powai. Highly recommended!",
    propertyType: "3 BHK Apartment",
    avatar: "RK"
  },
  {
    id: "2",
    name: "Priya Sharma",
    location: "Bangalore, Karnataka",
    rating: 5,
    comment: "I was skeptical about online property searches, but TB Real Estate exceeded my expectations. Found my dream villa in Whitefield within a month. The virtual tours were incredibly helpful!",
    propertyType: "4 BHK Villa",
    avatar: "PS"
  },
  {
    id: "3",
    name: "Amit Patel",
    location: "Delhi NCR",
    rating: 4,
    comment: "Great service and transparent dealings. The comparison tool made decision-making so much easier. Bought a beautiful 2BHK in Noida. Thank you, TB Real Estate!",
    propertyType: "2 BHK Apartment",
    avatar: "AP"
  },
  {
    id: "4",
    name: "Sneha Reddy",
    location: "Hyderabad, Telangana",
    rating: 5,
    comment: "From property search to registration, TB Real Estate handled everything professionally. Their comparison tool made decision-making so much easier. Best real estate platform!",
    propertyType: "3 BHK Duplex",
    avatar: "SR"
  },
  {
    id: "5",
    name: "Vikram Singh",
    location: "Pune, Maharashtra",
    rating: 5,
    comment: "Excellent team that understands customer needs. They showed me properties exactly matching my requirements. Closed my deal in record time!",
    propertyType: "Villa",
    avatar: "VS"
  },
  {
    id: "6",
    name: "Anitha Nair",
    location: "Chennai, Tamil Nadu",
    rating: 4,
    comment: "Very professional approach and good follow-up. The property documentation assistance was invaluable. Happy with my new home!",
    propertyType: "2 BHK Apartment",
    avatar: "AN"
  }
];

const FeedbackSection = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    feedback: ""
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !selectedRating || !formData.feedback) {
      toast({
        title: "Please fill all required fields",
        description: "Name, email, rating, and feedback are required.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('feedback')
        .insert({
          name: formData.name,
          email: formData.email,
          rating: selectedRating,
          message: formData.feedback,
          property_id: formData.propertyType || null,
          user_id: user?.id || null,
          is_approved: false
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save feedback');
      }

      // Send confirmation email
      try {
        await supabase.functions.invoke('send-email', {
          body: {
            type: 'feedback',
            to: formData.email,
            name: formData.name,
            data: {
              rating: selectedRating,
              message: formData.feedback
            }
          }
        });
      } catch (emailErr) {
        console.error('Email sending failed:', emailErr);
        // Continue - feedback was saved successfully
      }

      toast({
        title: "Thank you for your feedback!",
        description: "We appreciate you taking the time to share your experience.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyType: "",
        feedback: ""
      });
      setSelectedRating(0);
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Failed to submit feedback",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Customer Feedback
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Read testimonials from our happy customers and share your own experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-border/50 shadow-soft hover:shadow-hover transition-shadow">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground mb-4 line-clamp-4">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= testimonial.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <p className="text-xs text-primary">{testimonial.propertyType}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feedback Form */}
        <Card className="max-w-2xl mx-auto border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-center">Share Your Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Property Type (Optional)</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1bhk">1 BHK Apartment</SelectItem>
                      <SelectItem value="2bhk">2 BHK Apartment</SelectItem>
                      <SelectItem value="3bhk">3 BHK Apartment</SelectItem>
                      <SelectItem value="4bhk">4 BHK Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="duplex">Duplex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Your Rating *</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredRating || selectedRating)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                  {selectedRating > 0 && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      {selectedRating === 5 ? "Excellent!" : 
                       selectedRating === 4 ? "Very Good" :
                       selectedRating === 3 ? "Good" :
                       selectedRating === 2 ? "Fair" : "Poor"}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Your Feedback *</Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us about your experience with TB Real Estate..."
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeedbackSection;
