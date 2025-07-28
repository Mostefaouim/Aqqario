
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import AgencyRegisterForm from "@/components/auth/AgencyRegisterForm";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, signUpAgency } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast.error(error.message || 'Login failed');
      } else {
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const phone = formData.get('phone') as string;

    try {
      const { error } = await signUp(email, password, firstName, lastName, phone);
      
      if (error) {
        toast.error(error.message || 'Registration failed');
      } else {
        toast.success('Account created successfully! Please check your email for verification.');
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgencySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const agencyData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      phone: formData.get('phone') as string,
      agencyName: formData.get('agencyName') as string,
      licenseNumber: formData.get('licenseNumber') as string,
      bio: formData.get('bio') as string,
    };

    try {
      const { error } = await signUpAgency(agencyData);
      
      if (error) {
        toast.error(error.message || 'Agency registration failed');
      } else {
        toast.success('Agency account created successfully! Please check your email for verification.');
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Connexion & Inscription - Agences & Particuliers | Aqqario"
        description="Accédez à votre espace Aqqario. Connexion pour utilisateurs existants ou inscription gratuite pour agences immobilières et particuliers."
        keywords="connexion aqqario, inscription agence, login immobilier, créer compte"
        canonical="https://aqqario.com/login"
      />
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
                  <LoginForm isLoading={isLoading} onSubmit={handleLoginSubmit} />
                </TabsContent>

                {/* User Register Tab */}
                <TabsContent value="register" className="p-6 space-y-4 m-0">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold">Inscription Utilisateur</h3>
                    <p className="text-sm text-muted-foreground">Créez votre compte pour rechercher des propriétés</p>
                  </div>
                  <RegisterForm isLoading={isLoading} onSubmit={handleRegisterSubmit} />
                </TabsContent>

                {/* Agency Register Tab */}
                <TabsContent value="agency" className="p-6 space-y-4 m-0">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold">Inscription Agence</h3>
                    <p className="text-sm text-muted-foreground">Rejoignez notre plateforme en tant qu'agence</p>
                  </div>
                  <AgencyRegisterForm isLoading={isLoading} onSubmit={handleAgencySubmit} />
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
