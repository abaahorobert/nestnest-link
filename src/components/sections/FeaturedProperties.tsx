import { useState } from "react";
import PropertyCard from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const FeaturedProperties = () => {
  const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set());

  const properties = [
    {
      id: "1",
      title: "Modern Luxury Apartment",
      price: "$850,000",
      location: "Downtown District, City Center",
      type: "Apartment",
      status: "For Sale" as const,
      bedrooms: 3,
      bathrooms: 2,
      area: "1,200 sqft",
      image: property1,
    },
    {
      id: "2",
      title: "Contemporary Family Home",
      price: "$1,250,000",
      location: "Riverside Gardens, Suburbs",
      type: "House",
      status: "For Sale" as const,
      bedrooms: 4,
      bathrooms: 3,
      area: "2,400 sqft",
      image: property2,
    },
    {
      id: "3",
      title: "Luxury Penthouse Suite",
      price: "$2,100,000",
      location: "Skyline Tower, Business District",
      type: "Penthouse",
      status: "For Sale" as const,
      bedrooms: 4,
      bathrooms: 4,
      area: "3,200 sqft",
      image: property3,
    },
  ];

  const handleLike = (propertyId: string) => {
    const newLiked = new Set(likedProperties);
    if (newLiked.has(propertyId)) {
      newLiked.delete(propertyId);
    } else {
      newLiked.add(propertyId);
    }
    setLikedProperties(newLiked);
  };

  const handleView = (propertyId: string) => {
    console.log("View property:", propertyId);
  };

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties in the most desirable locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
              isLiked={likedProperties.has(property.id)}
              onLike={() => handleLike(property.id)}
              onView={() => handleView(property.id)}
            />
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="group">
            View All Properties
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;