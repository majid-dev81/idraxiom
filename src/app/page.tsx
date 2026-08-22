// app/page.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // IMPORTED: For client-side navigation
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Users, Timer, BarChart3, PenTool, Network, Lightbulb, Database, ArrowRight, ShieldCheck, Lock, BellRing, ClipboardList } from "lucide-react"; // IMPORTED: ArrowRight icon + ArmLink section icons

// --- ANIMATION VARIANTS ---
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.42, 0, 0.58, 1] as const;

// --- REUSABLE COMPONENTS ---

// Component for sections that animate on scroll
const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: EASE_OUT }}
    className={className}
  >
    {children}
  </motion.div>
);

// Component for headings with a silver gradient effect
const GradientHeading = ({ as: Tag = 'h2', children, className = '' }: { as?: React.ElementType; children: React.ReactNode; className?: string }) => (
  <Tag className={`bg-gradient-to-b from-gray-200 to-gray-500 bg-clip-text text-transparent ${className}`}>
    {children}
  </Tag>
);


// --- MAIN PAGE ---

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white font-sans selection:bg-cyan-400 selection:text-black">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <TechnologiesSection />
        <ServicesSection />
        <ArmLinkSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

// --- PAGE SECTIONS ---

// 1) Navbar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["Home", "About", "Technologies", "Services", "ArmLink", "Contact"];

  const menuVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: { opacity: 1, scaleY: 1, transition: { duration: 0.25, ease: EASE_IN_OUT } },
    exit: { opacity: 0, scaleY: 0, transition: { duration: 0.2, ease: EASE_IN_OUT } },
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0D1117]/80 backdrop-blur-xl border-b border-white/10">
      <nav className="container mx-auto flex items-center justify-between p-4 px-6 md:px-8">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE_OUT }}>
          <a href="#home" className="flex items-center gap-3">
            <Image src="/brand/mark.png" alt="Idraxiom Mark" width={32} height={32} priority />
            <span className="text-2xl font-bold tracking-wider uppercase">IDRAXIOM</span>
          </a>
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.filter(l => l !== "Services").map((link) => (
            <motion.a key={link} href={`#${link.toLowerCase()}`} className="font-light hover:text-cyan-400 transition-colors duration-300" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
              {link}
            </motion.a>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none z-50 relative">
            <motion.div animate={isOpen ? "open" : "closed"}>
              <svg width="24" height="24" viewBox="0 0 24" fill="none">
                <motion.path stroke="currentColor" strokeWidth="2" strokeLinecap="round" variants={{ closed: { d: "M 2 6.5 L 22 6.5" }, open: { d: "M 4 18 L 20 6" } }} />
                <motion.path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M 2 12.5 L 22 12.5" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} transition={{ duration: 0.1 }} />
                <motion.path stroke="currentColor" strokeWidth="2" strokeLinecap="round" variants={{ closed: { d: "M 2 18.5 L 22 18.5" }, open: { d: "M 4 6 L 20 18" } }} />
              </svg>
            </motion.div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="exit" className="md:hidden overflow-hidden origin-top">
            <div className="flex flex-col space-y-2 p-4 pt-0">
               {navLinks.filter(l => l !== "Services").map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-center text-lg p-2 rounded-md hover:bg-white/5 transition-colors" onClick={() => setIsOpen(false)}>
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// 2) Hero Section
const HeroSection = () => {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } } };

  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-radial from-[#111827] to-[#030712]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] max-w-4xl max-h-4xl bg-cyan-500/10 rounded-full blur-3xl"></div>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagon" width="50" height="43.3" patternUnits="userSpaceOnUse">
              <path d="M25 0 L50 14.43 L50 43.3 L25 57.73 L0 43.3 L0 14.43 Z" stroke="#1E3A8A" strokeOpacity="0.1" fill="none" strokeWidth="1"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagon)"></rect>
        </svg>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="z-10 flex flex-col items-center px-4">
        <motion.div variants={itemVariants} className="mb-6 w-4/5 sm:w-1/2 md:w-2/5 lg:w-1/3">
          <Image src="/brand/full-logo.png" alt="Idraxiom Full Logo" width={800} height={175} priority style={{ objectFit: 'contain' }} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <GradientHeading as="h1" className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4">
            AI-Powered Solutions for<br />Modern Businesses
          </GradientHeading>
        </motion.div>
        <motion.p variants={itemVariants} className="max-w-2xl text-lg md:text-xl text-gray-300 font-light mb-8">
          At Idraxiom, we design practical and innovative AI platforms that empower businesses to grow.
        </motion.p>
        <motion.div variants={itemVariants}>
          <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="bg-cyan-500 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
            Contact Us
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

// 3) About Section
const AboutSection = () => (
  <section id="about" className="py-24">
    <div className="container mx-auto px-6 md:px-8">
      <AnimatedSection>
        <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-xl shadow-2xl shadow-black/20 overflow-hidden">
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
          <GradientHeading className="text-3xl md:text-4xl font-bold mb-6 text-center">About Idraxiom Establishment</GradientHeading>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center leading-relaxed font-light">
            Idraxiom Establishment is a Saudi-registered establishment specializing in Artificial Intelligence, Computer Vision, and SaaS solutions. We focus on delivering innovative and practical products that empower businesses to grow.
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

// 4) <<< UPDATED AND REDESIGNED SECTION >>>
const TechnologiesSection = () => {
  const techItems = [
    { icon: BrainCircuit, name: "AI Vision", href: "/demo-vision" },
    { icon: Users, name: "People & Flow Analytics", href: "/demo-flow" },
    { icon: Timer, name: "Queue & Service Monitoring", href: "/demo-queue" },
    { icon: BarChart3, name: "Conversion Insights", href: "/demo-conversion" },
  ];

  return (
    <section id="technologies" className="py-24">
      <div className="container mx-auto text-center px-6 md:px-8">
        <AnimatedSection>
          <GradientHeading className="text-3xl md:text-4xl font-bold mb-16 text-center">Technologies We Master</GradientHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {techItems.map((item) => (
              <motion.div
                key={item.name}
                className="group relative flex flex-col text-center items-center bg-white/5 p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                {/* Content wrapper for z-index and flex layout */}
                <div className="relative z-10 flex flex-col items-center h-full">
                  <item.icon className="w-14 h-14 text-cyan-400 mb-5" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-gray-100 mb-3">{item.name}</h3>

                  {/* "See More" link pushed to the bottom */}
                  <Link href={item.href} className="mt-auto pt-4 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2">
                    See More
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// 5) Services Section
const ServicesSection = () => {
  const serviceItems = [
    {
      icon: PenTool,
      title: "UI/UX Design",
      description: "Crafting intuitive and beautiful user interfaces that enhance user experience and engagement.",
      href: "/demo-uiux",
    },
    {
      icon: Network,
      title: "System Analysis",
      description: "Analyzing and defining system requirements to build robust and scalable software architecture.",
      href: "/demo-system",
    },
    {
      icon: Lightbulb,
      title: "AI Solutions (Lite)",
      description: "Integrating lightweight AI models to automate tasks and provide intelligent insights for your business.",
      href: "/demo-ai",
    },
    {
      icon: Database,
      title: "Big Data & Analytics (Lite)",
      description: "Processing and analyzing large datasets to uncover trends and drive data-informed decisions.",
      href: "/demo",
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#0D1117]">
      <div className="container mx-auto px-6 md:px-8">
        <AnimatedSection>
          <GradientHeading className="text-3xl md:text-4xl font-bold mb-16 text-center">Our Services</GradientHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceItems.map((service) => (
              <motion.div
                key={service.title}
                className="group relative flex flex-col text-center items-center bg-white/5 p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                {/* Content wrapper */}
                <div className="relative z-10 flex flex-col items-center h-full">
                  <service.icon className="w-12 h-12 text-cyan-400 mb-5" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-gray-100 mb-3">{service.title}</h3>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">{service.description}</p>

                  {/* "See More" link pushed to the bottom */}
                  <Link href={service.href} className="mt-auto pt-4 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2">
                    See More
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};


// 6) ArmLink Section — Weapons Storage & Armory Security Monitoring
const ArmLinkSection = () => {
  const capabilities = [
    {
      icon: ShieldCheck,
      title: "Real-Time Inventory Tracking",
      description: "Continuous visibility into every weapon and asset in storage, down to individual rack and case level.",
    },
    {
      icon: Lock,
      title: "Unauthorized Access Detection",
      description: "Instant alerts the moment a restricted armory, cabinet, or storage zone is accessed outside protocol.",
    },
    {
      icon: BellRing,
      title: "Tamper & Theft Alerts",
      description: "Automated notifications for tampering, removal, or movement of monitored items in real time.",
    },
    {
      icon: ClipboardList,
      title: "Audit-Ready Compliance Logs",
      description: "A complete, timestamped chain-of-custody record ready for internal review or regulatory audit.",
    },
  ];

  return (
    <section id="armlink" className="py-24">
      <div className="container mx-auto px-6 md:px-8">
        <AnimatedSection>
          <div className="relative bg-gradient-to-br from-cyan-900/20 to-gray-900/30 border border-white/10 rounded-3xl p-8 md:p-14 max-w-5xl mx-auto shadow-2xl shadow-black/30 overflow-hidden">
            <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center mb-10">
              <div className="mb-6 w-3/5 sm:w-2/5 md:w-1/3 mx-auto">
                <Image
                  src="/brand/armlink-logo.png"
                  alt="ArmLink Logo"
                  width={779}
                  height={407}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3">
                Built for Interior &amp; Defense Sectors
              </span>
              <GradientHeading className="text-3xl md:text-4xl font-bold mb-4">
                Weapons Storage &amp; Armory Security Monitoring
              </GradientHeading>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                ArmLink is Idraxiom&apos;s dedicated platform for securing armories and weapons storage — giving accountable teams a single, real-time view of every asset under their protection.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-cyan-400/50"
                >
                  <cap.icon className="w-8 h-8 text-cyan-400 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-lg font-bold text-gray-100 mb-1">{cap.title}</h3>
                    <p className="text-gray-400 font-light text-sm leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 text-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="bg-cyan-500 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 inline-block hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
              >
                Request a Briefing
              </motion.a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// 7) Contact Section
const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      alert("✅ Your message has been sent successfully");
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error("Form submission error:", error);
      alert("❌ Failed to send message, please try again later");
    }
  };
  
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6 md:px-8">
        <AnimatedSection>
          <GradientHeading className="text-3xl md:text-4xl font-bold text-center mb-12">Get in Touch</GradientHeading>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/20">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 font-light">
                Have a question or want to work together? Send us a message, and we&apos;ll get back to you as soon as possible.
              </p>
              <div className="space-y-4">
                <a href="mailto:contact@idraxiom.com" className="flex items-center text-gray-200 hover:text-cyan-400 transition-colors">
                  <span className="text-cyan-400 mr-3 text-xl">📧</span>
                  <span>contact@idraxiom.com</span>
                </a>
              </div>
              <p className="text-sm text-gray-400 pt-4 border-t border-white/10">
                Official Business Name: Idraxiom Establishment
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                ></textarea>
              </div>
              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                transition={{ type: "spring", stiffness: 400, damping: 15 }} 
                className="w-full bg-cyan-500 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};


// 8) Footer
const Footer = () => (
  <footer className="py-8 border-t border-white/10">
    <div className="container mx-auto text-center text-gray-400 px-6 md:px-8">
      <p className="font-light">&copy; {new Date().getFullYear()} Idraxiom Establishment. All rights reserved.</p>
    </div>
  </footer>
);