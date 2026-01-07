import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Search, 
  FileText, 
  Handshake, 
  TrendingUp, 
  Shield, 
  Users, 
  Building2,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Property Search & Discovery",
    description: "Our expert team helps you find the perfect property that matches your requirements, budget, and lifestyle preferences.",
    features: [
      "Personalized property recommendations",
      "Access to exclusive off-market listings",
      "Virtual and in-person property tours",
      "Neighborhood analysis and insights"
    ]
  },
  {
    icon: Home,
    title: "Buy & Sell Properties",
    description: "Whether you're buying your first home or selling an investment property, we provide end-to-end support for seamless transactions.",
    features: [
      "Market valuation and pricing strategy",
      "Professional property photography",
      "Negotiation support",
      "Complete paperwork assistance"
    ]
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Make informed real estate investment decisions with our expert analysis and market insights.",
    features: [
      "ROI analysis and projections",
      "Market trend analysis",
      "Portfolio diversification advice",
      "Pre-launch project opportunities"
    ]
  },
  {
    icon: FileText,
    title: "Legal & Documentation",
    description: "Navigate the complex legal aspects of property transactions with our comprehensive documentation support.",
    features: [
      "Title verification",
      "Legal due diligence",
      "Registration assistance",
      "Loan documentation support"
    ]
  },
  {
    icon: Handshake,
    title: "Home Loan Assistance",
    description: "Get the best loan deals with our partnerships with leading banks and financial institutions.",
    features: [
      "Multiple bank tie-ups",
      "Best interest rate negotiation",
      "Pre-approval assistance",
      "EMI calculation and planning"
    ]
  },
  {
    icon: Building2,
    title: "Property Management",
    description: "Hassle-free property management services for landlords and investors.",
    features: [
      "Tenant screening and placement",
      "Rent collection",
      "Maintenance coordination",
      "Regular property inspections"
    ]
  },
];

const process = [
  { step: "01", title: "Initial Consultation", description: "We understand your requirements, budget, and preferences" },
  { step: "02", title: "Property Search", description: "Our team curates a list of properties matching your criteria" },
  { step: "03", title: "Site Visits", description: "Schedule and accompany you on property visits" },
  { step: "04", title: "Due Diligence", description: "Thorough verification of legal documents and property details" },
  { step: "05", title: "Negotiation", description: "Expert negotiation to get you the best deal" },
  { step: "06", title: "Closure", description: "Seamless documentation and handover process" },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | TB Real Estate - Complete Real Estate Solutions</title>
        <meta name="description" content="Explore TB Real Estate's comprehensive services including property search, buy/sell assistance, investment advisory, legal support, and home loan assistance." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                  Our Services
                </span>
                <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Comprehensive Real Estate Solutions
                </h1>
                <p className="text-lg text-muted-foreground">
                  From property search to final handover, we provide end-to-end support 
                  to make your real estate journey smooth and successful.
                </p>
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="bg-card border border-border/50 rounded-2xl p-6 hover:shadow-elegant transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                  How We Work
                </span>
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Our Proven Process
                </h2>
                <p className="text-muted-foreground">
                  A streamlined approach to help you find and secure your perfect property.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {process.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="bg-card border border-border/50 rounded-2xl p-6">
                      <span className="text-5xl font-bold text-primary/20">{item.step}</span>
                      <h3 className="font-heading text-lg font-bold text-foreground mt-2 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                    {index < process.length - 1 && (
                      <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-muted-foreground/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 lg:p-12 text-primary-foreground">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
                      Why Choose TB Real Estate?
                    </h2>
                    <p className="opacity-90 mb-6">
                      With 15+ years of experience and a track record of 500+ successful transactions, 
                      we bring unmatched expertise and dedication to every client relationship.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        <span>Verified Properties</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>Expert Team</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Handshake className="w-5 h-5" />
                        <span>Transparent Dealing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        <span>Best Prices</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center lg:text-right">
                    <Link to="/contact">
                      <Button variant="heroOutline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                        Get Free Consultation
                      </Button>
                    </Link>
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

export default Services;
