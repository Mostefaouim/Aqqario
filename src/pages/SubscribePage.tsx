import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Building } from "lucide-react";

const SubscribePage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Abonnements Aqqario",
    "description": "Plans d'abonnement pour les agences immobilières et professionnels de l'immobilier",
    "provider": {
      "@type": "Organization",
      "name": "Aqqario"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Plan Starter",
        "price": "29",
        "priceCurrency": "EUR",
        "description": "Plan de base pour démarrer votre activité immobilière"
      },
      {
        "@type": "Offer",
        "name": "Plan Professional", 
        "price": "79",
        "priceCurrency": "EUR",
        "description": "Plan complet pour les professionnels confirmés"
      },
      {
        "@type": "Offer",
        "name": "Plan Enterprise",
        "price": "199", 
        "priceCurrency": "EUR",
        "description": "Solution complète pour les grandes agences"
      }
    ]
  };

  const plans = [
    {
      name: "Starter",
      price: 5000,
      period: "mois",
      icon: Zap,
      popular: false,
      features: [
        "Jusqu'à 10 annonces actives",
        "Photos HD illimitées",
        "Support email",
        "Statistiques de base",
        "Publication sur le site"
      ]
    },
    {
      name: "Professional",
      price: 12000,
      period: "mois",
      icon: Building,
      popular: true,
      features: [
        "Jusqu'à 50 annonces actives",
        "Photos + vidéos HD",
        "Support prioritaire",
        "Statistiques avancées",
        "Badge 'Agence Vérifiée'",
        "Boost de visibilité",
        "Lead management"
      ]
    },
    {
      name: "Enterprise",
      price: 25000,
      period: "mois",
      icon: Crown,
      popular: false,
      features: [
        "Annonces illimitées",
        "Visites virtuelles 360°",
        "Support dédié 24/7",
        "Analytics complets",
        "Badge 'Agence Premium'",
        "Position prioritaire",
        "API personnalisée",
        "Formation équipe"
      ]
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Plans d'Abonnement - Agences Immobilières | Aqqario"
        description="Choisissez le plan d'abonnement Aqqario adapté à votre agence immobilière. Plans Starter, Professional et Enterprise avec fonctionnalités avancées."
        keywords="abonnement immobilier, plan agence, tarif professionnel, subscription real estate"
        canonical="https://aqqario.com/subscribe"
        structuredData={structuredData}
      />
      <Navbar />
      
      <div className="pt-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-background to-accent/10 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Choisissez votre{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                abonnement
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Développez votre activité immobilière avec Aqqario. 
              Commencez avec 14 jours d'essai gratuit.
            </p>
            <Badge variant="success" className="text-sm px-4 py-2">
              🎉 Offre de lancement : -30% les 3 premiers mois
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-accent text-white text-center py-2 text-sm font-medium">
                    ⭐ Le plus populaire
                  </div>
                )}
                
                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <plan.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-8">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.popular ? "hero" : "outline"} 
                    size="lg" 
                    className="w-full"
                  >
                    {plan.popular ? "Commencer maintenant" : "Choisir ce plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Puis-je changer de plan à tout moment ?",
                  a: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement."
                },
                {
                  q: "Y a-t-il des frais cachés ?",
                  a: "Non, nos prix sont transparents. Aucun frais d'installation ou de configuration."
                },
                {
                  q: "Comment fonctionne l'essai gratuit ?",
                  a: "14 jours d'essai gratuit sur tous nos plans. Aucune carte bancaire requise pour commencer."
                }
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;