import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Briefcase, 
  MapPin, 
  Clock, 
  Star,
  Heart,
  Sparkles,
  TrendingUp,
  Send,
  CheckCircle
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const CareersPage = () => {
  const { t } = useTranslation();
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: ''
  });

  const openPositions = [
    {
      title: "Senior Beautician",
      location: "Kinshasa, DR Congo",
      type: "Full-time",
      experience: "3+ years",
      description: "We're looking for an experienced beautician to join our team and provide exceptional beauty services to our clients.",
      requirements: [
        "Certified beautician with 3+ years of experience",
        "Strong knowledge of beauty treatments and techniques",
        "Excellent customer service skills",
        "Reliable transportation",
        "Flexible schedule availability"
      ]
    },
    {
      title: "Customer Support Representative",
      location: "Remote",
      type: "Full-time",
      experience: "1+ years",
      description: "Join our customer support team to help our clients with their booking and service needs.",
      requirements: [
        "Excellent communication skills in French and English",
        "1+ years of customer service experience",
        "Strong problem-solving abilities",
        "Tech-savvy with CRM systems",
        "Available for flexible hours"
      ]
    },
    {
      title: "Marketing Specialist",
      location: "Kinshasa, DR Congo",
      type: "Full-time",
      experience: "2+ years",
      description: "Help us grow our brand and reach more customers through creative marketing strategies.",
      requirements: [
        "2+ years of digital marketing experience",
        "Proficiency in social media management",
        "Content creation skills",
        "Analytics and reporting experience",
        "Creative thinking and innovation"
      ]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health Insurance",
      description: "Comprehensive health coverage for you and your family"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Opportunities for professional development and advancement"
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Work-life balance with flexible working hours"
    },
    {
      icon: Star,
      title: "Competitive Pay",
      description: "Attractive compensation packages and performance bonuses"
    }
  ];

  const values = [
    "Passion for beauty and customer satisfaction",
    "Professional excellence and continuous learning",
    "Team collaboration and mutual respect",
    "Innovation and creativity in service delivery",
    "Integrity and transparency in all interactions"
  ];

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Application submitted:', applicationForm);
    // Reset form
    setApplicationForm({ 
      name: '', 
      email: '', 
      phone: '', 
      position: '', 
      experience: '', 
      coverLetter: '' 
    });
  };

  return (
    <div className="min-h-screen bg-[#fdf6f0]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#fdf6f0] to-[#f8e8e0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#4e342e] mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-[#6d4c41] leading-relaxed mb-8">
              Be part of the beauty revolution! Join Home Bonzenga and help us bring 
              professional beauty services to people's homes across Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-[#4e342e] hover:bg-[#3b2c26] text-white px-8 py-3 rounded-xl"
                onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Open Positions
              </Button>
              <Button 
                variant="outline"
                className="border-[#4e342e] text-[#4e342e] hover:bg-[#4e342e] hover:text-white px-8 py-3 rounded-xl"
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
                Why Work With Us?
              </h2>
              <p className="text-xl text-[#6d4c41]">
                We offer more than just a job - we offer a career in the beauty industry
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#4e342e] to-[#6d4c41] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#4e342e] mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-[#6d4c41] leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
                Our Company Values
              </h2>
              <p className="text-xl text-[#6d4c41]">
                These values guide everything we do and shape our company culture
              </p>
            </div>
            
            <Card className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {values.map((value, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[#6d4c41] leading-relaxed text-lg">{value}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
                Open Positions
              </h2>
              <p className="text-xl text-[#6d4c41]">
                Explore current job opportunities at Home Bonzenga
              </p>
            </div>
            
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <Card key={index} className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#fdf6f0] to-[#f8e8e0] border-b border-[#f8d7da]/20">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl font-serif text-[#4e342e] mb-2">
                          {position.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-3">
                          <Badge className="bg-[#4e342e] text-white">
                            <MapPin className="w-3 h-3 mr-1" />
                            {position.location}
                          </Badge>
                          <Badge variant="outline" className="border-[#4e342e] text-[#4e342e]">
                            <Briefcase className="w-3 h-3 mr-1" />
                            {position.type}
                          </Badge>
                          <Badge variant="outline" className="border-[#4e342e] text-[#4e342e]">
                            <Clock className="w-3 h-3 mr-1" />
                            {position.experience}
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        className="bg-[#4e342e] hover:bg-[#3b2c26] text-white"
                        onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-[#6d4c41] leading-relaxed mb-6">
                      {position.description}
                    </p>
                    <div>
                      <h4 className="font-semibold text-[#4e342e] mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((requirement, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#4e342e] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-[#6d4c41]">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
                Apply for a Position
              </h2>
              <p className="text-xl text-[#6d4c41]">
                Ready to join our team? Fill out the application form below.
              </p>
            </div>
            
            <Card className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <form onSubmit={handleApplicationSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#4e342e] mb-2">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        value={applicationForm.name}
                        onChange={(e) => setApplicationForm({...applicationForm, name: e.target.value})}
                        className="border-[#f8d7da]/50 focus:border-[#4e342e] rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4e342e] mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={applicationForm.email}
                        onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
                        className="border-[#f8d7da]/50 focus:border-[#4e342e] rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#4e342e] mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={applicationForm.phone}
                        onChange={(e) => setApplicationForm({...applicationForm, phone: e.target.value})}
                        className="border-[#f8d7da]/50 focus:border-[#4e342e] rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4e342e] mb-2">
                        Position Applied For
                      </label>
                      <Input
                        type="text"
                        value={applicationForm.position}
                        onChange={(e) => setApplicationForm({...applicationForm, position: e.target.value})}
                        className="border-[#f8d7da]/50 focus:border-[#4e342e] rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#4e342e] mb-2">
                      Years of Experience
                    </label>
                    <Input
                      type="text"
                      value={applicationForm.experience}
                      onChange={(e) => setApplicationForm({...applicationForm, experience: e.target.value})}
                      className="border-[#f8d7da]/50 focus:border-[#4e342e] rounded-lg"
                      placeholder="e.g., 2 years in beauty industry"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#4e342e] mb-2">
                      Cover Letter
                    </label>
                    <Textarea
                      value={applicationForm.coverLetter}
                      onChange={(e) => setApplicationForm({...applicationForm, coverLetter: e.target.value})}
                      className="border-[#f8d7da]/50 focus:border-[#4e342e] rounded-lg min-h-[120px]"
                      placeholder="Tell us why you want to join Home Bonzenga and what makes you a great fit for this position..."
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#4e342e] to-[#6d4c41] hover:from-[#3b2c26] hover:to-[#5a3520] text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
