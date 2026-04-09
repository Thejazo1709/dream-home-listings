import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const ContactSection = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to inquiries table
      const { error: dbError } = await supabase
        .from('inquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          property_id: formData.propertyType || 'general-inquiry',
          inquiry_type: 'consultation',
          message: formData.message || null,
          user_id: user?.id || null
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save inquiry');
      }

      // Send confirmation email
      try {
        await supabase.functions.invoke('send-email', {
          body: {
            type: 'inquiry',
            to: formData.email,
            name: formData.name,
            data: {
              subject: `Property Interest: ${formData.propertyType || 'General'}`,
              message: formData.message
            }
          }
        });
      } catch (emailErr) {
        console.error('Email sending failed:', emailErr);
      }

      toast({
        title: "Inquiry Submitted Successfully!",
        description: "Our team will contact you within 24 hours. A confirmation email has been sent.",
      });
      setFormData({ name: "", email: "", phone: "", propertyType: "", message: "" });
    } catch (error: any) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Failed to submit inquiry",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Get In Touch
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Contact us today for personalized property recommendations, 
              schedule site visits, or get expert advice on your real estate investment.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Call Us</h4>
                   <p className="text-muted-foreground">+91 82598 55188</p>
                   <p className="text-muted-foreground">+91 88613 08588</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email Us</h4>
                   <p className="text-muted-foreground">25mcaa54@kristujayanti.com</p>
                   <p className="text-muted-foreground">25mcaa15@kristujayanti.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Visit Us</h4>
                  <p className="text-muted-foreground">
                    123 Business Park, MG Road,<br />
                    Bangalore, Karnataka 560001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Working Hours</h4>
                  <p className="text-muted-foreground">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p className="text-muted-foreground">Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-card p-6 lg:p-8 rounded-2xl shadow-card border border-border/50">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
              Schedule a Free Consultation
            </h3>
            <p className="text-muted-foreground mb-6">
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Property Type Interested In
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select property type</option>
                  <option value="1bhk">1 BHK Apartment</option>
                  <option value="2bhk">2 BHK Apartment</option>
                  <option value="3bhk">3 BHK Apartment</option>
                  <option value="4bhk">4 BHK Apartment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <Button type="submit" variant="hero" size="xl" className="w-full btn-shine" disabled={isSubmitting}>
                <Send className="w-5 h-5" />
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
