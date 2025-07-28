
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
        <Label htmlFor="agency-name">Agency Name</Label>
        <div className="relative mt-1">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="agency-name"
            name="agencyName"
            type="text"
            placeholder="Your agency name"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="contact-name">Contact Name</Label>
        <div className="relative mt-1">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="contact-name"
            name="contactName"
            type="text"
            placeholder="Your full name"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="agency-email">Professional Email</Label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="agency-email"
            name="email"
            type="email"
            placeholder="contact@your-agency.com"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="agency-password">Password</Label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="agency-password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
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
          I agree to the{" "}
          <a href="#" className="text-primary hover:underline">
            terms of service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            privacy policy
          </a>
        </span>
      </div>

      <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create agency account"}
      </Button>
    </form>
  );
};

export default AgencyRegisterForm;
