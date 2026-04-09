import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Users, Home, TrendingUp, Target, Eye, Heart, Shield } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";

const stats = [
  { icon: Home, value: "500+", label: "Properties Sold" },
  { icon: Users, value: "1,200+", label: "Happy Families" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: TrendingUp, value: "₹800 Cr+", label: "Properties Transacted" },
];

const values = [
  {
    icon: Target,
    title: "Client-Centric Approach",
    description: "Every decision we make is centered around our clients' needs and dreams. Your satisfaction is our ultimate goal."
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We believe in complete transparency in all our dealings. No hidden costs, no surprises - just honest, reliable service."
  },
  {
    icon: Eye,
    title: "Expert Market Knowledge",
    description: "With 15+ years of experience, we have deep insights into market trends, pricing, and the best investment opportunities."
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description: "We understand that every client is unique. Our personalized approach ensures you find exactly what you're looking for."
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | TB Real Estate - Your Trusted Property Partner</title>
        <meta name="description" content="Learn about TB Real Estate - 15+ years of excellence in real estate. Discover our mission, values, and commitment to helping you find your perfect home." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                  About TB Real Estate
                </span>
                <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Building Dreams, Creating Homes Since 2009
                </h1>
                <p className="text-lg text-muted-foreground">
                  TB Real Estate has been at the forefront of Bangalore's real estate industry, 
                  helping thousands of families find their perfect homes with trust, transparency, and expertise.
                </p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 bg-card border-y border-border/50">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                    Our Story
                  </span>
                  <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">
                    From Humble Beginnings to Industry Leaders
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      TB Real Estate was founded in 2009 with a simple yet powerful vision: to transform 
                      the real estate experience in Bangalore by putting clients first and maintaining 
                      the highest standards of integrity and professionalism.
                    </p>
                    <p>
                      What started as a small team of passionate real estate professionals has grown 
                      into one of the most trusted names in the industry. Over the past 15 years, 
                      we have helped over 1,200 families find their dream homes across Bangalore's 
                      most sought-after neighborhoods.
                    </p>
                    <p>
                     Today, our portfolio spans from affordable 1BHK apartments to spacious 4BHK 
                       premium residences, catering to diverse needs and budgets. Our success 
                       is built on the foundation of trust, transparency, and an unwavering commitment 
                       to our clients' satisfaction.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-elegant">
                    <img 
                      src={teamPhoto} 
                      alt="TB Real Estate Team" 
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg">
                    <p className="text-4xl font-bold">15+</p>
                    <p className="text-sm opacity-90">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                  Our Values
                </span>
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  What Sets Us Apart
                </h2>
                <p className="text-muted-foreground">
                  Our core values guide every interaction and decision we make, ensuring 
                  you receive the best possible experience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div 
                    key={index} 
                    className="bg-card border border-border/50 rounded-2xl p-6 hover:shadow-soft transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-8">
                  <h3 className="font-heading text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="opacity-90">
                    To simplify the property buying journey by providing expert guidance, 
                    verified properties, and transparent dealings, making the dream of 
                    homeownership accessible to every family.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-2xl p-8">
                  <h3 className="font-heading text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="opacity-90">
                    To be Bangalore's most trusted real estate partner, known for our 
                    integrity, expertise, and the lasting relationships we build with 
                    our clients across generations.
                  </p>
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

export default About;
