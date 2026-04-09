import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUp } from "lucide-react";
import tbLogo from "@/assets/tb-logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={tbLogo} alt="TB Real Estate Logo" className="h-12 w-auto rounded-lg" />
              <div>
                <h3 className="font-heading text-xl font-bold">TB Real Estate</h3>
                <p className="text-xs text-primary-foreground/60">Premium Real Estate</p>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm mb-6">
              Your trusted partner in finding the perfect home. 
              We specialize in premium residential properties across major cities.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Properties", "About Us", "Services", "Contact", "Blog", "Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Property Types</h4>
            <ul className="space-y-3">
              {["1 BHK Apartments", "2 BHK Apartments", "3 BHK Apartments", "4 BHK Apartments"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Popular Cities</h4>
            <ul className="space-y-3">
              {["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Chennai", "Pune", "Kolkata"].map((city) => (
                <li key={city}>
                  <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              © 2024 TB Real Estate. All rights reserved. | Privacy Policy | Terms of Service
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-accent transition-colors"
            >
              Back to Top
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
