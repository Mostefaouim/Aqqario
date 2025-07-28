
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

interface RegisterFormProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const RegisterForm = ({ isLoading, onSubmit }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              className="pl-10"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="register-email">Email</Label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="register-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <div className="relative mt-1">
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone number"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="register-password">Password</Label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="register-password"
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
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
