import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Building, DollarSign, TrendingUp, Users, Star } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [searchType, setSearchType] = useState("rent");

  const stats = [
    { icon: Building, value: "1,200+", label: "Propriétés" },
    { icon: Users, value: "500+", label: "Agences" },
    { icon: Star, value: "4.9", label: "Note moyenne" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-small-black/[0.02] bg-grid-16" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Trouvez votre{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                propriété idéale
              </span>{" "}
              en Algérie
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Aqqario connecte les meilleures agences immobilières d'Algérie avec les clients 
              à la recherche de leur futur logement. Découvrez des milliers de propriétés vérifiées.
            </p>
          </div>

          {/* Search Card */}
          <Card className="max-w-4xl mx-auto mb-16 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="md:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">À louer</SelectItem>
                    <SelectItem value="sale">À vendre</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Ville, quartier, région..." 
                    className="pl-10"
                  />
                </div>

                <Select>
                  <SelectTrigger className="md:w-48">
                    <SelectValue placeholder="Type de bien" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Appartement</SelectItem>
                    <SelectItem value="house">Maison</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="md:w-32">
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50000">0 - 50K</SelectItem>
                    <SelectItem value="50000-100000">50K - 100K</SelectItem>
                    <SelectItem value="100000-200000">100K - 200K</SelectItem>
                    <SelectItem value="200000+">200K+</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="hero" size="lg" className="md:w-auto">
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Vous êtes une agence immobilière ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">
              Découvrir nos offres
            </Button>
            <Button variant="premium" size="lg">
              <DollarSign className="w-4 h-4 mr-2" />
              Commencer gratuitement
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;