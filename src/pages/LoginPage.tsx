
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import AgencyRegisterForm from "@/components/auth/AgencyRegisterForm";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Accédez à votre espace
            </h2>
            <p className="mt-2 text-muted-foreground">
              Connectez-vous ou créez votre compte
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-0">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-3 rounded-t-lg rounded-b-none h-12">
                  <TabsTrigger value="login" className="text-xs">Connexion</TabsTrigger>
                  <TabsTrigger value="register" className="text-xs">Utilisateur</TabsTrigger>
                  <TabsTrigger value="agency" className="text-xs">Agence</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="p-6 space-y-4 m-0">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold">Connexion</h3>
                    <p className="text-sm text-muted-foreground">Accédez à votre compte</p>
                  </div>
                  <LoginForm isLoading={isLoading} onSubmit={handleSubmit} />
                </TabsContent>

                {/* User Register Tab */}
                <TabsContent value="register" className="p-6 space-y-4 m-0">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold">Inscription Utilisateur</h3>
                    <p className="text-sm text-muted-foreground">Créez votre compte pour rechercher des propriétés</p>
                  </div>
                  <RegisterForm isLoading={isLoading} onSubmit={handleSubmit} />
                </TabsContent>

                {/* Agency Register Tab */}
                <TabsContent value="agency" className="p-6 space-y-4 m-0">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold">Inscription Agence</h3>
                    <p className="text-sm text-muted-foreground">Rejoignez notre plateforme en tant qu'agence</p>
                  </div>
                  <AgencyRegisterForm isLoading={isLoading} onSubmit={handleSubmit} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Besoin d'aide ?{" "}
              <a href="/contact" className="text-primary hover:underline">
                Contactez notre support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
