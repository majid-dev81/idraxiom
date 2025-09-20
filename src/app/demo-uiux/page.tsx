// /src/app/demo-uiux/page.tsx

'use client';

import { motion, Variants } from 'framer-motion';
import { Clipboard, ClipboardCheck, Code, Eye, Feather, FileText, LayoutDashboard, Settings, ShoppingCart, Users } from 'lucide-react';
import React, { useState } from 'react';

// ============================================================================
// Main Page Component
// ============================================================================
export default function UiUxDemoPage() {
  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white">
      {/* IMPROVEMENT: Adjusted vertical padding and gap for better mobile spacing */}
      <main className="container mx-auto px-4 py-16 sm:px-6 md:py-24">
        <div className="flex flex-col items-center gap-20 sm:gap-24 md:gap-32">
          <HeroSection />
          <PrinciplesSection />
          <InteractiveWireframeSection />
          <ColorPaletteSection />
          <CtaSection />
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// 1. Hero Section
// ============================================================================
function HeroSection() {
  return (
    <div className="text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // IMPROVEMENT: Responsive font sizes for the main heading
        className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Modern UI/UX Showcase
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        // IMPROVEMENT: Responsive margin, text size, and max-width for the subheading
        className="mt-4 max-w-md text-base leading-7 text-gray-400 sm:mt-6 sm:max-w-xl sm:text-lg sm:leading-8 md:max-w-2xl"
      >
        An exploration of design principles, interactivity, and aesthetics coming together to create seamless user experiences.
      </motion.p>
    </div>
  );
}

// ============================================================================
// 2. Principles Section
// ============================================================================
const principles = [
  { icon: Eye, title: 'Clarity', description: 'Interfaces should be intuitive and easy to understand, preventing user confusion.' },
  { icon: Feather, title: 'Simplicity', description: 'Reducing clutter and focusing on essential elements enhances usability.' },
  { icon: Code, title: 'Consistency', description: 'A consistent design language across the product builds trust and familiarity.' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2 } 
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100 } 
  },
};

function PrinciplesSection() {
  return (
    <section className="w-full max-w-5xl">
      {/* IMPROVEMENT: Responsive heading font size and margin */}
      <h2 className="mb-10 text-center text-3xl font-bold sm:text-4xl md:mb-12">Core Design Principles</h2>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
      >
        {principles.map((p, i) => (
          // IMPROVEMENT: Responsive padding for the cards
          <motion.div key={i} variants={itemVariants} className="rounded-xl border border-white/10 bg-gray-900/50 p-6 text-center sm:p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
              <p.icon className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-gray-400">{p.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ============================================================================
// 3. Interactive Wireframe Section
// ============================================================================
function InteractiveWireframeSection() {
    return (
        <section className="w-full max-w-4xl">
             {/* IMPROVEMENT: Responsive heading font size */}
             <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                A Living Prototype
            </h2>
            {/* IMPROVEMENT: Responsive paragraph font size and margin */}
            <p className="mb-8 text-center text-base text-gray-400 sm:text-lg md:mb-12">
                Hover over the mockup to see it come to life with fluid animations.
            </p>
            <InteractiveWireframeDemo />
        </section>
    );
}

function InteractiveWireframeDemo() {
  return (
    <>
      <style jsx global>{`
        @keyframes background-glow { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes shimmer { 0%{background-position:-100% 0} 100%{background-position:100% 0} }
      `}</style>
      
      {/* IMPROVEMENT: Responsive padding for the container */}
      <div className="relative w-full rounded-xl bg-gray-900/50 p-4 pt-10 sm:p-6 sm:pt-10 md:p-8 md:pt-12">
        <div 
          className="absolute inset-0 z-0 h-full w-full rounded-2xl"
          style={{
            background: 'linear-gradient(45deg, rgba(0, 114, 255, 0.1), rgba(153, 50, 204, 0.1), rgba(0, 114, 255, 0.1))',
            backgroundSize: '400% 400%',
            animation: 'background-glow 15s ease infinite',
          }}
        />
        <div className="absolute left-4 top-4 flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}
          className="relative z-10 aspect-[16/10] w-full rounded-lg bg-slate-800/80 p-3 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-4"
        >
          {/* IMPROVEMENT: Stacks vertically on mobile, horizontally on larger screens */}
          <div className="flex h-full w-full flex-col gap-3 sm:flex-row sm:gap-4">
            <Sidebar />
            <main className="flex flex-1 flex-col gap-3 sm:gap-4">
              <ContentBox className="flex-1" delay={0.8} />
              <ContentBox className="flex-1" delay={1.0} />
            </main>
          </div>
        </motion.div>
      </div>
    </>
  );
}

// Sub-components for the Wireframe
const sidebarVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { when: 'beforeChildren', staggerChildren: 0.1, delay: 0.3 } },
};
const itemVariantsSidebar: Variants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };

function Sidebar() {
  const iconMap = [LayoutDashboard, ShoppingCart, Users, FileText, Settings];
  return (
    <motion.aside
      variants={sidebarVariants}
      whileHover={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.7))' }}
      // IMPROVEMENT: Full width on mobile, fractional width on larger screens.
      className="w-full rounded-md border border-slate-700 bg-slate-900/50 p-2 transition-all duration-300 sm:w-1/4 sm:p-3"
    >
      <div className="mb-3 h-5 w-1/2 rounded bg-slate-700 sm:mb-4 sm:h-6 sm:w-3/4" />
      {/* IMPROVEMENT: On mobile, sidebar items are horizontal. On larger screens, they stack vertically. */}
      <ul className="flex justify-around sm:flex-col sm:space-y-2">
        {iconMap.map((Icon, i) => (
          <motion.li key={i} variants={itemVariantsSidebar} className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-700">
              <Icon className="h-3 w-3 text-slate-500" />
            </div>
            {/* IMPROVEMENT: Hide text label on mobile to save space */}
            <div className="hidden h-4 w-full rounded bg-slate-700 sm:block" />
          </motion.li>
        ))}
      </ul>
    </motion.aside>
  );
}

function ContentBox({ className, delay }: { className?: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.6))' }}
      className={`rounded-md border border-slate-700 bg-slate-900/50 p-3 transition-all duration-300 sm:p-4 ${className}`}
    >
      <h3 className="mb-2 h-4 w-1/3 rounded bg-slate-700 sm:mb-3 sm:h-5" />
      <div className="space-y-1.5 sm:space-y-2">
        <ShimmerText width="w-full" />
        <ShimmerText width="w-3/4" />
        <ShimmerText width="w-5/6" />
      </div>
      <div className="mt-3 sm:mt-4"><PulseButton /></div>
    </motion.div>
  );
}

function ShimmerText({ width }: { width: string }) {
  return (
    <div className={`h-3 rounded bg-slate-700 sm:h-4 ${width} relative overflow-hidden`}>
      <div className="absolute inset-0 h-full w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)', animation: 'shimmer 2.5s infinite' }} />
    </div>
  );
}

function PulseButton() {
  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.3)", "0 0 0 6px rgba(59, 130, 246, 0)", "0 0 0 0 rgba(59, 130, 246, 0.3)"] }}
      transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
      className="h-7 w-20 rounded bg-blue-600 sm:h-8 sm:w-24"
    ><div className="flex h-full items-center justify-center text-xs font-semibold text-white">Button</div></motion.div>
  );
}


// ============================================================================
// 4. Color Palette Section
// ============================================================================
const colors = [
    { name: 'Primary', hex: '#6D28D9', tailwind: 'violet-700' },
    { name: 'Secondary', hex: '#2563EB', tailwind: 'blue-600' },
    { name: 'Background', hex: '#0A0A0A', tailwind: 'neutral-950' },
    { name: 'Foreground', hex: '#1E1B4B', tailwind: 'indigo-950' },
    { name: 'Accent', hex: '#DB2777', tailwind: 'pink-600' },
];

function ColorPaletteSection() {
    return (
        <section className="w-full max-w-5xl">
            {/* IMPROVEMENT: Responsive heading font size and margin */}
            <h2 className="mb-10 text-center text-3xl font-bold sm:text-4xl md:mb-12">Project Color Palette</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
                {colors.map((color) => (
                    <ColorSwatch key={color.name} name={color.name} hex={color.hex} />
                ))}
            </div>
        </section>
    );
}

function ColorSwatch({ name, hex }: { name: string; hex: string; }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); 
    };

    return (
        <div className="flex flex-col items-center">
            <motion.div 
                whileHover={{ scale: 1.05, y: -5 }} 
                // IMPROVEMENT: Responsive size for color swatches
                className="h-20 w-20 rounded-full border-4 border-white/10 shadow-lg sm:h-24 sm:w-24" 
                style={{ backgroundColor: hex }}
            />
            <div className="mt-4 text-center">
                <p className="font-semibold">{name}</p>
                <button onClick={handleCopy} className="mt-1 flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1 text-sm text-gray-400 transition hover:bg-gray-700">
                    {copied ? <ClipboardCheck className="h-4 w-4 text-green-400" /> : <Clipboard className="h-4 w-4" />}
                    {copied ? 'Copied!' : hex}
                </button>
            </div>
        </div>
    );
}

// ============================================================================
// 5. Call to Action (CTA) Section
// ============================================================================
function CtaSection() {
    return (
        <section className="w-full max-w-2xl text-center">
            {/* IMPROVEMENT: Responsive heading font size */}
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Build Something Amazing?
            </h2>
             {/* IMPROVEMENT: Responsive paragraph font size */}
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-300 sm:mt-6 sm:text-lg sm:leading-8">
                Let&apos;s collaborate to turn your ideas into stunning, high-performance web applications.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6 sm:mt-10">
                 <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-md bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500"
                >
                    Get in Touch
                </motion.button>
            </div>
        </section>
    );
}