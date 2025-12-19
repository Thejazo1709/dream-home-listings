import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>PrimeNest - Premium Real Estate | Buy 1BHK to 4BHK, Villas & Duplexes</title>
        <meta name="description" content="Find your dream home with PrimeNest. Explore premium 1BHK, 2BHK, 3BHK, 4BHK apartments, villas, and duplexes across major cities. Expert guidance & verified properties." />
        <meta name="keywords" content="real estate, property for sale, 1BHK, 2BHK, 3BHK, 4BHK, villa, duplex, independent house, Bangalore, Mumbai, home buying" />
        <link rel="canonical" href="https://primenest.com" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <FeaturedProperties />
          <WhyChooseUs />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
