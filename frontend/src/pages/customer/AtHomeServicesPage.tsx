import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Home, 
  Scissors, 
  Sparkles, 
  Heart, 
  Clock, 
  DollarSign, 
  Search,
  ArrowRight,
  Star,
  MapPin,
  Phone
} from 'lucide-react';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

interface SelectedService extends Service {
  quantity: number;
}

const AtHomeServicesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [services, setServices] = useState<{ [key: string]: Service[] }>({});
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const mockData = await import('@/mockData/customers.json');
      setServices(mockData.default.services.atHome);
    } catch (error) {
      console.error('Error loading services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { key: 'all', label: 'All Services', icon: Home },
    { key: 'hair', label: 'Hair Styling', icon: Scissors },
    { key: 'face', label: 'Facial Treatment', icon: Sparkles },
    { key: 'extras', label: 'Nail Care', icon: Heart }
  ];

  const addToCart = (service: Service) => {
    const existingService = selectedServices.find(s => s.id === service.id);
    if (existingService) {
      setSelectedServices(prev => 
        prev.map(s => 
          s.id === service.id 
            ? { ...s, quantity: s.quantity + 1 }
            : s
        )
      );
    } else {
      setSelectedServices(prev => [...prev, { ...service, quantity: 1 }]);
    }
    toast.success(`${service.name} added to cart`);
  };

  const removeFromCart = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
    toast.success('Service removed from cart');
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }
    setSelectedServices(prev => 
      prev.map(s => 
        s.id === serviceId 
          ? { ...s, quantity }
          : s
      )
    );
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, service) => total + (service.price * service.quantity), 0);
  };

  const getTotalDuration = () => {
    return selectedServices.reduce((total, service) => total + (service.duration * service.quantity), 0);
  };

  const filteredServices = () => {
    let allServices: Service[] = [];
    
    if (selectedCategory === 'all') {
      allServices = Object.values(services).flat();
    } else {
      allServices = services[selectedCategory] || [];
    }

    if (searchTerm) {
      allServices = allServices.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return allServices;
  };

  const proceedToBooking = () => {
    if (selectedServices.length === 0) {
      toast.error('Please select at least one service');
      return;
    }
    
    // Store selected services in session storage for the booking flow
    sessionStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    navigate('/customer/booking-confirmation');
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="text-[#4e342e] text-xl">Loading services...</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#4e342e] mb-4">
            At-Home Beauty Services
          </h1>
          <p className="text-lg text-[#6d4c41]">
            Professional beauty services delivered to your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Services Section */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.key}
                      variant={selectedCategory === category.key ? "default" : "outline"}
                      className={`flex items-center gap-2 ${
                        selectedCategory === category.key
                          ? "bg-[#4e342e] text-white"
                          : "border-[#4e342e] text-[#4e342e] hover:bg-[#4e342e] hover:text-white"
                      }`}
                      onClick={() => setSelectedCategory(category.key)}
                    >
                      <Icon className="w-4 h-4" />
                      {category.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices().map((service) => (
                <Card key={service.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-serif text-[#4e342e]">
                        {service.name}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-[#fdf6f0] text-[#4e342e]">
                        {service.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#6d4c41] mb-4">{service.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-[#6d4c41]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {service.duration} min
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {service.price.toLocaleString()} CDF
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-[#4e342e] hover:bg-[#3b2c26] text-white"
                      onClick={() => addToCart(service)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredServices().length === 0 && (
              <div className="text-center py-12">
                <Home className="w-16 h-16 text-[#6d4c41] mx-auto mb-4" />
                <p className="text-xl font-semibold text-[#4e342e] mb-2">No services found</p>
                <p className="text-[#6d4c41]">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-[#4e342e]">
                  Selected Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedServices.length === 0 ? (
                  <p className="text-[#6d4c41] text-center py-4">
                    No services selected
                  </p>
                ) : (
                  <div className="space-y-4">
                    {selectedServices.map((service) => (
                      <div key={service.id} className="border-b border-[#fdf6f0] pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-[#4e342e]">{service.name}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(service.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            ×
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-[#6d4c41] mb-2">
                          <span>{service.price.toLocaleString()} CDF</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(service.id, service.quantity - 1)}
                              className="w-6 h-6 p-0"
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{service.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(service.id, service.quantity + 1)}
                              className="w-6 h-6 p-0"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-sm font-medium text-[#4e342e]">
                          Total: {(service.price * service.quantity).toLocaleString()} CDF
                        </div>
                      </div>
                    ))}

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6d4c41]">Total Duration:</span>
                        <span className="font-medium text-[#4e342e]">{getTotalDuration()} min</span>
                      </div>
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-[#4e342e]">Total Price:</span>
                        <span className="text-[#4e342e]">{getTotalPrice().toLocaleString()} CDF</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-[#4e342e] hover:bg-[#3b2c26] text-white mt-4"
                      onClick={proceedToBooking}
                    >
                      Proceed to Booking
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AtHomeServicesPage;
