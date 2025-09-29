import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import LanguageToggle from '@/components/LanguageToggle';

// Assets
import hero3 from '@/assets/hero3.jpg';
import hero2 from '@/assets/hero2.jpg';
import bridal_makeup from '@/assets/bridal_makeup.jpg';
import makeup1 from '@/assets/makeup1.jpg';
import hair9 from '@/assets/hair9.jpg';
import hair4 from '@/assets/hair4.jpg';
import makeup5 from '@/assets/makeup5.jpg';
import makeup4 from '@/assets/makeup4.jpg';
import spa1 from '@/assets/spa1.jpg';
import spa from '@/assets/spa.jpg';
import spa_product from '@/assets/spa_product.jpg';
import nail from '@/assets/nail.jpg';
import logo from '@/assets/logo.jpg';

// Icons
import { 
  Calendar, 
  MapPin, 
  Clock,
  Mail,
  Phone,
  Shield,
  Award,
  CheckCircle,
  Users,
  Sparkles,
  UserCheck,
  Star,
  ArrowRight,
  Scissors,
  Palette,
  Heart,
  Search,
  Home,
  HelpCircle,
  Building,
  Bell,
  CreditCard
} from 'lucide-react';

const LandingPage = () => {
  const { t, ready } = useTranslation();
  const [email, setEmail] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  // Slider images array using imported assets
  const sliderImages = [
    bridal_makeup,
    hair9,
    hero3,
    hero2,
    makeup1
  ];


  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  // Handle hash navigation for navbar links
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.substring(1); // Remove the # symbol
      if (hash) {
        // Wait a bit for the page to render
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    // Handle initial hash
    handleHashNavigation();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  // Wait for i18n to be ready
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#4e342e]">Loading...</div>
      </div>
    );
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf6f0]">
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center bg-[#fdf6f0] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="space-y-8"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center bg-[#f8d7da]/30 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-[#4e342e] mr-2" />
                  <span className="text-sm font-medium text-[#4e342e]">Premium Beauty Services</span>
                </div>
              </motion.div>

              <motion.h1 
                className="text-4xl lg:text-5xl font-serif font-bold text-[#4e342e] leading-tight"
                variants={fadeInUp}
              >
                {t('home.hero.title')}
              </motion.h1>

              <motion.p 
                className="text-lg text-[#6d4c41] leading-relaxed max-w-lg font-sans"
                variants={fadeInUp}
              >
                {t('home.hero.subtitle')}
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeInUp}
              >
                <Link to="/customer/at-home-services">
                  <Button className="bg-[#4e342e] hover:bg-[#3b2c26] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Home className="w-5 h-5 mr-2" />
                    {t('home.hero.bookAtHome')}
                    </Button>
                  </Link>
                <Link to="/customer/salon-visit">
                  <Button 
                    variant="outline" 
                    className="border-2 border-[#4e342e] text-[#4e342e] hover:bg-[#4e342e] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                  >
                    <Building className="w-5 h-5 mr-2" />
                    {t('home.hero.findSalon')}
                    </Button>
                  </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Image Slider */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Working image slider with auto-rotation */}
                <div className="h-[600px] relative overflow-hidden">
                  {sliderImages.map((imagePath, index) => (
                    <img 
                      key={index}
                      src={imagePath} 
                      alt={`Hero Image ${index + 1}`} 
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => console.log(`Image ${index + 1} loaded successfully`)}
                      onError={(e) => console.error(`Image ${index + 1} failed to load:`, e)}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Navigation dots */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {sliderImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                  className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#4e342e] rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#4e342e] font-serif">Certified</div>
                      <div className="text-xs text-[#6d4c41] font-sans">Professionals</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#4e342e] mb-6">
              {t('home.services.title')}
            </h2>
            <p className="text-xl text-[#6d4c41] max-w-3xl mx-auto font-sans">
              {t('home.services.subtitle')}
            </p>
          </motion.div>

          {/* Two Main Service Blocks */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* At-Home Services */}
            <motion.div variants={fadeInUp}>
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-[#fdf6f0] overflow-hidden rounded-3xl h-full">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={makeup4}
                    alt="At-Home Beauty Services"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10 group-hover:from-black/50 group-hover:to-black/20 transition-all duration-300" />
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-[#4e342e] rounded-2xl flex items-center justify-center shadow-lg">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-serif font-bold text-[#4e342e] mb-4">
                    {t('home.services.atHome.title')}
                  </h3>
                  
                  <p className="text-lg text-[#6d4c41] leading-relaxed mb-6 font-sans">
                    {t('home.services.atHome.description')}
                  </p>
                  
                  <Link to="/customer/at-home-services">
                    <Button className="bg-[#4e342e] hover:bg-[#3b2c26] text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full">
                      {t('home.services.atHome.button')}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Salon Visits */}
            <motion.div variants={fadeInUp}>
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-[#fdf6f0] overflow-hidden rounded-3xl h-full">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={spa_product}
                    alt="Salon Beauty Services"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10 group-hover:from-black/50 group-hover:to-black/20 transition-all duration-300" />
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-[#4e342e] rounded-2xl flex items-center justify-center shadow-lg">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-serif font-bold text-[#4e342e] mb-4">
                    {t('home.services.salon.title')}
                  </h3>
                  
                  <p className="text-lg text-[#6d4c41] leading-relaxed mb-6 font-sans">
                    {t('home.services.salon.description')}
                  </p>
                  
                  <Link to="/customer/salon-visit">
                    <Button className="bg-[#4e342e] hover:bg-[#3b2c26] text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full">
                      {t('home.services.salon.button')}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Service Categories */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: t('home.services.categories.hair.title'),
                description: t('home.services.categories.hair.description'),
                image: hair4,
                icon: Scissors,
              },
              {
                title: t('home.services.categories.face.title'),
                description: t('home.services.categories.face.description'),
                image: spa1,
                icon: Sparkles,
              },
              {
                title: t('home.services.categories.extras.title'),
                description: t('home.services.categories.extras.description'),
                image: nail,
                icon: Heart,
              }
            ].map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-[#fdf6f0] overflow-hidden rounded-2xl">
                  <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Darker overlay for service images */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10 group-hover:from-black/50 group-hover:to-black/20 transition-all duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-[#4e342e] rounded-xl flex items-center justify-center mr-3">
                        <service.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#4e342e]">
                    {service.title}
                      </h3>
                    </div>
                    <p className="text-[#6d4c41] leading-relaxed font-sans text-sm">
                    {service.description}
                  </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#fdf6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#4e342e] mb-6">
              {t('home.howItWorks.title')}
            </h2>
            <p className="text-xl text-[#6d4c41] max-w-3xl mx-auto font-sans">
              {t('home.howItWorks.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                step: '01',
                title: t('home.howItWorks.steps.step1.title'),
                description: t('home.howItWorks.steps.step1.description'),
                icon: Home,
              },
              {
                step: '02',
                title: t('home.howItWorks.steps.step2.title'),
                description: t('home.howItWorks.steps.step2.description'),
                icon: Palette,
              },
              {
                step: '03',
                title: t('home.howItWorks.steps.step3.title'),
                description: t('home.howItWorks.steps.step3.description'),
                icon: Calendar,
              },
              {
                step: '04',
                title: t('home.howItWorks.steps.step4.title'),
                description: t('home.howItWorks.steps.step4.description'),
                icon: UserCheck,
              },
              {
                step: '05',
                title: t('home.howItWorks.steps.step5.title'),
                description: t('home.howItWorks.steps.step5.description'),
                icon: Star,
              }
            ].map((step, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm rounded-2xl h-full">
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      <div className="w-14 h-14 bg-[#4e342e] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <step.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#f8d7da] text-[#4e342e] rounded-full flex items-center justify-center text-xs font-bold font-sans">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-serif font-bold mb-3 text-[#4e342e]">
                      {step.title}
                    </h3>
                    <p className="text-[#6d4c41] leading-relaxed font-sans text-sm">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Bonzenga Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#4e342e] mb-6">
              {t('home.whyChoose.title')}
            </h2>
            <p className="text-xl text-[#6d4c41] max-w-3xl mx-auto font-sans">
              {t('home.whyChoose.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: UserCheck,
                title: t('home.whyChoose.features.verified.title'),
                description: t('home.whyChoose.features.verified.description')
              },
              {
                icon: MapPin,
                title: t('home.whyChoose.features.flexible.title'),
                description: t('home.whyChoose.features.flexible.description')
              },
              {
                icon: CreditCard,
                title: t('home.whyChoose.features.secure.title'),
                description: t('home.whyChoose.features.secure.description')
              },
              {
                icon: Bell,
                title: t('home.whyChoose.features.updates.title'),
                description: t('home.whyChoose.features.updates.description')
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-[#fdf6f0] h-full rounded-2xl">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-[#4e342e] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <feature.icon className="w-8 h-8 text-white" />
                  </div>
                    <h3 className="text-xl font-serif font-bold mb-4 text-[#4e342e]">
                      {feature.title}
                    </h3>
                    <p className="text-[#6d4c41] leading-relaxed font-sans">
                      {feature.description}
                    </p>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* For Beauticians Section */}
      <section id="for-beauticians" className="py-20 bg-[#4e342e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Star className="w-4 h-4 text-white mr-2" />
                <span className="text-sm font-medium font-sans">Career Growth</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
                Grow Your Career with
                <span className="block text-[#f8d7da]">
                  HOME BONZENGA
                </span>
              </h2>

              <p className="text-xl mb-8 text-white/90 leading-relaxed font-sans">
                Work on your schedule, earn more, and connect with verified clients 
                across Congo through our premium beauty platform.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Flexible scheduling that fits your lifestyle',
                  'Verified clients and secure payment system',
                  'Professional development and training support',
                  'Marketing tools to grow your business'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#f8d7da] mr-3 flex-shrink-0" />
                    <span className="text-white/90 font-sans">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register?role=vendor">
                  <Button className="bg-white text-[#4e342e] hover:bg-[#f8d7da] px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-sans">
                    <Users className="w-5 h-5 mr-2" />
                    Become a Beautician
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-2 border-white/50 text-[#4e342e] hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 font-sans"
                >
                  Learn More
                  </Button>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img src={hair4} alt="Hair styling" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img src={spa1} alt="Spa treatment" className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img src={makeup5} alt="Makeup" className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img src={nail} alt="Nail care" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#6d4c41] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {t('home.newsletter.title')}
            </h2>
            <p className="text-lg text-white/80 mb-8 font-sans">
              {t('home.newsletter.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('home.newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-xl font-sans"
              />
              <Button className="bg-[#4e342e] hover:bg-[#3b2c26] px-8 py-3 rounded-xl font-semibold transition-all duration-300 font-sans">
                {t('home.newsletter.button')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;