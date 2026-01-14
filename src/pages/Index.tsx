import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";
import EMICalculator from "@/components/EMICalculator";
import PropertyComparison from "@/components/PropertyComparison";
import PropertyMap from "@/components/PropertyMap";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TB Real Estate - Premium Properties | Buy 1BHK to 5BHK, Villas & Duplexes Across India</title>
        <meta name="description" content="Find your dream home with TB Real Estate. Explore premium apartments, villas, and duplexes across Bangalore, Mumbai, Delhi, Hyderabad, Chennai, and more." />
        <meta name="keywords" content="real estate, property for sale, 1BHK, 2BHK, 3BHK, 4BHK, villa, duplex, Bangalore, Mumbai, Delhi, Hyderabad, Chennai" />
        <link rel="canonical" href="https://tbrealestate.com" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <FeaturedProperties />
          <PropertyMap />
          <EMICalculator />
          <PropertyComparison />
          <WhyChooseUs />
          <FeedbackSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
