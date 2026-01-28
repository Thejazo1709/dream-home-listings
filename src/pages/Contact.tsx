import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Send
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: ["TB Real Estate", "123, 4th Cross, Koramangala", "Bangalore - 560034, Karnataka"]
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 98765 43210", "+91 80 4567 8901"]
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@tbrealestate.com", "sales@tbrealestate.com"]
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Monday - Saturday", "9:00 AM - 7:00 PM", "Sunday: By Appointment"]
  },
];

const Contact = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          property_id: 'contact-form',
          inquiry_type: 'contact',
          message: `${formData.subject ? `Subject: ${formData.subject}\n\n` : ''}${formData.message}`,
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
              subject: formData.subject,
              message: formData.message
            }
          }
        });
      } catch (emailErr) {
        console.error('Email sending failed:', emailErr);
      }

      toast({
        title: "Message Sent Successfully!",
        description: "Our team will get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | TB Real Estate - Get in Touch</title>
        <meta name="description" content="Contact TB Real Estate for property inquiries, site visits, or investment advice. Visit our Bangalore office or reach us by phone and email." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                  Contact Us
                </span>
                <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Let's Start a Conversation
                </h1>
                <p className="text-lg text-muted-foreground">
                  Have questions about a property or need expert guidance? 
                  Our team is here to help you every step of the way.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Info Cards */}
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="bg-card border border-border/50 rounded-2xl p-6 text-center hover:shadow-soft transition-shadow"
                  >
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <info.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form & Map */}
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div>
                  <div className="mb-8">
                    <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                      Send Us a Message
                    </h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Your Name *
                        </label>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Subject
                        </label>
                        <Input
                          type="text"
                          placeholder="Property Inquiry"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Message *
                      </label>
                      <Textarea
                        placeholder="Tell us about your property requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>

                {/* Map & Quick Contact */}
                <div>
                  <div className="bg-card border border-border/50 rounded-2xl overflow-hidden h-full">
                    {/* Map Placeholder */}
                    <div className="h-64 lg:h-80 bg-muted/50 flex items-center justify-center">
                      <div className="text-center px-8">
                        <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                          Our Location
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          123, 4th Cross, Koramangala, Bangalore - 560034
                        </p>
                      </div>
                    </div>

                    {/* Quick Contact */}
                    <div className="p-6">
                      <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                        Quick Contact
                      </h3>
                      <div className="space-y-4">
                        <a 
                          href="tel:+919876543210" 
                          className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Call Now</p>
                            <p className="font-semibold text-foreground">+91 98765 43210</p>
                          </div>
                        </a>
                        <a 
                          href="https://wa.me/919876543210" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">WhatsApp</p>
                            <p className="font-semibold text-foreground">Chat with us</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ CTA */}
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 lg:p-12 text-center">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                  Still Have Questions?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Our team of real estate experts is available to answer all your queries. 
                  Schedule a free consultation call today!
                </p>
                <Button variant="hero" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule a Call
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
