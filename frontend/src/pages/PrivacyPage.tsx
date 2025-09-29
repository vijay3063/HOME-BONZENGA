import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Eye, 
  Lock, 
  Database,
  UserCheck,
  Globe,
  Mail,
  Phone
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const PrivacyPage = () => {
  const { t } = useTranslation();

  const dataTypes = [
    {
      icon: UserCheck,
      title: "Personal Information",
      description: "Name, email address, phone number, and profile information you provide during registration."
    },
    {
      icon: Globe,
      title: "Location Data",
      description: "Your address and location information to provide services at your preferred location."
    },
    {
      icon: Database,
      title: "Service History",
      description: "Records of your bookings, preferences, and service history to improve your experience."
    },
    {
      icon: Eye,
      title: "Usage Information",
      description: "How you interact with our platform, including pages visited and features used."
    }
  ];

  const dataUsage = [
    {
      icon: Shield,
      title: "Service Delivery",
      description: "To connect you with beauticians and provide the services you request."
    },
    {
      icon: Mail,
      title: "Communication",
      description: "To send you booking confirmations, updates, and important service information."
    },
    {
      icon: Lock,
      title: "Security",
      description: "To verify your identity and protect against fraud and unauthorized access."
    },
    {
      icon: Database,
      title: "Improvement",
      description: "To analyze usage patterns and improve our services and user experience."
    }
  ];

  const rights = [
    "Access your personal data and receive a copy of the information we hold about you",
    "Correct any inaccurate or incomplete personal information",
    "Request deletion of your personal data (subject to legal and operational requirements)",
    "Object to the processing of your personal data for certain purposes",
    "Request restriction of processing in certain circumstances",
    "Data portability - receive your data in a structured, machine-readable format",
    "Withdraw consent for data processing where consent is the legal basis"
  ];

  return (
    <div className="min-h-screen bg-[#fdf6f0]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#fdf6f0] to-[#f8e8e0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#4e342e] to-[#6d4c41] rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#4e342e] mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-[#6d4c41] leading-relaxed mb-8">
              Your privacy is important to us. This Privacy Policy explains how we collect, 
              use, and protect your personal information when you use our services.
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
                  Our Commitment to Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-[#6d4c41] leading-relaxed mb-4">
                  At Home Bonzenga, we are committed to protecting your privacy and ensuring the security 
                  of your personal information. This Privacy Policy describes how we collect, use, disclose, 
                  and safeguard your information when you use our beauty service platform.
                </p>
                <p className="text-[#6d4c41] leading-relaxed">
                  By using our services, you consent to the data practices described in this policy. 
                  We encourage you to read this Privacy Policy carefully and contact us if you have any questions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Information We Collect */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
                Information We Collect
              </h2>
              <p className="text-xl text-[#6d4c41]">
                We collect information to provide and improve our services
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {dataTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <Card key={index} className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#4e342e] to-[#6d4c41] rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-serif font-bold text-[#4e342e] mb-3">
                            {type.title}
                          </h3>
                          <p className="text-[#6d4c41] leading-relaxed">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How We Use Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
                How We Use Your Information
              </h2>
              <p className="text-xl text-[#6d4c41]">
                We use your information to provide and improve our services
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {dataUsage.map((usage, index) => {
                const Icon = usage.icon;
                return (
                  <Card key={index} className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#4e342e] to-[#6d4c41] rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-serif font-bold text-[#4e342e] mb-3">
                            {usage.title}
                          </h3>
                          <p className="text-[#6d4c41] leading-relaxed">
                            {usage.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#fdf6f0] to-[#f8e8e0] border-b border-[#f8d7da]/20">
                <CardTitle className="text-2xl font-serif text-[#4e342e] flex items-center">
                  <Lock className="w-6 h-6 mr-3" />
                  Data Protection & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-[#6d4c41] leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal 
                    information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#4e342e] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#6d4c41]">All data is encrypted in transit and at rest</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#4e342e] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#6d4c41]">Access to personal data is restricted to authorized personnel only</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#4e342e] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#6d4c41]">Regular security audits and updates are performed</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#4e342e] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#6d4c41]">We use secure cloud infrastructure with industry-standard protections</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
                Your Privacy Rights
              </h2>
              <p className="text-xl text-[#6d4c41]">
                You have certain rights regarding your personal information
              </p>
            </div>
            
            <Card className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {rights.map((right, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#4e342e] to-[#6d4c41] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-[#6d4c41] leading-relaxed">{right}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-[#f8d7da]/20 rounded-lg">
                  <p className="text-[#6d4c41] text-sm">
                    <strong>Note:</strong> To exercise any of these rights, please contact us at 
                    <a href="mailto:privacy@homebonzenga.com" className="text-[#4e342e] hover:underline ml-1">
                      privacy@homebonzenga.com
                    </a>
                  </p>
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
              Questions About Privacy?
            </h2>
            <p className="text-xl text-[#6d4c41] mb-8">
              If you have any questions about this Privacy Policy or our data practices, please contact us.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3 p-4 bg-[#f8d7da]/20 rounded-lg">
                <Mail className="w-5 h-5 text-[#4e342e]" />
                <span className="text-[#6d4c41]">privacy@homebonzenga.com</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-[#f8d7da]/20 rounded-lg">
                <Phone className="w-5 h-5 text-[#4e342e]" />
                <span className="text-[#6d4c41]">+243 123 456 789</span>
              </div>
            </div>
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
                onClick={() => window.location.href = '/terms'}
              >
                Terms of Service
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
