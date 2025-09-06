import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, Heart, Eye } from "lucide-react";

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  type: string;
  status: "For Sale" | "For Rent" | "Sold" | "Rented";
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  isLiked?: boolean;
  onLike?: () => void;
  onView?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  price,
  location,
  type,
  status,
  bedrooms,
  bathrooms,
  area,
  image,
  isLiked = false,
  onLike,
  onView,
}) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "For Sale":
        return "default";
      case "For Rent":
        return "secondary";
      case "Sold":
        return "destructive";
      case "Rented":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 animate-luxury">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={getStatusVariant(status)} className="font-medium">
            {status}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-background/80 hover:bg-background"
            onClick={onLike}
          >
            <Heart
              className={`h-4 w-4 ${
                isLiked ? "fill-accent text-accent" : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md font-semibold text-lg">
            {price}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center text-muted-foreground text-sm mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            {bedrooms > 0 && (
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                {bedrooms} bed
              </div>
            )}
            {bathrooms > 0 && (
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                {bathrooms} bath
              </div>
            )}
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              {area}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {type}
          </Badge>
          <Button variant="default" size="sm" onClick={onView}>
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;