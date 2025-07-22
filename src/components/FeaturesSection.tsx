import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Users, BarChart3, Camera, MapPin, Clock, HeadphonesIcon } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Propriétés Vérifiées",
      description: "Toutes nos annonces sont vérifiées par nos équipes pour garantir leur authenticité.",
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      icon: Zap,
      title: "Recherche Instantanée",
      description: "Trouvez votre propriété idéale en quelques clics grâce à nos filtres avancés.",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: Users,
      title: "Agences Certifiées",
      description: "Nous collaborons uniquement avec des agences immobilières certifiées et de confiance.",
      color: "text-accent",
      bg: "bg-accent/10"
    },
    {
      icon: Camera,
      title: "Visites Virtuelles",
      description: "Explorez les propriétés avec des photos HD et des visites virtuelles immersives.",
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      icon: BarChart3,
      title: "Analyse du Marché",
      description: "Accédez aux tendances du marché immobilier et aux estimations de prix.",
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      icon: MapPin,
      title: "Géolocalisation",
      description: "Découvrez les propriétés autour de vous avec notre carte interactive.",
      color: "text-red-600",
      bg: "bg-red-100"
    },
    {
      icon: Clock,
      title: "Notifications en Temps Réel",
      description: "Soyez le premier informé des nouvelles propriétés correspondant à vos critères.",
      color: "text-orange-600",
      bg: "bg-orange-100"
    },
    {
      icon: HeadphonesIcon,
      title: "Support 24/7",
      description: "Notre équipe d'experts est disponible pour vous accompagner à tout moment.",
      color: "text-indigo-600",
      bg: "bg-indigo-100"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pourquoi choisir{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Aqqario
            </span>
            ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez les avantages qui font d'Aqqario la plateforme de référence 
            pour l'immobilier en Algérie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bg} rounded-lg mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;