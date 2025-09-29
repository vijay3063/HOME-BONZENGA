import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Shield, 
  Users, 
  CreditCard,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const TermsPage = () => {
  const { t } = useTranslation();

  const sections = [
    {
      icon: Users,
      title: "User Responsibilities",
      content: [
        "You must be at least 18 years old to use our services",
        "You are responsible for providing accurate information during registration",
        "You must treat our beauticians with respect and courtesy",
        "You are responsible for ensuring a safe and appropriate environment for service delivery",
        "You must not reschedule or cancel appointments without reasonable notice"
      ]
    },
    {
      icon: Shield,
      title: "Service Terms",
      content: [
        "All services are provided by certified and insured beauticians",
        "We reserve the right to refuse service if the environment is unsafe",
        "Services must be booked at least 2 hours in advance",
        "We provide all necessary equipment and products for the services",
        "Service quality is guaranteed, and we offer refunds for unsatisfactory services"
      ]
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      content: [
        "Payment is required before service delivery",
        "We accept various payment methods including mobile money and bank transfers",
        "All prices are inclusive of taxes and service charges",
        "Refunds are processed within 5-7 business days",
        "Additional charges may apply for services outside standard hours"
      ]
    },
    {
      icon: Calendar,
      title: "Booking & Cancellation",
      content: [
        "Appointments can be booked through our website or mobile app",
        "Cancellations must be made at least 2 hours before the scheduled time",
        "No-show fees may apply for missed appointments without notice",
        "Rescheduling is allowed up to 2 hours before the appointment",
        "Emergency cancellations will be handled on a case-by-case basis"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Limitations & Disclaimers",
      content: [
        "We are not liable for any allergic reactions to products used",
        "Customers should inform us of any allergies or skin conditions beforehand",
        "We are not responsible for damage to personal property during service",
        "Service availability is subject to beautician availability",
        "We reserve the right to modify these terms at any time"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdf6f0]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#fdf6f0] to-[#f8e8e0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#4e342e] to-[#6d4c41] rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#4e342e] mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-[#6d4c41] leading-relaxed mb-8">
              Please read these terms carefully before using our services. By using Home Bonzenga, 
              you agree to be bound by these terms and conditions.
            </p>
            <div className="text-sm text-[#6d4c41]">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#fdf6f0] to-[#f8e8e0] border-b border-[#f8d7da]/20">
                <CardTitle className="text-2xl font-serif text-[#4e342e]">
                  Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-[#6d4c41] leading-relaxed mb-4">
                  Welcome to Home Bonzenga! These Terms of Service ("Terms") govern your use of our 
                  beauty service platform and mobile application. By accessing or using our services, 
                  you agree to be bound by these Terms.
                </p>
                <p className="text-[#6d4c41] leading-relaxed">
                  If you do not agree to these Terms, please do not use our services. We reserve the 
                  right to modify these Terms at any time, and your continued use of our services 
                  constitutes acceptance of any changes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
                Terms & Conditions
              </h2>
              <p className="text-xl text-[#6d4c41]">
                Important information about using our services
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Card key={index} className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-[#fdf6f0] to-[#f8e8e0] border-b border-[#f8d7da]/20">
                      <CardTitle className="text-xl font-serif text-[#4e342e] flex items-center">
                        <Icon className="w-6 h-6 mr-3" />
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#4e342e] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-[#6d4c41] leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Data */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#fdf6f0] to-[#f8e8e0] border-b border-[#f8d7da]/20">
                <CardTitle className="text-2xl font-serif text-[#4e342e]">
                  Privacy & Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-[#6d4c41] leading-relaxed">
                    We take your privacy seriously and are committed to protecting your personal information. 
                    Our data collection and usage practices are outlined in our Privacy Policy.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#4e342e] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#6d4c41]">We collect only necessary information to provide our services</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#4e342e] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#6d4c41]">Your data is encrypted and stored securely</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#4e342e] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#6d4c41]">We do not sell or share your personal information with third parties</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#4e342e] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#6d4c41]">You have the right to access, modify, or delete your data</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
              Questions About These Terms?
            </h2>
            <p className="text-xl text-[#6d4c41] mb-8">
              If you have any questions about these Terms of Service, please contact us.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-[#4e342e] hover:bg-[#3b2c26] text-white px-8 py-3 rounded-xl"
                onClick={() => window.location.href = '/help'}
              >
                Contact Support
              </Button>
              <Button 
                variant="outline"
                className="border-[#4e342e] text-[#4e342e] hover:bg-[#4e342e] hover:text-white px-8 py-3 rounded-xl"
                onClick={() => window.location.href = '/privacy'}
              >
                Privacy Policy
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
