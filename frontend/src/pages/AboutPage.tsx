import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Users, 
  Award, 
  Target,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const AboutPage = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Heart,
      title: "Quality & Excellence",
      description: "We deliver premium beauty services with the highest standards of quality and professionalism."
    },
    {
      icon: Users,
      title: "Customer-Centric",
      description: "Our customers are at the heart of everything we do. We prioritize their satisfaction and comfort."
    },
    {
      icon: Award,
      title: "Professional Expertise",
      description: "Our team consists of certified beauticians with years of experience in the beauty industry."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We continuously innovate to bring you the latest beauty trends and techniques."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Professional Beauticians" },
    { number: "50+", label: "Partner Salons" },
    { number: "99%", label: "Customer Satisfaction" }
  ];

  const features = [
    "Professional beauticians with verified credentials",
    "Flexible scheduling to fit your lifestyle",
    "Premium beauty products and equipment",
    "Safe and hygienic service delivery",
    "24/7 customer support",
    "Competitive pricing with transparent costs"
  ];

  return (
    <div className="min-h-screen bg-[#fdf6f0]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#fdf6f0] to-[#f8e8e0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#4e342e] mb-6">
              About Home Bonzenga
            </h1>
            <p className="text-xl text-[#6d4c41] leading-relaxed mb-8">
              We're revolutionizing the beauty industry by bringing professional beauty services 
              directly to your doorstep. Our mission is to make beauty accessible, convenient, 
              and luxurious for everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-[#4e342e] hover:bg-[#3b2c26] text-white px-8 py-3 rounded-xl"
                onClick={() => window.location.href = '/at-home-services'}
              >
                Book a Service
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline"
                className="border-[#4e342e] text-[#4e342e] hover:bg-[#4e342e] hover:text-white px-8 py-3 rounded-xl"
                onClick={() => window.location.href = '/#contact'}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#4e342e] mb-2">
                  {stat.number}
                </div>
                <div className="text-[#6d4c41] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
                Our Mission & Vision
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#fdf6f0] to-[#f8e8e0] border-b border-[#f8d7da]/20">
                  <CardTitle className="text-2xl font-serif text-[#4e342e] flex items-center">
                    <Target className="w-6 h-6 mr-3" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-[#6d4c41] leading-relaxed">
                    To democratize beauty services by making professional beauty treatments 
                    accessible, convenient, and affordable for everyone. We believe that 
                    everyone deserves to look and feel their best, regardless of their 
                    schedule or location.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#fdf6f0] to-[#f8e8e0] border-b border-[#f8d7da]/20">
                  <CardTitle className="text-2xl font-serif text-[#4e342e] flex items-center">
                    <Star className="w-6 h-6 mr-3" />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-[#6d4c41] leading-relaxed">
                    To become the leading platform for on-demand beauty services across 
                    Africa, creating a network of skilled professionals who can deliver 
                    exceptional beauty experiences right to our customers' homes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-[#6d4c41] max-w-2xl mx-auto">
              These values guide everything we do and shape our commitment to excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#4e342e] to-[#6d4c41] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#4e342e] mb-3">
                      {value.title}
                    </h3>
                    <p className="text-[#6d4c41] leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
                Why Choose Home Bonzenga?
              </h2>
              <p className="text-xl text-[#6d4c41]">
                We're committed to providing you with the best beauty experience possible.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[#6d4c41] leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
