import property1BHK from "@/assets/property-1bhk.jpg";
import property2BHK from "@/assets/property-2bhk.jpg";
import property3BHK from "@/assets/property-3bhk.jpg";
import property4BHK from "@/assets/property-4bhk.jpg";
import propertyDuplex from "@/assets/property-duplex.jpg";
import heroProperty from "@/assets/hero-property.jpg";

export interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  city: string;
  price: string;
  pricePerSqft: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: string;
  features: string[];
  isNew: boolean;
  isFeatured: boolean;
  description: string;
  amenities: string[];
  furnishing: string;
  parking: string;
  floor: string;
  facing: string;
  age: string;
  possession: string;
}

export const properties: Property[] = [
  {
    id: "cozy-studio-koramangala",
    image: property1BHK,
    title: "Cozy Studio Apartment",
    location: "Koramangala, Bangalore",
    city: "Bangalore",
    price: "₹45 Lac",
    pricePerSqft: "₹8,500",
    bedrooms: 1,
    bathrooms: 1,
    area: "530 sq.ft",
    type: "1 BHK",
    features: ["Modular Kitchen", "Power Backup", "Lift"],
    isNew: true,
    isFeatured: false,
    description: "This charming 1BHK apartment in the heart of Koramangala offers the perfect blend of comfort and convenience. Ideal for young professionals and couples, this modern studio features a fully equipped modular kitchen, spacious bedroom with ample natural light, and contemporary bathroom fittings. The building provides 24/7 power backup and elevator access.",
    amenities: ["Swimming Pool", "Gym", "Children's Play Area", "24/7 Security", "CCTV", "Intercom", "Covered Parking", "Visitor Parking", "Power Backup", "Lift"],
    furnishing: "Semi-Furnished",
    parking: "1 Covered",
    floor: "5th of 12 Floors",
    facing: "East",
    age: "2 Years",
    possession: "Ready to Move"
  },
  {
    id: "modern-city-view-whitefield",
    image: property2BHK,
    title: "Modern City View Apartment",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    price: "₹85 Lac",
    pricePerSqft: "₹7,800",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,090 sq.ft",
    type: "2 BHK",
    features: ["City View", "Gym Access", "24/7 Security"],
    isNew: false,
    isFeatured: true,
    description: "Experience urban living at its finest in this stunning 2BHK apartment located in Whitefield's most sought-after residential complex. Enjoy breathtaking city views from your spacious balcony, workout in the state-of-the-art gymnasium, and feel secure with round-the-clock security. Perfect for families seeking a modern lifestyle.",
    amenities: ["Swimming Pool", "Gym", "Club House", "Tennis Court", "Jogging Track", "Children's Play Area", "24/7 Security", "CCTV", "Intercom", "Covered Parking", "Power Backup", "Lift", "Landscaped Gardens"],
    furnishing: "Fully Furnished",
    parking: "1 Covered + 1 Open",
    floor: "12th of 20 Floors",
    facing: "North-East",
    age: "1 Year",
    possession: "Ready to Move"
  },
  {
    id: "spacious-family-hsr",
    image: property3BHK,
    title: "Spacious Family Residence",
    location: "HSR Layout, Bangalore",
    city: "Bangalore",
    price: "₹1.25 Cr",
    pricePerSqft: "₹7,200",
    bedrooms: 3,
    bathrooms: 3,
    area: "1,736 sq.ft",
    type: "3 BHK",
    features: ["Vastu Compliant", "Balcony", "Club House"],
    isNew: true,
    isFeatured: true,
    description: "This Vastu-compliant 3BHK residence in HSR Layout is designed for families who value space, comfort, and community living. With three spacious bedrooms, each with attached bathrooms, a large living-dining area with access to a beautiful balcony, and proximity to excellent schools and hospitals, this is the ideal family home.",
    amenities: ["Swimming Pool", "Gym", "Club House", "Indoor Games", "Yoga Room", "Party Hall", "Children's Play Area", "24/7 Security", "CCTV", "Intercom", "Covered Parking", "Power Backup", "Lift", "Landscaped Gardens", "Senior Citizen Corner"],
    furnishing: "Semi-Furnished",
    parking: "2 Covered",
    floor: "8th of 15 Floors",
    facing: "South-East",
    age: "New Construction",
    possession: "Ready to Move"
  },
  {
    id: "luxury-pool-villa-ec",
    image: property4BHK,
    title: "Luxury Pool Villa",
    location: "Electronic City, Bangalore",
    city: "Bangalore",
    price: "₹2.5 Cr",
    pricePerSqft: "₹6,500",
    bedrooms: 4,
    bathrooms: 4,
    area: "3,845 sq.ft",
    type: "4 BHK Villa",
    features: ["Private Pool", "Garden", "Covered Parking"],
    isNew: false,
    isFeatured: true,
    description: "Indulge in the ultimate luxury living experience with this magnificent 4BHK villa featuring a private swimming pool and beautifully landscaped garden. Located in a premium gated community in Electronic City, this villa offers unparalleled privacy, space, and world-class amenities. Perfect for those who demand the very best.",
    amenities: ["Private Pool", "Landscaped Garden", "Club House", "Gym", "Tennis Court", "Basketball Court", "Children's Play Area", "24/7 Security", "CCTV", "Intercom", "3-Car Covered Parking", "Power Backup", "Solar Panels", "Rainwater Harvesting", "Smart Home System"],
    furnishing: "Fully Furnished",
    parking: "3 Covered",
    floor: "G+2",
    facing: "North",
    age: "3 Years",
    possession: "Ready to Move"
  },
  {
    id: "contemporary-duplex-sarjapur",
    image: propertyDuplex,
    title: "Contemporary Duplex Home",
    location: "Sarjapur Road, Bangalore",
    city: "Bangalore",
    price: "₹1.75 Cr",
    pricePerSqft: "₹6,800",
    bedrooms: 3,
    bathrooms: 3,
    area: "2,574 sq.ft",
    type: "Duplex",
    features: ["Terrace Garden", "Smart Home", "2 Parking"],
    isNew: true,
    isFeatured: false,
    description: "This stunning contemporary duplex on Sarjapur Road combines modern architecture with smart living. Featuring a private terrace garden, integrated smart home system, and luxurious finishes throughout, this home is perfect for tech-savvy families who appreciate design and innovation. Enjoy sunset views from your private terrace every evening.",
    amenities: ["Terrace Garden", "Smart Home System", "Club House", "Gym", "Swimming Pool", "Jogging Track", "Children's Play Area", "24/7 Security", "CCTV", "Intercom", "2 Covered Parking", "Power Backup", "EV Charging Point"],
    furnishing: "Semi-Furnished",
    parking: "2 Covered",
    floor: "Duplex (3rd & 4th)",
    facing: "West",
    age: "New Construction",
    possession: "Ready to Move"
  },
  {
    id: "premium-independent-indiranagar",
    image: heroProperty,
    title: "Premium Independent House",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    price: "₹3.8 Cr",
    pricePerSqft: "₹9,200",
    bedrooms: 5,
    bathrooms: 5,
    area: "4,130 sq.ft",
    type: "Independent House",
    features: ["Corner Plot", "Landscaped Garden", "Premium Location"],
    isNew: false,
    isFeatured: true,
    description: "This exceptional independent house on a corner plot in prestigious Indiranagar represents the pinnacle of luxury real estate. With five bedrooms, each with en-suite bathrooms, a grand living area, formal dining room, modern kitchen, and beautifully landscaped garden, this property offers an unmatched lifestyle in one of Bangalore's most sought-after neighborhoods.",
    amenities: ["Corner Plot", "Landscaped Garden", "Home Office", "Servant Quarters", "Modular Kitchen", "Italian Marble Flooring", "4-Car Garage", "Generator Backup", "Bore Well", "Rainwater Harvesting", "CCTV", "Video Door Phone"],
    furnishing: "Fully Furnished",
    parking: "4 Covered",
    floor: "G+2",
    facing: "North-East",
    age: "5 Years",
    possession: "Ready to Move"
  },
  {
    id: "affordable-1bhk-marathahalli",
    image: property1BHK,
    title: "Affordable 1BHK Near Tech Park",
    location: "Marathahalli, Bangalore",
    city: "Bangalore",
    price: "₹38 Lac",
    pricePerSqft: "₹7,600",
    bedrooms: 1,
    bathrooms: 1,
    area: "500 sq.ft",
    type: "1 BHK",
    features: ["Near Tech Park", "Metro Connectivity", "Gated Community"],
    isNew: false,
    isFeatured: false,
    description: "Perfect for IT professionals, this affordable 1BHK is located within walking distance of major tech parks in Marathahalli. With excellent metro connectivity and all essential amenities, this is an ideal investment opportunity or starter home.",
    amenities: ["Gym", "Children's Play Area", "24/7 Security", "CCTV", "Intercom", "Covered Parking", "Power Backup", "Lift"],
    furnishing: "Unfurnished",
    parking: "1 Covered",
    floor: "3rd of 10 Floors",
    facing: "South",
    age: "4 Years",
    possession: "Ready to Move"
  },
  {
    id: "premium-2bhk-jayanagar",
    image: property2BHK,
    title: "Premium 2BHK in Heritage Area",
    location: "Jayanagar, Bangalore",
    city: "Bangalore",
    price: "₹1.1 Cr",
    pricePerSqft: "₹9,200",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,200 sq.ft",
    type: "2 BHK",
    features: ["Heritage Location", "Tree-Lined Streets", "Parks Nearby"],
    isNew: true,
    isFeatured: true,
    description: "Experience the charm of old Bangalore in this premium 2BHK apartment in the heart of Jayanagar. Surrounded by tree-lined streets, renowned restaurants, and beautiful parks, this property offers a unique blend of traditional charm and modern amenities.",
    amenities: ["Club House", "Gym", "Swimming Pool", "Children's Play Area", "24/7 Security", "CCTV", "Intercom", "Covered Parking", "Power Backup", "Lift", "Landscaped Gardens"],
    furnishing: "Semi-Furnished",
    parking: "1 Covered + 1 Open",
    floor: "6th of 8 Floors",
    facing: "East",
    age: "New Construction",
    possession: "Ready to Move"
  },
];

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(property => property.id === id);
};
