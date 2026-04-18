import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  ArrowRight, 
  Menu, 
  X, 
  Phone, 
  Mail,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  ChevronLeft,
  ChevronRight,
  Home,
  Star,
  Signature,
  KeyRound,
  Waves,
  Trees,
  Sun,
  Lamp,
  SquareParking,
  Warehouse,
  Heart,
  PiggyBank,
  Wallet,
  FileText,
  Lock,
  Play,
  MessageCircle,
  Send,
  Globe,
  MessageSquare,
  Mic,
  Volume2,
  VolumeX,
  Bot,
  User,
  Loader2,
  Sparkles
} from "lucide-react";
import { GoogleGenAI, Modality } from "@google/genai";

// --- Types ---
interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  garage?: number;
  image: string;
  category: string;
  offer: string;
  listings: string;
  featured?: boolean;
}

// --- Mock Data ---
const CITIES = ["All Cities", "Beverly Hills", "Manhattan", "Malibu", "Chicago", "Aspen", "Miami", "Austin"];
const CATEGORIES = ["All Categories", "Villa", "Penthouse", "Manor", "Apartment", "Condo"];
const OFFERS = ["All Offers", "For Sale", "For Rent"];
const LISTINGS = ["All Listings", "Featured", "Recent", "Sold"];

const HERO_DATA = [
  {
    image: "https://i.postimg.cc/GhL209Jt/Chat-GPT-Image-Apr-18-2026-04-35-22-PM.png",
    text: "3 Modern homes for modern thinking people."
  },
  {
    image: "https://i.postimg.cc/QNkQk9dy/Chat-GPT-Image-Apr-18-2026-04-43-46-PM.png",
    text: "4 Modern homes for modern thinking people."
  },
  {
    image: "https://i.postimg.cc/bwv4jfB7/Chat-GPT-Image-Apr-18-2026-04-46-33-PM.png",
    text: "6 Modern homes for modern thinking people."
  }
];

const HERO_IMAGES = HERO_DATA.map(d => d.image);

const PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Country Style House with beautiful garden and terrace",
    price: "$345,000",
    location: "Beverly Hills, CA",
    beds: 9,
    baths: 2,
    sqft: 2561,
    garage: 1,
    image: "https://images.unsplash.com/photo-1580587767073-3fba229f2222?auto=format&fit=crop&q=80&w=800",
    category: "Villa",
    offer: "For Sale",
    listings: "Featured",
    featured: true
  },
  {
    id: "2",
    title: "Country Style House with beautiful garden and terrace",
    price: "$345,000",
    location: "Manhattan, NY",
    beds: 9,
    baths: 2,
    sqft: 2561,
    garage: 1,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800",
    category: "Villa",
    offer: "For Sale",
    listings: "Featured",
    featured: true
  },
  {
    id: "3",
    title: "Country Style House with beautiful garden and terrace",
    price: "$345,000",
    location: "Malibu, CA",
    beds: 9,
    baths: 2,
    sqft: 2561,
    garage: 1,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    category: "Villa",
    offer: "For Sale",
    listings: "Featured",
    featured: true
  },
  {
    id: "4",
    title: "Luxury Modern Beachfront Villa",
    price: "$2,450,000",
    location: "Miami, FL",
    beds: 5,
    baths: 4,
    sqft: 4500,
    garage: 2,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
    category: "Villa",
    offer: "For Sale",
    listings: "Recent"
  },
  {
    id: "5",
    title: "Elegant Penthouse with City View",
    price: "$1,800,000",
    location: "Chicago, IL",
    beds: 3,
    baths: 3,
    sqft: 2800,
    garage: 1,
    image: "https://images.unsplash.com/photo-1567496898905-af413988562f?auto=format&fit=crop&q=80&w=800",
    category: "Penthouse",
    offer: "For Sale",
    listings: "Recent"
  },
  {
    id: "6",
    title: "Cozy Mountain Manor",
    price: "$1,200,000",
    location: "Aspen, CO",
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    garage: 2,
    image: "https://images.unsplash.com/photo-1449156001437-3a145b9aa28a?auto=format&fit=crop&q=80&w=800",
    category: "Manor",
    offer: "For Sale",
    listings: "Recent"
  },
  {
    id: "7",
    title: "Suburban Family House",
    price: "$750,000",
    location: "Austin, TX",
    beds: 4,
    baths: 2.5,
    sqft: 2100,
    garage: 2,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
    category: "Villa",
    offer: "For Sale",
    listings: "Recent"
  },
  {
    id: "8",
    title: "Downtown Austin Apartment",
    price: "$450,000",
    location: "Austin, TX",
    beds: 2,
    baths: 2,
    sqft: 1200,
    garage: 1,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    category: "Apartment",
    offer: "For Sale",
    listings: "Recent"
  },
  {
    id: "9",
    title: "Sunset Strip Penthouse",
    price: "$3,500,000",
    location: "Los Angeles, CA",
    beds: 4,
    baths: 4.5,
    sqft: 5200,
    garage: 2,
    image: "https://images.unsplash.com/photo-1600607687940-c52af04657b3?auto=format&fit=crop&q=80&w=800",
    category: "Penthouse",
    offer: "For Sale",
    listings: "Featured"
  },
  {
    id: "10",
    title: "Greenwich Village Townhouse",
    price: "$5,200,000",
    location: "Manhattan, NY",
    beds: 5,
    baths: 4,
    sqft: 3800,
    garage: 0,
    image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=800",
    category: "Manor",
    offer: "For Sale",
    listings: "Featured"
  },
  {
    id: "11",
    title: "Lakeside Cottage",
    price: "$890,000",
    location: "Chicago, IL",
    beds: 3,
    baths: 2,
    sqft: 1500,
    garage: 1,
    image: "https://images.unsplash.com/photo-1464861723619-a686824f8563?auto=format&fit=crop&q=80&w=800",
    category: "Villa",
    offer: "For Rent",
    listings: "Recent"
  },
  {
    id: "12",
    title: "Modern Loft Apartment",
    price: "$2,500/mo",
    location: "Seattle, WA",
    beds: 1,
    baths: 1,
    sqft: 900,
    garage: 1,
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=800",
    category: "Apartment",
    offer: "For Rent",
    listings: "Recent"
  },
  {
    id: "13",
    title: "Spacious Family Condo",
    price: "$5,000/mo",
    location: "San Francisco, CA",
    beds: 3,
    baths: 2,
    sqft: 1800,
    garage: 1,
    image: "https://images.unsplash.com/photo-1545324418-f1d3ac59ec45?auto=format&fit=crop&q=80&w=800",
    category: "Condo",
    offer: "For Rent",
    listings: "Recent"
  },
  {
    id: "14",
    title: "Executive Penthouse Suite",
    price: "$10,000/mo",
    location: "New York, NY",
    beds: 3,
    baths: 3.5,
    sqft: 3500,
    garage: 2,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
    category: "Penthouse",
    offer: "For Rent",
    listings: "Featured"
  },
  {
    id: "15",
    title: "Charming Country Estate",
    price: "$4,100,000",
    location: "Napa, CA",
    beds: 6,
    baths: 5,
    sqft: 6500,
    garage: 3,
    image: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=800",
    category: "Manor",
    offer: "For Sale",
    listings: "Recent"
  }
];

// --- Components ---

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white border-b border-slate-200 py-3 shadow-md" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className={`text-3xl font-sans tracking-tight font-medium ${isScrolled ? "text-primary" : "text-white"}`}>
            estat<span className="text-accent">e</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-12">
          {["Home", "About Us", "Property", "Developments", "News", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(" ", "")}`} 
              className={`text-[13px] font-medium transition-colors ${isScrolled ? "text-text-muted hover:text-accent" : "text-white/90 hover:text-white"}`}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className={`p-2 transition-colors ${isScrolled ? "text-text-muted hover:text-primary" : "text-white/80 hover:text-white"}`}>
            <Search size={20} />
          </button>
        </div>

        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className={isScrolled ? "text-black" : "text-white"} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-[60] p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-sans font-medium">estat<span className="text-accent">e</span></span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {["Home", "About Us", "Property", "Developments", "News", "Contact"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(" ", "")}`} 
                  className="text-xl font-medium border-b border-gray-100 pb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const socialIcons = [
    { Icon: Facebook, href: "#" },
    { Icon: Linkedin, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Youtube, href: "#" },
    { Icon: Instagram, href: "#" },
  ];

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src={HERO_DATA[currentImage].image} 
              alt="Luxury Architecture" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-sans font-medium text-white leading-tight">
                {HERO_DATA[currentImage].text}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-6">
        {socialIcons.map(({ Icon, href }, idx) => (
          <motion.a
            key={idx}
            href={href}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-300"
          >
            <Icon size={18} />
          </motion.a>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {HERO_DATA.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            className={`h-2 transition-all duration-500 rounded-full ${currentImage === idx ? "w-10 bg-white" : "w-2 bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}

interface PropertyCardProps {
  property: Property;
}

function PropertyCard({ property }: PropertyCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full min-w-[350px]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4">
          <button className="w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-red-500 rounded-full flex items-center justify-center transition-all duration-300">
            <Heart size={20} className="stroke-2" />
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-[17px] font-bold text-primary mb-3 leading-snug line-clamp-2 min-h-[50px]">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1.5 text-text-muted text-xs">
            <MapPin size={14} className="text-accent" />
            <span className="font-semibold">{property.location.split(',')[0]}</span>
          </div>
          <div className="flex items-center gap-1.5 text-text-muted text-xs">
            <Search size={14} className="text-accent transform rotate-45" />
            <span className="font-semibold underline">Show on Map</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 py-4 border-y border-slate-100 mb-6">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Lot Size</span>
            <div className="flex items-center gap-1">
              <Square size={14} className="text-slate-400" />
              <span className="text-xs font-bold text-primary">{property.sqft} sqft</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Beds</span>
            <div className="flex items-center gap-1">
              <Bed size={14} className="text-slate-400" />
              <span className="text-xs font-bold text-primary">{property.beds}</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Baths</span>
            <div className="flex items-center gap-1">
              <Bath size={14} className="text-slate-400" />
              <span className="text-xs font-bold text-primary">{property.baths}</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Garage</span>
            <div className="flex items-center gap-1">
              <Warehouse size={14} className="text-slate-400" />
              <span className="text-xs font-bold text-primary">{property.garage || 0}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="text-[11px] font-bold text-slate-400 mb-0.5">{property.offer}</div>
            <div className="text-2xl font-bold text-primary">{property.price}</div>
          </div>
          <button className="px-6 py-3 border border-slate-200 rounded-md text-xs font-bold tracking-wider text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
            View Property
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Stats() {
  return (
    <section className="py-24 bg-primary text-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Under Management", value: "$4.8B+" },
            { label: "Exclusive Listings", value: "250+" },
            { label: "Global Offices", value: "14" },
            { label: "Client Satisfaction", value: "99%" }
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">{stat.value}</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      Icon: PiggyBank,
      title: "No Downpayment",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    },
    {
      Icon: Wallet,
      title: "All Cash Offer",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    },
    {
      Icon: FileText,
      title: "Experts in Your Corner",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    },
    {
      Icon: Lock,
      title: "Locked in Pricing",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    }
  ];

  return (
    <section id="services" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="h-[1px] w-12 bg-[#f06292]/40" />
          <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#f06292]">Our Services</span>
          <div className="h-[1px] w-12 bg-[#f06292]/40" />
        </div>
        <h2 className="text-4xl md:text-5xl font-sans font-medium text-primary text-center mb-24">
          The smartest way to buy a home
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {services.map((service, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="w-20 h-20 mb-10 text-[#f06292] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <service.Icon size={80} strokeWidth={0.8} />
              </div>
              <h3 className="text-xl font-medium text-primary mb-6">{service.title}</h3>
              <p className="text-text-muted text-[15px] leading-relaxed max-w-[280px] mx-auto">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationExperience() {
  const images = [
    { src: "https://picsum.photos/seed/location1/800/600", label: "Surroundings" },
    { src: "https://picsum.photos/seed/location2/800/600", label: "Interior Design" },
    { src: "https://picsum.photos/seed/location3/800/600", label: "Community Pool" },
    { src: "https://picsum.photos/seed/location4/800/600", label: "Views" },
  ];

  return (
    <section id="location" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-1.5 h-8 bg-accent" />
          <h2 className="text-3xl font-bold tracking-tight text-primary uppercase">Location</h2>
        </div>

        <div className="relative mb-12 group cursor-pointer overflow-hidden rounded-sm">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000" 
            alt="Aerial View" 
            className="w-full aspect-[21/9] object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="w-24 h-24 bg-accent/90 rounded-full flex items-center justify-center text-white shadow-2xl transform transition-all duration-300 group-hover:scale-110">
              <Play size={40} className="fill-white ml-1" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {images.map((img, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-full aspect-video rounded-sm overflow-hidden mb-6 shadow-md border border-slate-100">
                <img 
                  src={img.src} 
                  alt={img.label} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-sm font-medium text-primary tracking-wide">{img.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsAppButton() {
  return (
    <a 
      href="https://wa.me/918072117912" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-10 left-10 z-[100] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 animate-bounce"
    >
      <MessageCircle size={32} />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
      </span>
    </a>
  );
}

function GreenBanner() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#689f38]/90 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" 
          alt="Green Banner BG" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-white">
          <h2 className="text-4xl md:text-6xl font-sans font-bold mb-4 tracking-tight">Find Best Place For Leaving</h2>
          <p className="text-xl opacity-90">Find Best Place For Leaving</p>
        </div>
        <button 
          onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-10 py-5 bg-black text-white font-bold text-sm tracking-[0.2em] uppercase hover:bg-slate-900 transition-all duration-300"
        >
          GET IN TOUCH
        </button>
      </div>
    </section>
  );
}

function ContactSection() {
  const contactInfo = [
    { Icon: MapPin, title: "Address", content: "198 West 21th Street, Suite 721 New York NY 10016" },
    { Icon: Phone, title: "Contact Number", content: "+91 8072117912" },
    { Icon: Mail, title: "Email Address", content: "info@yoursite.com" },
    { Icon: Globe, title: "Website", content: "yoursite.com" },
  ];

  return (
    <section id="contact-form" className="py-32 px-6 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#3b82f6] mb-4 block">CONTACT</span>
          <h2 className="text-5xl font-bold text-primary mb-8">Contact Me</h2>
          <p className="max-w-xl mx-auto text-text-muted leading-relaxed">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-4 space-y-6">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="bg-white p-8 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-start gap-6 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-slate-50 rounded-sm flex items-center justify-center text-[#3b82f6] group-hover:bg-[#3b82f6] group-hover:text-white transition-colors duration-300">
                  <info.Icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-2 text-lg">{info.title}</h4>
                  <p className="text-text-muted text-sm leading-relaxed">{info.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form Side */}
          <div className="lg:col-span-8 bg-white p-10 md:p-16 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full p-4 border border-slate-100 bg-[#fcfcfc] rounded-sm focus:outline-none focus:border-[#3b82f6] focus:bg-white transition-all text-sm"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full p-4 border border-slate-100 bg-[#fcfcfc] rounded-sm focus:outline-none focus:border-[#3b82f6] focus:bg-white transition-all text-sm"
                />
              </div>
              <input 
                type="text" 
                placeholder="Subject" 
                className="w-full p-4 border border-slate-100 bg-[#fcfcfc] rounded-sm focus:outline-none focus:border-[#3b82f6] focus:bg-white transition-all text-sm"
              />
              <textarea 
                rows={6} 
                placeholder="Message" 
                className="w-full p-4 border border-slate-100 bg-[#fcfcfc] rounded-sm focus:outline-none focus:border-[#3b82f6] focus:bg-white transition-all text-sm resize-none"
              ></textarea>
              <button 
                type="submit"
                className="px-12 py-5 bg-[#4e73df] text-white font-bold rounded-sm shadow-lg hover:bg-[#375ad1] transition-all duration-300 tracking-wider text-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function AIAgent() {
  const BUDGET_OPTIONS = [
    "Less than Rs. 50L",
    "Rs. 50 Lakh - Rs. 75 Lakh",
    "Rs. 75 Lakh - Rs. 1 Cr",
    "Rs. 1 Cr - Rs. 1.50 Cr",
    "Rs. 1.5 Cr - Rs. 2 Cr",
    "Rs. 2 Cr - Rs. 2.5 Cr"
  ];

  const LOCATION_OPTIONS = [
    "Chennai",
    "Coimbatore",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Dubai"
  ];

  const PROJECT_OPTIONS: Record<string, string[]> = {
    "Coimbatore": [
      "Estate Alpine (Apartments) at Saravanampatti, Coimbatore",
      "Estate Colosseum at Avarampalayam, Coimbatore"
    ],
    "Chennai": [
      "Estate Marina at ECR, Chennai",
      "Estate Zenith at OMR, Chennai"
    ],
    "Bangalore": [
      "Estate Silicon at Whitefield, Bangalore",
      "Estate Gardenia at Sarjapur, Bangalore"
    ]
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: 'Good evening. Welcome to Estate Luxury helpdesk. Our projects cover luxury, mid-range, and affordable categories, meeting the needs of different customers. Please select your preferred budget range for the property' }
  ]);
  const [currentOptions, setCurrentOptions] = useState<string[]>(BUDGET_OPTIONS);
  const [step, setStep] = useState<'budget' | 'location' | 'project' | 'scheduling' | 'form' | 'chat'>('budget');
  const [bookingData, setBookingData] = useState({
    budget: '',
    location: '',
    project: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    secondaryPhone: '',
    address: '',
    designation: ''
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioContext) {
      setAudioContext(new (window.AudioContext || (window as any).webkitAudioContext)());
    }
  };

  const playPCM = async (base64Data: string) => {
    if (!audioContext) return;
    
    try {
      const binaryString = window.atob(base64Data);
      const len = binaryString.length;
      const bytes = new Int16Array(len / 2);
      for (let i = 0; i < len; i += 2) {
        bytes[i / 2] = (binaryString.charCodeAt(i + 1) << 8) | binaryString.charCodeAt(i);
      }

      const float32Data = new Float32Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        float32Data[i] = bytes[i] / 32768.0;
      }

      const audioBuffer = audioContext.createBuffer(1, float32Data.length, 24000);
      audioBuffer.getChannelData(0).set(float32Data);

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    } catch (err) {
      console.error("Error playing audio:", err);
    }
  };

  const speakText = async (text: string) => {
    if (!isVoiceEnabled) return;
    initAudio();

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: `Say naturally: ${text.substring(0, 500)}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Zephyr' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        await playPCM(base64Audio);
      }
    } catch (err) {
      console.error("TTS failed:", err);
    }
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user' as const, text: textToSend }];
    setMessages(newMessages);
    setInput("");

    // Handle Guided Steps
    if (step === 'budget') {
      setBookingData(prev => ({ ...prev, budget: textToSend }));
      setIsLoading(true);
      setTimeout(() => {
        const nextMsg = "We have our projects at the following locations, what would you prefer?";
        setMessages(prev => [...prev, { role: 'ai', text: nextMsg }]);
        setCurrentOptions(LOCATION_OPTIONS);
        setStep('location');
        setIsLoading(false);
        if (isVoiceEnabled) speakText(nextMsg);
      }, 800);
      return;
    }

    if (step === 'location') {
      setBookingData(prev => ({ ...prev, location: textToSend }));
      setIsLoading(true);
      setTimeout(() => {
        const nextMsg = "We are pleased to inform you that our projects are situated in few strategic locations, what would you prefer?";
        const projects = PROJECT_OPTIONS[textToSend] || [
          `Estate Legacy in ${textToSend}`,
          `Estate Horizon in ${textToSend}`
        ];
        setMessages(prev => [...prev, { role: 'ai', text: nextMsg }]);
        setCurrentOptions(projects);
        setStep('project');
        setIsLoading(false);
        if (isVoiceEnabled) speakText(nextMsg);
      }, 800);
      return;
    }

    if (step === 'project') {
      setBookingData(prev => ({ ...prev, project: textToSend }));
      setIsLoading(true);
      setTimeout(() => {
        const nextMsg = `Excellent choice. ${textToSend} is one of our flagship developments. When would you like to schedule a visit? Please select a preferred date and time.`;
        setMessages(prev => [...prev, { role: 'ai', text: nextMsg }]);
        setCurrentOptions([]);
        setStep('scheduling');
        setIsLoading(false);
        if (isVoiceEnabled) speakText(nextMsg);
      }, 800);
      return;
    }

    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const propertiesContext = PROPERTIES.slice(0, 10).map(p => 
        `- ${p.title} in ${p.location}, ${p.price}, ${p.beds} beds, ${p.baths} baths, ${p.category}.`
      ).join('\n');

      const systemInstruction = `
        You are an elite real estate assistant for "Estate". 
        Be professional, helpful, and sophisticated.
        Here are some properties we have:
        ${propertiesContext}
        Answer questions based on these properties or general real estate advice.
        Keep responses concise (max 3 sentences).
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: textToSend,
        config: { systemInstruction }
      });

      const aiResponse = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      
      if (isVoiceEnabled) {
        speakText(aiResponse);
      }
    } catch (error) {
      console.error("AI Chat failed:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Service temporarily unavailable. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <>
      {/* Floating Agent Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-10 right-10 z-[100] w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-500 overflow-hidden group ${
          isOpen ? 'bg-primary rotate-90' : 'bg-gradient-to-tr from-[#3b82f6] to-[#60a5fa] hover:scale-110'
        }`}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X className="text-white" /> : <Bot className="text-white" size={28} />}
        
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-600 border-2 border-white"></span>
          </span>
        )}
      </button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-28 right-6 md:right-10 z-[100] w-[90vw] md:w-[400px] h-[600px] bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col border border-slate-100 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-primary to-slate-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Sparkles size={20} className="text-blue-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none mb-1">Estate AI</h3>
                  <div className="flex items-center gap-1.5 opacity-80">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-medium uppercase tracking-widest">Always Active</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    initAudio();
                    setIsVoiceEnabled(!isVoiceEnabled);
                  }}
                  className={`p-2 rounded-full transition-colors ${isVoiceEnabled ? 'bg-white/10 text-white' : 'text-white/40'}`}
                >
                  {isVoiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                      msg.role === 'user' ? 'bg-blue-600' : 'bg-primary'
                    }`}>
                      {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
                    </div>
                    <div className={`p-4 rounded-[18px] text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-100' 
                        : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}

              {step === 'scheduling' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Visit Date</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Preferred Time</label>
                    <select
                      onChange={(e) => setBookingData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-primary transition-all"
                    >
                      <option value="">Select Time Slot</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                    </select>
                  </div>
                  <button
                    disabled={!bookingData.date || !bookingData.time}
                    onClick={() => {
                      setStep('form');
                      const nextMsg = "Please provide your contact information to finalize the site visit request.";
                      setMessages(prev => [...prev, 
                        { role: 'user', text: `Scheduled for ${bookingData.date} at ${bookingData.time}` },
                        { role: 'ai', text: nextMsg }
                      ]);
                      if (isVoiceEnabled) speakText(nextMsg);
                    }}
                    className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    Continue to Contact Info
                  </button>
                </motion.div>
              )}

              {step === 'form' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4"
                >
                  <h4 className="text-sm font-bold text-center text-slate-800">Please enter your contact information</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                    />
                    <div className="flex gap-2">
                      <div className="w-24 p-3 bg-slate-50 border border-slate-100 rounded-xl text-center text-sm flex items-center justify-center gap-1">
                        <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5" referrerPolicy="no-referrer" /> +91
                      </div>
                      <input
                        type="tel"
                        placeholder="Primary Phone"
                        onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                        className="flex-1 p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Secondary Phone Number"
                      onChange={(e) => setBookingData(prev => ({ ...prev, secondaryPhone: e.target.value }))}
                      className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                    />
                    <textarea
                      placeholder="Address"
                      rows={2}
                      onChange={(e) => setBookingData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-primary resize-none"
                    />
                    <input
                      type="text"
                      placeholder="Designation / Profession"
                      onChange={(e) => setBookingData(prev => ({ ...prev, designation: e.target.value }))}
                      className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    disabled={!bookingData.name || !bookingData.phone || !bookingData.address || !bookingData.designation}
                    onClick={() => {
                      const finalMsg = `Thank you, ${bookingData.name}. Your site visit for ${bookingData.project} has been requested for ${bookingData.date} at ${bookingData.time}. We will contact you shortly.`;
                      
                      // Submit to WhatsApp
                      const whatsappText = `*New Site Visit Inquiry*%0A%0A*Project:* ${bookingData.project}%0A*Budget:* ${bookingData.budget}%0A*Location:* ${bookingData.location}%0A*Slot:* ${bookingData.date} at ${bookingData.time}%0A%0A*Customer Details:*%0A*Name:* ${bookingData.name}%0A*Phone:* ${bookingData.phone}%0A*Secondary:* ${bookingData.secondaryPhone || 'N/A'}%0A*Address:* ${bookingData.address}%0A*Profession:* ${bookingData.designation}`;
                      window.open(`https://wa.me/918072117912?text=${whatsappText}`);

                      setMessages(prev => [...prev, { role: 'ai', text: finalMsg }]);
                      setStep('chat');
                      if (isVoiceEnabled) speakText(finalMsg);
                    }}
                    className="w-full py-3.5 bg-[#fcc419] text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    Submit & Finalize
                  </button>
                </motion.div>
              )}

              {step !== 'chat' && step !== 'scheduling' && step !== 'form' && !isLoading && (
                <div className="flex flex-wrap gap-2 justify-center mt-4 pb-2">
                  {currentOptions.map((opt, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleSend(opt)}
                      className="px-4 py-2 border-2 border-slate-800 bg-white text-primary text-[11px] font-bold rounded-md hover:bg-slate-50 transition-all hover:-translate-y-1 active:scale-95 shadow-sm"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-[18px] rounded-tl-none border border-slate-100 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-primary" />
                    <span className="text-xs text-slate-400 font-medium">Assistant is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-slate-100">
              <div className="relative flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about properties..."
                    className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border border-slate-100 rounded-full text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                  />
                  <button 
                    onClick={startListening}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
                      isListening ? 'bg-red-100 text-red-500 scale-110' : 'text-slate-400 hover:text-primary'
                    }`}
                  >
                    <Mic size={18} className={isListening ? 'animate-pulse' : ''} />
                  </button>
                </div>
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="bg-primary text-white p-3.5 rounded-full hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg shadow-blue-100"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="mt-3 text-[10px] text-center text-slate-400 font-medium uppercase tracking-widest">Powered by Gemini AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  const socialIcons = [
    { Icon: Facebook, href: "#" },
    { Icon: Linkedin, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Youtube, href: "#" },
    { Icon: Instagram, href: "#" },
  ];

  return (
    <footer id="contact" className="bg-[#313144] text-[#8e8e9e] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-8">
              <span className="text-3xl font-sans tracking-tight font-medium text-white">
                estat<span className="text-accent">e</span>
              </span>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-8 uppercase text-[13px] tracking-widest text-white">COMPANY</h4>
            <ul className="flex flex-col gap-4">
              {["About Us", "Offices", "Contact Us"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors text-[15px]">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase text-[13px] tracking-widest text-white">LEGAL</h4>
            <ul className="flex flex-col gap-4">
              {["Documents", "How to buy a house", "Terms & Condition"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors text-[15px]">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase text-[13px] tracking-widest text-white">SOCIAL</h4>
            <div className="flex gap-4">
              {socialIcons.map(({ Icon, href }, idx) => (
                <a key={idx} href={href} className="w-8 h-8 rounded-full border border-[#8e8e9e]/30 flex items-center justify-center hover:border-white hover:text-white transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-[#8e8e9e]/10 flex justify-center">
          <p className="text-[14px]">
            Copyright ©2026 All rights reserved | This template is made with <Heart size={14} className="inline mx-1 fill-[#8e8e9e]" /> by <a href="#" className="text-accent hover:underline">Colorlib</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FilterSection() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="search" className="relative z-30 py-20 px-6 bg-slate-bg">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-10 rounded-sm shadow-2xl border border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Row 1 */}
            <input 
              type="text" 
              placeholder="Keyword" 
              className="w-full p-4 border border-slate-200 rounded-sm focus:outline-none focus:border-accent font-medium text-sm text-text-muted"
            />
            <select className="w-full p-4 border border-slate-200 rounded-sm focus:outline-none focus:border-accent font-medium text-sm text-text-muted appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTIgMSIgc3Ryb2tlPSIjOTY5Njk2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_1.5rem_center] bg-no-repeat">
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="w-full p-4 border border-slate-200 rounded-sm focus:outline-none focus:border-accent font-medium text-sm text-text-muted appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTIgMSIgc3Ryb2tlPSIjOTY5Njk2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_1.5rem_center] bg-no-repeat">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="w-full p-4 border border-slate-200 rounded-sm focus:outline-none focus:border-accent font-medium text-sm text-text-muted appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTIgMSIgc3Ryb2tlPSIjOTY5Njk2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_1.5rem_center] bg-no-repeat">
              {OFFERS.map(c => <option key={c}>{c}</option>)}
            </select>

            {/* Row 2 */}
            <select className="w-full p-4 border border-slate-200 rounded-sm focus:outline-none focus:border-accent font-medium text-sm text-text-muted appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTIgMSIgc3Ryb2tlPSIjOTY5Njk2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_1.5rem_center] bg-no-repeat">
              {LISTINGS.map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="w-full p-4 border border-slate-200 rounded-sm focus:outline-none focus:border-accent font-medium text-sm text-text-muted appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTIgMSIgc3Ryb2tlPSIjOTY5Njk2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_1.5rem_center] bg-no-repeat">
              <option>Bedrooms</option>
              {[1,2,3,4,5].map(n => <option key={n}>{n}+</option>)}
            </select>
            <select className="w-full p-4 border border-slate-200 rounded-sm focus:outline-none focus:border-accent font-medium text-sm text-text-muted appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTIgMSIgc3Ryb2tlPSIjOTY5Njk2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_1.5rem_center] bg-no-repeat">
              <option>Bathrooms</option>
              {[1,2,3,4,5].map(n => <option key={n}>{n}+</option>)}
            </select>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-center h-2 bg-slate-100 rounded-full relative items-center">
                  <div className="absolute left-0 right-1/2 h-full bg-[#927259]/60" />
                  <div className="absolute left-0 w-4 h-4 bg-[#927259] rounded-sm cursor-pointer shadow-md" />
                  <div className="absolute right-1/2 w-4 h-4 bg-[#927259] rounded-sm cursor-pointer shadow-md" />
                </div>
                <div className="text-[11px] font-bold text-slate-800 text-center">120 sq. ft - 460 sq. ft</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-center h-2 bg-slate-100 rounded-full relative items-center">
                  <div className="absolute left-1/4 right-0 h-full bg-[#927259]/60" />
                  <div className="absolute left-1/4 w-4 h-4 bg-[#927259] rounded-sm cursor-pointer shadow-md" />
                  <div className="absolute right-0 w-4 h-4 bg-[#927259] rounded-sm cursor-pointer shadow-md" />
                </div>
                <div className="text-[11px] font-bold text-slate-800 text-center">848 mil - 1300 mil</div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showMore && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 overflow-hidden"
              >
                <select className="w-full p-4 border border-slate-200 rounded-sm focus:outline-none focus:border-accent font-medium text-sm text-text-muted appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTIgMSIgc3Ryb2tlPSIjOTY5Njk2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_1.5rem_center] bg-no-repeat">
                  <option>All Types</option>
                </select>
                <select className="w-full p-4 border border-slate-200 rounded-sm focus:outline-none focus:border-accent font-medium text-sm text-text-muted appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTIgMSIgc3Ryb2tlPSIjOTY5Njk2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_1.5rem_center] bg-no-repeat">
                  <option>All Actions</option>
                </select>
                <select className="w-full p-4 border border-slate-200 rounded-sm focus:outline-none focus:border-accent font-medium text-sm text-text-muted appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTIgMSIgc3Ryb2tlPSIjOTY5Njk2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_1.5rem_center] bg-no-repeat">
                  <option>All City</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center">
            <button 
              onClick={() => setShowMore(!showMore)}
              className="text-[11px] font-bold text-primary hover:text-accent transition-colors flex items-center gap-2"
            >
              {showMore ? "- LESS FILTERS" : "+ MORE FILTERS"}
            </button>
            <button className="px-12 py-5 bg-[#927259] text-white rounded-sm font-bold tracking-widest text-sm hover:bg-[#7e604b] transition-all duration-300">
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AmenitiesBar() {
  const amenities = [
    { Icon: Signature, label: "Easy Buying" },
    { Icon: KeyRound, label: "Ready to Move" },
    { Icon: MapPin, label: "Great Location" },
    { Icon: Waves, label: "Community Pool" },
    { Icon: Trees, label: "30% Park" },
    { Icon: Sun, label: "Sunny Location" },
    { Icon: Lamp, label: "Modern Design" },
    { Icon: SquareParking, label: "Parking Spaces" },
    { Icon: Warehouse, label: "Garage Included" },
  ];

  return (
    <section className="bg-white py-12 border-b border-slate-100 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4 flex-wrap lg:flex-nowrap">
        {amenities.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3 group flex-1">
            <div className="w-12 h-12 flex items-center justify-center text-slate-400 group-hover:text-accent transition-all duration-300 transform group-hover:scale-110">
              <item.Icon size={32} strokeWidth={1} />
            </div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-text-muted group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const filteredProperties = activeCategory === "All" 
    ? PROPERTIES 
    : PROPERTIES.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* WhatsApp Floating Button */}
        <WhatsAppButton />

        {/* Hero Section */}
        <Hero />

        {/* Amenities Bar */}
        <AmenitiesBar />

        {/* Search/Filter Section */}
        <FilterSection />

        {/* Featured Listings */}
        <section id="property" className="py-24 max-w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-accent mb-2 block">Our Collection</span>
                <h2 className="text-4xl font-bold text-primary tracking-tight">Featured Listings</h2>
              </div>
              
              <div className="flex gap-4">
                <a href="#" className="text-accent font-bold text-sm hover:underline">View all 248 properties &rarr;</a>
              </div>
            </div>
          </div>

          <div className="px-6 scrollbar-hide">
            <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory">
              {PROPERTIES.map((property) => (
                <div key={property.id} className="snap-center">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="px-10 py-5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all text-xs tracking-widest uppercase">
              Browse More Listings
            </button>
          </div>
        </section>

        {/* Narrative Section */}
        <section id="aboutus" className="py-24 bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
            <div className="w-full h-full border-l border-white translate-x-1/2 rotate-12" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-[24px] overflow-hidden relative z-10">
                <img 
                  src="https://picsum.photos/seed/realestate-lifestyle/1200/900" 
                  alt="Luxury lifestyle" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[3px] text-accent mb-6 block">Our Experience</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-[1.2]">We find your next <br />sanctuary in the <br />heart of the city.</h2>
              <p className="text-white/60 mb-10 leading-relaxed font-medium">
                Experience the pinnacle of luxury with our exclusive property collection. We provide unparalleled real estate services to the world's most discerning clients. Our expertise spans luxury sales, rentals, and portfolio management.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <h4 className="font-bold text-lg mb-2">Heritage</h4>
                  <p className="text-xs text-white/40 leading-relaxed">Two decades of connecting extraordinary properties with exceptional people.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Advisory</h4>
                  <p className="text-xs text-white/40 leading-relaxed">Beyond transactions—we provide white-glove transition and advisory services.</p>
                </div>
              </div>
              <button className="px-10 py-4 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-300 text-xs font-bold uppercase tracking-widest">
                Our Signature Service
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center mb-10">
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-accent text-accent" />
                ))}
              </div>
            </div>
            <div className="max-w-3xl mx-auto">
              <blockquote className="text-2xl md:text-3xl font-bold text-primary mb-10 leading-[1.4] tracking-tight">
                "The team didn't just find us a house; they found us a piece of art that we call home. Their attention to detail and market intuition is simply peerless in the luxury space."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                  <img src="https://picsum.photos/seed/person1/100/100" alt="Client" referrerPolicy="no-referrer" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-primary uppercase tracking-wider">Julian Vane</p>
                  <p className="text-[11px] font-bold text-text-muted">MANAGING DIRECTOR</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Properties Grid */}
        <section className="py-24 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-accent mb-2 block">Premium Gallery</span>
              <h2 className="text-4xl font-bold text-primary tracking-tight">Luxury Destinations</h2>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <ChevronLeft size={20} />
              </button>
              <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="px-6">
            <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
              {[...PROPERTIES, ...PROPERTIES.slice(0, 5)].map((property, idx) => (
                <div key={`${property.id}-${idx}`} className="snap-center min-w-[320px] md:min-w-[400px]">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Experience Section */}
        <LocationExperience />

        {/* Services Section */}
        <Services />

        {/* Simple CTA */}
        <section className="relative py-40 px-6 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#2dd4bf]/40 z-10 mix-blend-multiply" />
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
              alt="Consultant Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-20 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-sans font-medium text-white mb-10 tracking-tight leading-tight">
                Ask our top consultants for an personalized offer today.
              </h2>
              <div className="flex justify-center">
                <button className="px-12 py-5 border-2 border-white text-white font-medium hover:bg-white hover:text-accent transition-all duration-300 text-sm uppercase tracking-[0.2em]">
                  CALL +91 8072117912
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* New Green Banner */}
        <GreenBanner />

        {/* Contact Section */}
        <ContactSection />

        {/* AI Agent Section */}
        <AIAgent />
      </main>

      <Footer />
    </div>
  );
}
