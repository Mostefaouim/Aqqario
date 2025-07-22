import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square, Eye, Heart } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    type: "rent" | "sale";
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    image: string;
    featured?: boolean;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <CardHeader className="p-0 relative">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={property.type === "rent" ? "default" : "secondary"}>
              {property.type === "rent" ? "À louer" : "À vendre"}
            </Badge>
            {property.featured && (
              <Badge variant="premium">Premium</Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 bg-white/80 hover:bg-white transition-colors ${
              isFavorite ? "text-red-500" : "text-muted-foreground"
            }`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {property.location}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="capitalize">{property.propertyType}</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                {property.bedrooms}
              </div>
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                {property.bathrooms}
              </div>
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                {property.area}m²
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              {formatPrice(property.price)}
              {property.type === "rent" && (
                <span className="text-sm font-normal text-muted-foreground">/mois</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            Voir détails
          </Button>
          <Button size="sm" className="flex-1">
            Contacter
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;