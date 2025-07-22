import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PropertyCard from "@/components/PropertyCard";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Star, Quote } from "lucide-react";

// Mock data for featured properties
const featuredProperties = [
  {
    id: "1",
    title: "Appartement moderne à Hydra",
    price: 45000000,
    location: "Hydra, Alger",
    type: "sale" as const,
    propertyType: "appartement",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Villa avec piscine à Dely Ibrahim",
    price: 80000,
    location: "Dely Ibrahim, Alger",
    type: "rent" as const,
    propertyType: "villa",
    bedrooms: 5,
    bathrooms: 3,
    area: 300,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: "3",
    title: "Duplex lumineux à Bouzareah",
    price: 35000000,
    location: "Bouzareah, Alger",
    type: "sale" as const,
    propertyType: "duplex",
    bedrooms: 4,
    bathrooms: 2,
    area: 180,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
  },
];

const testimonials = [
  {
    name: "Amina Benali",
    role: "Acheteuse",
    content: "Grâce à Aqqario, j'ai trouvé ma maison de rêve en seulement 2 semaines. Le service est exceptionnel !",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=60&h=60&fit=crop&crop=face",
  },
  {
    name: "Karim Tadjer",
    role: "Agent immobilier",
    content: "En tant qu'agence, Aqqario nous a permis d'augmenter nos ventes de 40%. Une plateforme indispensable !",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
  },
  {
    name: "Fatima Zerrouki",
    role: "Propriétaire",
    content: "Interface intuitive et résultats rapides. J'ai loué mon appartement en moins d'une semaine.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      
      {/* Featured Properties Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Propriétés à la une
              </h2>
              <p className="text-xl text-muted-foreground">
                Découvrez notre sélection de propriétés premium
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex">
              Voir toutes les propriétés
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center md:hidden">
            <Button variant="outline">
              Voir toutes les propriétés
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plus de 10,000 clients satisfaits nous font confiance pour leurs projets immobiliers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <Quote className="w-8 h-8 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à commencer votre recherche ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'Algériens qui ont trouvé leur propriété idéale sur Aqqario
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Explorer les propriétés
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Devenir partenaire
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-2xl font-bold">Aqqario</span>
              </div>
              <p className="text-white/70 mb-4 max-w-md">
                La plateforme immobilière de référence en Algérie. Connectons les rêves aux réalités.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="/listings" className="hover:text-white transition-colors">Propriétés</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/subscribe" className="hover:text-white transition-colors">S'abonner</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-white/70">
                <li>support@aqqario.dz</li>
                <li>+213 555 123 456</li>
                <li>Alger, Algérie</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
            <p>&copy; 2024 Aqqario. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;