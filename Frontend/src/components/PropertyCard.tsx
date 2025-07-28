import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square, Eye, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { favoriteService } from "@/services/favorite";
import { Property } from "@/services/property";
import { toast } from "sonner";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const { isAuthenticated } = useAuth();

  // Check if property is in favorites
  useEffect(() => {
    if (isAuthenticated) {
      checkFavoriteStatus();
    }
  }, [property.id, isAuthenticated]);

  const checkFavoriteStatus = async () => {
    try {
      const response = await favoriteService.checkFavoriteStatus(property.id);
      if (response.success && response.data) {
        setIsFavorite(response.data.isFavorite);
      }
    } catch (error) {
      // Silently fail - not critical
    }
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please log in to save favorites');
      return;
    }

    setLoadingFavorite(true);
    try {
      if (isFavorite) {
        await favoriteService.removeFromFavorites(property.id);
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        await favoriteService.addToFavorites(property.id);
        setIsFavorite(true);
        toast.success('Added to favorites');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update favorites');
    } finally {
      setLoadingFavorite(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      apartment: 'Apartment',
      house: 'House',
      villa: 'Villa',
      studio: 'Studio',
      office: 'Office',
      shop: 'Shop',
      warehouse: 'Warehouse',
      land: 'Land'
    };
    return types[type] || type;
  };

  return (
    <Link to={`/property/${property.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <CardHeader className="p-0 relative">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={property.images?.[0] || '/placeholder.svg'}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant={property.listing_type === "rent" ? "default" : "secondary"}>
                {property.listing_type === "rent" ? "For Rent" : "For Sale"}
              </Badge>
              {property.status === 'pending' && (
                <Badge variant="outline">Pending</Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 bg-white/80 hover:bg-white transition-colors ${
                isFavorite ? "text-red-500" : "text-muted-foreground"
              }`}
              onClick={toggleFavorite}
              disabled={loadingFavorite}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{property.address}, {property.city}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="capitalize">{getPropertyTypeLabel(property.property_type)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-primary">
                {formatPrice(property.price)}
                {property.listing_type === "rent" && <span className="text-sm font-normal">/month</span>}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              {property.bedrooms && (
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  <span>{property.bathrooms}</span>
                </div>
              )}
              {property.area && (
                <div className="flex items-center">
                  <Square className="w-4 h-4 mr-1" />
                  <span>{property.area} m²</span>
                </div>
              )}
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;