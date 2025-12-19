import { Shield, Clock, Users, Award, CheckCircle, Building } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Properties",
    description: "Every property is thoroughly verified for legal compliance and authenticity before listing.",
  },
  {
    icon: Clock,
    title: "Quick Process",
    description: "Streamlined buying process with expert guidance from search to possession.",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Dedicated relationship managers available 7 days a week to assist you.",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Transparent pricing with no hidden charges. Get the best deals in the market.",
  },
  {
    icon: CheckCircle,
    title: "Legal Assistance",
    description: "Complete legal support including documentation and registration assistance.",
  },
  {
    icon: Building,
    title: "Wide Selection",
    description: "Choose from 500+ properties across 50+ prime locations in major cities.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Why Choose Us
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
              Your Trusted Partner in Finding the Perfect Home
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              With over a decade of experience in real estate, we've helped thousands of families 
              find their dream homes. Our commitment to transparency, expertise, and customer 
              satisfaction sets us apart.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card rounded-xl shadow-soft">
                <p className="font-heading text-2xl lg:text-3xl font-bold text-primary">10+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="text-center p-4 bg-card rounded-xl shadow-soft">
                <p className="font-heading text-2xl lg:text-3xl font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div className="text-center p-4 bg-card rounded-xl shadow-soft">
                <p className="font-heading text-2xl lg:text-3xl font-bold text-primary">₹500Cr+</p>
                <p className="text-sm text-muted-foreground">Transactions</p>
              </div>
            </div>
          </div>

          {/* Right Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-5 bg-card rounded-xl border border-border/50 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
