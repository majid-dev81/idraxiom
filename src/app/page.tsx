// app/page.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Users, Timer, LayoutDashboard, BarChart3 } from "lucide-react";

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
        <ProductsSection />
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
  const navLinks = ["Home", "About", "Technologies", "Products", "Contact"];

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
          {navLinks.map((link) => (
            <motion.a key={link} href={`#${link.toLowerCase()}`} className="font-light hover:text-cyan-400 transition-colors duration-300" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
              {link}
            </motion.a>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none z-50 relative">
            <motion.div animate={isOpen ? "open" : "closed"}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
              {navLinks.map((link) => (
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

// 4) Technologies Section
const TechnologiesSection = () => {
  const techItems = [
    { icon: BrainCircuit, name: "AI Vision" },
    { icon: Users, name: "People & Flow Analytics" },
    { icon: Timer, name: "Queue & Service Monitoring" },
    { icon: LayoutDashboard, name: "Table & Occupancy Tracking" },
    { icon: BarChart3, name: "Conversion Insights" },
  ];

  return (
    <section id="technologies" className="py-24">
      <div className="container mx-auto text-center px-6 md:px-8">
        <AnimatedSection>
          <GradientHeading className="text-3xl md:text-4xl font-bold mb-16 text-center">Technologies We Master</GradientHeading>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
            {techItems.map((item, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col items-center gap-4 bg-white/5 p-6 rounded-xl border border-white/10 transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-cyan-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <item.icon className="w-16 h-16 text-cyan-400" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-gray-200 mt-2 text-center">{item.name}</h3>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// 5) Products Section
const ProductsSection = () => (
  <section id="products" className="py-24">
    <div className="container mx-auto text-center px-6 md:px-8">
      <AnimatedSection>
        <GradientHeading className="text-3xl md:text-4xl font-bold mb-12">Our Flagship Product</GradientHeading>
        <motion.div
          className="bg-gradient-to-br from-cyan-900/30 to-gray-900/30 border border-white/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl shadow-black/30"
          whileHover={{ y: -8, scale: 1.02, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* CHANGE: Replaced previous logo with the full Meeteazy logo */}
          <Image
            src="/brand/meeteazy-logo.png"
            alt="Meeteazy Official Logo"
            width={220}
            height={60} // Adjust height based on your logo's aspect ratio
            className="mx-auto mb-6 h-auto w-56"
          />
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-light">
            Meeteazy is a smart scheduling platform designed to simplify how professionals manage their time, bookings, and client meetings.
          </p>
          {/* CHANGE: Updated button to link to the official site and match theme */}
          <motion.a
            href="https://meeteazy.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="bg-cyan-500 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 inline-block hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
          >
            Learn More
          </motion.a>
        </motion.div>
      </AnimatedSection>
    </div>
  </section>
);

// 6) Contact Section
const ContactSection = () => (
  <section id="contact" className="py-24">
    <div className="container mx-auto px-6 md:px-8">
      <AnimatedSection>
        <GradientHeading className="text-3xl md:text-4xl font-bold text-center mb-12">Get in Touch</GradientHeading>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/20">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 font-light">
              Have a question or want to work together? Send us a message, ... and we&apos;ll get back to you as soon as possible.
            </p>
            <div className="space-y-4">
              <a href="mailto:support@idraxiom.com" className="flex items-center text-gray-200 hover:text-cyan-400 transition-colors">
                <span className="text-cyan-400 mr-3 text-xl">📧</span>
                <span>support@idraxiom.com</span>
              </a>
              <a href="mailto:sales@idraxiom.com" className="flex items-center text-gray-200 hover:text-cyan-400 transition-colors">
                <span className="text-cyan-400 mr-3 text-xl">📧</span>
                <span>sales@idraxiom.com</span>
              </a>
            </div>
            <p className="text-sm text-gray-400 pt-4 border-t border-white/10">
              Official Business Name: Idraxiom Establishment
            </p>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input type="text" id="name" name="name" className="w-full bg-white/5 border border-white/20 rounded-lg py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full bg-white/5 border border-white/20 rounded-lg py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full bg-white/5 border border-white/20 rounded-lg py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"></textarea>
            </div>
            <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="w-full bg-cyan-500 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              Send Message
            </motion.button>
          </form>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

// 7) Footer
const Footer = () => (
  <footer className="py-8 border-t border-white/10">
    <div className="container mx-auto text-center text-gray-400 px-6 md:px-8">
      <p className="font-light">&copy; {new Date().getFullYear()} Idraxiom Establishment. All rights reserved.</p>
    </div>
  </footer>
);