
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, Building } from "lucide-react";

interface AgencyRegisterFormProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const AgencyRegisterForm = ({ isLoading, onSubmit }: AgencyRegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="agency-name">Nom de l'agence</Label>
        <div className="relative mt-1">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="agency-name"
            type="text"
            placeholder="Nom de votre agence"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="contact-name">Nom du contact</Label>
        <div className="relative mt-1">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="contact-name"
            type="text"
            placeholder="Votre nom complet"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="agency-email">Email professionnel</Label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="agency-email"
            type="email"
            placeholder="contact@votre-agence.com"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="agency-password">Mot de passe</Label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="agency-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10 pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Eye className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-start">
        <input type="checkbox" className="mt-1 mr-2" required />
        <span className="text-sm text-muted-foreground">
          J'accepte les{" "}
          <a href="#" className="text-primary hover:underline">
            conditions d'utilisation
          </a>{" "}
          et la{" "}
          <a href="#" className="text-primary hover:underline">
            politique de confidentialité
          </a>
        </span>
      </div>

      <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
        {isLoading ? "Création..." : "Créer mon compte agence"}
      </Button>
    </form>
  );
};

export default AgencyRegisterForm;
