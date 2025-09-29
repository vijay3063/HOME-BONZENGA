import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock,
  HelpCircle,
  ChevronDown,
  Send
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const HelpPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      question: "How do I book a beauty service?",
      answer: "You can book a service by visiting our 'At-Home Services' page, selecting your desired service, and following the booking process. You'll be able to choose your preferred date and time."
    },
    {
      question: "What areas do you serve?",
      answer: "We currently serve major cities in DR Congo, including Kinshasa, Lubumbashi, and Goma. We're continuously expanding our service areas."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 24 hours in advance to ensure availability. However, same-day bookings may be possible depending on beautician availability."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including mobile money, bank transfers, and cash payments. All payments are processed securely."
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule your appointment up to 2 hours before your scheduled time through your dashboard or by contacting our support team."
    },
    {
      question: "Are your beauticians certified and insured?",
      answer: "Yes, all our beauticians are professionally certified and insured. We verify their credentials and conduct background checks before they join our platform."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "We strive for 100% customer satisfaction. If you're not happy with your service, please contact our support team within 24 hours and we'll work to resolve the issue."
    },
    {
      question: "Do you provide beauty products and equipment?",
      answer: "Yes, our beauticians bring all necessary professional-grade products and equipment to your location. You don't need to provide anything."
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      contact: "+243 123 456 789",
      availability: "Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "support@homebonzenga.com",
      availability: "24/7"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Available on our website",
      availability: "Mon-Fri: 9AM-7PM"
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fdf6f0]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#fdf6f0] to-[#f8e8e0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#4e342e] mb-6">
              Help & Support
            </h1>
            <p className="text-xl text-[#6d4c41] leading-relaxed mb-8">
              We're here to help! Find answers to common questions or get in touch with our support team.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6d4c41] w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for help topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-12 text-lg border-[#f8d7da]/50 focus:border-[#4e342e] rounded-xl font-sans bg-white shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-[#6d4c41]">
              Choose your preferred way to contact us
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#4e342e] to-[#6d4c41] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#4e342e] mb-3">
                      {method.title}
                    </h3>
                    <p className="text-[#6d4c41] mb-4">
                      {method.description}
                    </p>
                    <div className="text-[#4e342e] font-semibold mb-2">
                      {method.contact}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-[#6d4c41]">
                      <Clock className="w-4 h-4" />
                      {method.availability}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-[#6d4c41]">
                Find quick answers to common questions
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-[#f8d7da]/30 rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 bg-gradient-to-r from-[#fdf6f0] to-[#f8e8e0] hover:no-underline">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#4e342e] flex-shrink-0" />
                      <span className="text-left font-medium text-[#4e342e]">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-white">
                    <p className="text-[#6d4c41] leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            {filteredFAQs.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-[#6d4c41] mx-auto mb-4" />
                <p className="text-xl font-semibold text-[#4e342e] mb-2">No results found</p>
                <p className="text-[#6d4c41]">Try searching with different keywords or contact our support team.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4e342e] mb-6">
                Send us a Message
              </h2>
              <p className="text-xl text-[#6d4c41]">
                Can't find what you're looking for? Send us a message and we'll get back to you.
              </p>
            </div>
            
            <Card className="border border-[#f8d7da]/30 bg-gradient-to-br from-white to-[#fdf6f0] shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#4e342e] mb-2">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
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
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="border-[#f8d7da]/50 focus:border-[#4e342e] rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#4e342e] mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      className="border-[#f8d7da]/50 focus:border-[#4e342e] rounded-lg"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#4e342e] mb-2">
                      Message
                    </label>
                    <Textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="border-[#f8d7da]/50 focus:border-[#4e342e] rounded-lg min-h-[120px]"
                      placeholder="Please describe your question or issue in detail..."
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#4e342e] to-[#6d4c41] hover:from-[#3b2c26] hover:to-[#5a3520] text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
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

export default HelpPage;
