"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Palette, 
  Code, 
  Megaphone, 
  BarChart, 
  Users, 
  Database, 
  Settings, 
  Cpu, 
  Cloud, 
  Server, 
  Box, 
  Globe, 
  Shield, 
  Zap,
  Briefcase,
  ClipboardCheck,
  BarChart2,
  FileText,
  Calendar,
  Search,
  ShoppingCart,
  Smartphone
} from 'lucide-react';
import ExpandableCard from '@/components/ui/ExpandableCard';
import { usePathname } from 'next/navigation';

// Helper function to get icon based on service name
const getIconForService = (serviceName) => {
  const iconMap = {
    'SAP S/4HANA': Database,
    'SAP BTP': Cloud,
    'SAP B1': Server,
    'SAP FICO': BarChart,
    'SAP MM': Box,
    'SAP SD': Globe,
    'SAP Security': Shield,
    'SAP HANA': Cpu,
    'SAP SuccessFactors': Users,
    'SAP Analytics Cloud': BarChart,
    'SAP Integration Suite': Code,
    'SAP Extension Suite': Code,
    'SAP Fiori': Palette,
    'SAP UI5': Code,
    'SAP Cloud Platform': Cloud,
    'SAP Leonardo': Zap,
    'SAP Ariba': ShoppingCart,
    'SAP Concur': Briefcase,
    'SAP Fieldglass': ClipboardCheck,
    'SAP Qualtrics': BarChart2,
    'SAP BW/4HANA': Database,
    'SAP Data Intelligence': Cpu,
    'SAP Data Warehouse Cloud': Database,
  };
  
  return iconMap[serviceName] || Settings; // Default to Settings icon if no match found
};

// Mock data
const heroData = {
  services: {
    tagline: "Our Services",
    title: "OUR SERVICES",
    description: "From implementation to support, our range of services covers all aspects of SAP to help you achieve your digital transformation goals.",
    cards: [
      {
        id: 1,
        title: "SAP S/4HANA",
        color: "bg-gradient-to-br from-purple-500 to-purple-700",
        details: {
          description: "Next-generation ERP suite that transforms your business processes with intelligent automation and real-time insights.",
          features: ["Digital Core Implementation", "Migration Services", "Process Optimization", "Real-time Analytics"],
        }
      },
      {
        id: 2,
        title: "SAP BTP",
        color: "bg-gradient-to-br from-blue-500 to-blue-700",
        details: {
          description: "Business Technology Platform that connects data, processes, and people to accelerate digital transformation.",
          features: ["Integration Platform", "Extension Development", "Data & Analytics", "AI/ML Services"],
        }
      },
      {
        id: 3,
        title: "SAP B1",
        color: "bg-gradient-to-br from-orange-500 to-red-600",
        details: {
          description: "Comprehensive business management solution designed specifically for small and medium enterprises.",
          features: ["Financial Management", "Sales & CRM", "Inventory Control", "Reporting & Analytics"],
        }
      },
      {
        id: 4,
        title: "SAP FICO",
        color: "bg-gradient-to-br from-green-500 to-emerald-600",
        details: {
          description: "Financial accounting and controlling module that provides complete financial management capabilities.",
          features: ["General Ledger", "Accounts Payable/Receivable", "Cost Center Accounting", "Financial Reporting"],
        }
      },
      {
        id: 5,
        title: "SAP Consulting", 
        color: "bg-gradient-to-br from-indigo-500 to-purple-600",
        details: {
          description: "Expert SAP consulting services to guide your digital transformation journey and optimize business processes.",
          features: ["Implementation Strategy", "Process Optimization", "Change Management", "Training & Support"],
        }
      }
    ]
  }
};

export default function HeroSection() {
  const { tagline, title, description, cards } = heroData.services;
  const [hoveredCard, setHoveredCard] = useState(null);
  const pathname = usePathname();

  return (
    <section className="min-h-[70vh] py-16 md:py-24 relative bg-white dark:bg-black overflow-hidden">
      {/* Subtle animated background */}
      {/* Enhanced glassmorphism background with gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/8 to-indigo-500/8 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-cyan-500/6 to-blue-600/6 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-blue-600/6 to-sky-500/6 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/4 to-cyan-400/4 rounded-full filter blur-3xl opacity-30 dark:opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 h-full">
        {/* Mobile View - ExpandableCard */}
        <div className="lg:hidden flex flex-col items-center justify-center min-h-[70vh] space-y-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center w-full"
          >
            <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-md shadow-lg shadow-blue-900/15 px-4 py-2 text-sm font-medium text-white mb-6">
              <motion.span 
                className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              {tagline}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white tracking-tight">
              {title}
            </h1>
            
            <p className="text-base text-gray-300 mb-8 leading-relaxed">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-2xl space-y-4"
          >
            {cards.map((card, index) => (
              <ExpandableCard
                key={card.id}
                title={card.title}
                description={card.details.description}
                icon={getIconForService(card.title)}
                defaultOpen={index === 0}
                className="bg-white/5 backdrop-blur-md border border-white/10"
              >
                <ul className="space-y-2 mt-2">
                  {card.details.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-300">
                      <ArrowRight className="h-3 w-3 mr-2 text-blue-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </ExpandableCard>
            ))}
          </motion.div>
        </div>

        {/* Desktop View - Original Layout */}
        <div className="hidden lg:flex flex-col lg:flex-row gap-8 items-start h-full pl-20">
          
          {/* Left Side - Content */}
          <motion.div
            className="relative overflow-hidden"
            style={{ width: '100%' }}
            initial={false}
            animate={{ width: hoveredCard !== null ? '0%' : '50%' }}
            transition={{ type: 'spring', stiffness: 120, damping: 25, mass: 0.8 }}
          >
            <motion.div
              key="main-content"
              initial="visible"
              animate={{
                opacity: hoveredCard !== null ? 0 : 1,
                x: hoveredCard !== null ? -20 : 0,
                filter: hoveredCard !== null ? "blur(1px)" : "blur(0px)"
              }}
              transition={{ 
                type: 'spring',
                stiffness: 100,
                damping: 20,
                mass: 0.6
              }}
              style={{ 
                pointerEvents: hoveredCard !== null ? 'none' : 'auto',
                marginRight: 'auto',
                paddingLeft: '0',
                paddingRight: '1.5rem',
                maxWidth: '100%',
                width: '100%',
                boxSizing: 'border-box'
              }}
              className="pt-12 pr-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.1,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
                className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-md shadow-lg shadow-blue-900/15 px-4 py-2 text-sm font-medium text-white mb-6"
              >
                <motion.span 
                  className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {tagline}
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
                className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight"
              >
                {title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
                className="text-lg text-gray-300 mb-8 leading-relaxed"
              >
                {description}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right Side - Cards */}
          <motion.div 
            className="relative h-[70vh] overflow-visible -ml-8"
            style={{ width: '100%' }}
            initial={false}
            animate={{ width: hoveredCard !== null ? '100%' : '50%' }}
            transition={{ type: 'spring', stiffness: 120, damping: 25, mass: 0.8 }}
          >
            <div className="flex flex-nowrap gap-3 h-full items-center pr-0 overflow-visible transition-all duration-300 ease-out" style={{
              justifyContent: hoveredCard !== null ? 'center' : 'flex-end'
            }}>
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ 
                    opacity: 0, 
                    y: 50,
                    rotateY: -15
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    x: hoveredCard !== null && hoveredCard > index ? -5 : 
                       hoveredCard !== null && hoveredCard < index ? 5 : 0
                  }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                    mass: 0.6
                  }}
                  className="group relative flex-shrink-0 overflow-visible transform-gpu"
                  style={{ 
                    zIndex: hoveredCard === index ? 100 : 10 - index,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform'
                  }}
                  onMouseEnter={() => {
                    setHoveredCard(index);
                  }}
                  onMouseLeave={() => {
                    setHoveredCard(null);
                  }}
                >
                  <motion.div
                    layout
                    animate={{
                      width: hoveredCard === index ? 520 : 120,
                      height: 480,
                      scale: hoveredCard !== null && hoveredCard !== index ? 0.95 : 1,
                      opacity: hoveredCard !== null && hoveredCard !== index ? 0.7 : 1,
                    }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 100,
                      damping: 20,
                      mass: 0.6
                    }}
                    className="bg-gradient-to-br from-black/30 to-black/20 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900/30 cursor-pointer relative overflow-hidden border border-blue-300/15 hover:border-blue-200/30 will-change-transform"
                  >
                    {/* Glassmorphism inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-2xl"></div>
                    
                    {/* Background image for first card */}
                    {index === 0 && (
                      <>
                        <div 
                          className="absolute inset-0 bg-cover bg-center rounded-2xl"
                          style={{
                            backgroundImage: 'url(https://res.cloudinary.com/deni4qbla/image/upload/v1757746274/The-10-Biggest-Technology-Trends-That-Will-Transform-The-Next-Decade_kd5zio.jpg)'
                          }}
                        >
                          <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-blue-900/70 via-blue-900/50 to-transparent rounded-b-2xl"></div>
                      </>
                    )}
                    
                    {/* Background image for second card */}
                    {index === 1 && (
                      <>
                        <div 
                          className="absolute inset-0 bg-cover bg-center rounded-2xl"
                          style={{
                            backgroundImage: 'url(https://res.cloudinary.com/deni4qbla/image/upload/v1757746640/loi-ich-cua-SAP_nsfvdy.webp)'
                          }}
                        >
                          <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-900/70 via-blue-800/50 to-transparent rounded-b-2xl" style={{ height: '45%' }}></div>
                      </>
                    )}

                    {/* Background image for third card */}
                    {index === 2 && (
                      <>
                        <div 
                          className="absolute inset-0 bg-cover bg-center rounded-2xl"
                          style={{
                            backgroundImage: 'url(https://res.cloudinary.com/deni4qbla/image/upload/v1757661617/90983c0228417c6649e48be1b3ceefe9_bjzkal.jpg)'
                          }}
                        >
                          <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-900/70 via-blue-800/50 to-transparent rounded-b-2xl" style={{ height: '65%' }}></div>
                      </>
                    )}
                    
                    {/* Background image for fourth card */}
                    {index === 3 && (
                      <>
                        <div 
                          className="absolute inset-0 bg-cover bg-center rounded-2xl"
                          style={{
                            backgroundImage: 'url(https://res.cloudinary.com/deni4qbla/image/upload/v1757746821/strapi-assets-tech_a34b41e7f9_kcehed.jpg)'
                          }}
                        >
                          <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-900/80 via-blue-800/50 to-transparent rounded-b-2xl" style={{ height: '80%' }}></div>
                      </>
                    )}
                    
                    {/* Background image for fifth card */}
                    {index === 4 && (
                      <>
                        <div 
                          className="absolute inset-0 bg-cover bg-center rounded-2xl"
                          style={{
                            backgroundImage: 'url(https://res.cloudinary.com/deni4qbla/image/upload/v1757747156/digital_technology_background_modern_silhouette_3d_design_6837527_cvachc.jpg)'
                          }}
                        >
                          <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-900/90 via-blue-800/60 to-transparent rounded-b-2xl" style={{ height: '90%' }}></div>
                      </>
                    )}
                    
                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col">
                      
                      {/* Vertical title for collapsed state */}
                      {hoveredCard !== index && (
                        <motion.div
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <motion.h3 
                            className="text-sm font-bold text-white whitespace-nowrap drop-shadow-lg"
                            style={{ transform: "rotate(90deg)" }}
                          >
                            {card.title}
                          </motion.h3>
                        </motion.div>
                      )}

                      {/* Expanded content */}
                      {hoveredCard === index && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3,
                            delay: 0.1,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="space-y-4">
                            <motion.h4 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                duration: 0.3,
                                delay: 0.15,
                                ease: [0.4, 0, 0.2, 1]
                              }}
                              className="text-white font-bold text-xl drop-shadow-lg"
                            >
                              {card.title}
                            </motion.h4>
                            
                            <motion.p 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                duration: 0.3,
                                delay: 0.2,
                                ease: [0.4, 0, 0.2, 1]
                              }}
                              className="text-white/90 text-sm leading-relaxed drop-shadow-md"
                            >
                              {card.details.description}
                            </motion.p>
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                              duration: 0.3,
                              delay: 0.25,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                            className="space-y-3"
                          >
                            <h5 className="text-white font-semibold text-sm drop-shadow-md">Key Features:</h5>
                            <ul className="space-y-2">
                              {card.details.features.map((feature, i) => (
                                <motion.li 
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ 
                                    duration: 0.2,
                                    delay: 0.3 + (i * 0.05),
                                    ease: [0.4, 0, 0.2, 1]
                                  }}
                                  className="text-white/80 text-xs flex items-center gap-2 drop-shadow-sm"
                                >
                                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/70 shadow-lg" />
                                  {feature}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}