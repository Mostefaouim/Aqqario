import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Home, MapPin, DollarSign, Camera } from 'lucide-react';
import Navbar from '@/components/Navbar';

const PostPropertyPage = () => {
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchUserProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Could not fetch user profile",
          variant: "destructive",
        });
        return;
      }

      setUserProfile(data);

      // Check if user is an agent
      if (data.role !== 'agent' && data.role !== 'admin') {
        toast({
          title: "Access Denied",
          description: "Only agents can post properties. Please contact us to become an agent.",
          variant: "destructive",
        });
        navigate('/');
      }
    };

    fetchUserProfile();
  }, [user, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    
    const propertyData = {
      agent_id: userProfile?.id,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      property_type: formData.get('property_type') as string,
      price: parseFloat(formData.get('price') as string),
      bedrooms: parseInt(formData.get('bedrooms') as string) || null,
      bathrooms: parseFloat(formData.get('bathrooms') as string) || null,
      square_feet: parseInt(formData.get('square_feet') as string) || null,
      lot_size: parseFloat(formData.get('lot_size') as string) || null,
      year_built: parseInt(formData.get('year_built') as string) || null,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zip_code: formData.get('zip_code') as string,
      country: formData.get('country') as string || 'USA',
      features: (formData.get('features') as string)?.split(',').map(f => f.trim()).filter(f => f) || [],
      images: (formData.get('images') as string)?.split(',').map(f => f.trim()).filter(f => f) || [],
      virtual_tour_url: formData.get('virtual_tour_url') as string || null,
    };

    const { error } = await supabase
      .from('properties')
      .insert([propertyData]);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Property listing created successfully.",
      });
      navigate('/listings');
    }

    setLoading(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/listings')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Listings
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-6 w-6" />
                Post New Property
              </CardTitle>
              <CardDescription>
                Create a new property listing for potential buyers and renters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="title">Property Title *</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g., Beautiful 3BR Family Home"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="property_type">Property Type *</Label>
                      <Select name="property_type" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="price">Price (USD) *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          placeholder="500000"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the property, its features, and what makes it special..."
                      rows={4}
                    />
                  </div>
                </div>

                {/* Property Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Property Details</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input
                        id="bedrooms"
                        name="bedrooms"
                        type="number"
                        min="0"
                        placeholder="3"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input
                        id="bathrooms"
                        name="bathrooms"
                        type="number"
                        step="0.5"
                        min="0"
                        placeholder="2.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="square_feet">Square Feet</Label>
                      <Input
                        id="square_feet"
                        name="square_feet"
                        type="number"
                        min="0"
                        placeholder="2000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="year_built">Year Built</Label>
                      <Input
                        id="year_built"
                        name="year_built"
                        type="number"
                        min="1800"
                        max={new Date().getFullYear()}
                        placeholder="2020"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="lot_size">Lot Size (acres)</Label>
                    <Input
                      id="lot_size"
                      name="lot_size"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.25"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location
                  </h3>
                  
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Los Angeles"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="CA"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="zip_code">ZIP Code *</Label>
                      <Input
                        id="zip_code"
                        name="zip_code"
                        placeholder="90210"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      placeholder="USA"
                      defaultValue="USA"
                    />
                  </div>
                </div>

                {/* Media & Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Media & Features
                  </h3>
                  
                  <div>
                    <Label htmlFor="images">Image URLs (comma-separated)</Label>
                    <Textarea
                      id="images"
                      name="images"
                      placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="virtual_tour_url">Virtual Tour URL</Label>
                    <Input
                      id="virtual_tour_url"
                      name="virtual_tour_url"
                      type="url"
                      placeholder="https://example.com/virtual-tour"
                    />
                  </div>

                  <div>
                    <Label htmlFor="features">Features (comma-separated)</Label>
                    <Textarea
                      id="features"
                      name="features"
                      placeholder="pool, garage, fireplace, hardwood floors, updated kitchen"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? 'Creating Listing...' : 'Create Property Listing'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/listings')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostPropertyPage;