import { useState } from "react";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { MapPin, Filter, Grid3X3, List, SlidersHorizontal } from "lucide-react";

// Mock data for listings
const mockListings = [
  {
    id: "1",
    title: "Appartement moderne avec vue sur mer",
    price: 55000000,
    location: "Ain Taya, Alger",
    type: "sale" as const,
    propertyType: "appartement",
    bedrooms: 3,
    bathrooms: 2,
    area: 130,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Villa spacieuse avec jardin",
    price: 120000,
    location: "Cheraga, Alger",
    type: "rent" as const,
    propertyType: "villa",
    bedrooms: 5,
    bathrooms: 3,
    area: 400,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Studio lumineux centre-ville",
    price: 35000,
    location: "Centre, Alger",
    type: "rent" as const,
    propertyType: "studio",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Duplex avec terrasse",
    price: 42000000,
    location: "Bouzareah, Alger",
    type: "sale" as const,
    propertyType: "duplex",
    bedrooms: 4,
    bathrooms: 2,
    area: 200,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
  },
  {
    id: "5",
    title: "Penthouse de luxe",
    price: 150000,
    location: "Hydra, Alger",
    type: "rent" as const,
    propertyType: "appartement",
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: "6",
    title: "Maison traditionnelle rénovée",
    price: 38000000,
    location: "Casbah, Alger",
    type: "sale" as const,
    propertyType: "maison",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop",
  },
];

const ListingsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions = {
    types: ["Tous", "Appartement", "Villa", "Maison", "Studio", "Duplex"],
    locations: ["Toutes", "Alger Centre", "Hydra", "Cheraga", "Bouzareah", "Ain Taya"],
    bedrooms: ["Tous", "1", "2", "3", "4", "5+"],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary/10 via-background to-accent/10 py-12 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Découvrez nos propriétés
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {mockListings.length} propriétés disponibles en Algérie
              </p>
              
              {/* Quick Search */}
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Rechercher par ville, quartier..." 
                      className="pl-10"
                    />
                  </div>
                  <Button>
                    Rechercher
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Filtres</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="lg:hidden"
                      onClick={() => setShowFilters(false)}
                    >
                      ×
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Type de transaction */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Type de transaction
                    </label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="rent">À louer</SelectItem>
                        <SelectItem value="sale">À vendre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type de bien */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Type de bien
                    </label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.types.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Localisation */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Localisation
                    </label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.locations.map((location) => (
                          <SelectItem key={location} value={location.toLowerCase()}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Prix */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-4 block">
                      Fourchette de prix
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100000000}
                      step={1000000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{(priceRange[0] / 1000000).toFixed(0)}M DA</span>
                      <span>{(priceRange[1] / 1000000).toFixed(0)}M DA</span>
                    </div>
                  </div>

                  {/* Chambres */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Chambres
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.bedrooms.map((bedroom) => (
                        <Badge 
                          key={bedroom} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        >
                          {bedroom}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">
                    Appliquer les filtres
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(true)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                  
                  <div className="hidden sm:flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Plus récent</SelectItem>
                      <SelectItem value="price-asc">Prix croissant</SelectItem>
                      <SelectItem value="price-desc">Prix décroissant</SelectItem>
                      <SelectItem value="area-desc">Surface</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Properties Grid */}
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {mockListings.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button variant="default" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;