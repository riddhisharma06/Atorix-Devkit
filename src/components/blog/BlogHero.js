import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AnimatedBlobBackground from "./AnimatedBlobBackground";

export default function BlogHero() {
  const title = "Our Blog";
  const description = "Stay updated with the latest insights, news, and updates from our team.";
  
  const searchTerms = [
    "SAP S/4 HANA",
    "ECC 6.0",
    "Implementation and Rollout",
    "Advanced Data Analytics",
    "Microsoft Dynamics 365",
    "Cyber Security Services"
  ];
  
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [displayText, setDisplayText] = useState(searchTerms[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    const currentTerm = searchTerms[currentPlaceholder];
    
    const typeEffect = () => {
      if (isDeleting) {
        // Deleting characters
        setDisplayText(prev => prev.slice(0, -1));
        
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentPlaceholder((prev) => (prev + 1) % searchTerms.length);
        }
      } else {
        // Adding characters
        const targetText = searchTerms[currentPlaceholder];
        if (displayText.length < targetText.length) {
          setDisplayText(targetText.slice(0, displayText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      }
    };
    
    const timeout = setTimeout(typeEffect, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPlaceholder, searchTerms]);
  
  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  return (
    <section className="py-16 md:py-24 bg-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      <AnimatedBlobBackground />
      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            {title}
          </h1>
          <div className="relative max-w-2xl mx-auto mb-8">
            <p className="text-lg text-muted-foreground relative z-20">
              {description}
            </p>
          </div>
           {/* Split lines with increased gap at the center and moved further apart */}
          {/* Left half - moved further left */}
          <div className="pointer-events-none absolute top-[55%] left-5 w-[40%] h-1 bg-gradient-to-r from-transparent via-blue-500/45 to-transparent blur-[2px] transform -translate-y-1/2 z-0"></div>
          <div className="pointer-events-none absolute top-[55%] left-5 w-[40%] h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent transform -translate-y-1/2 z-0"></div>
          
          {/* Right half - moved further right */}
          <div className="pointer-events-none absolute top-[55%] right-5 w-[40%] h-1 bg-gradient-to-l from-transparent via-blue-500/45 to-transparent blur-[2px] transform -translate-y-1/2 z-0"></div>
          <div className="pointer-events-none absolute top-[55%] right-5 w-[40%] h-0.5 bg-gradient-to-l from-transparent via-blue-300 to-transparent transform -translate-y-1/2 z-0"></div>
          
          {/* Search Bar */}
          <motion.div 
            className="max-w-md mx-auto mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder={`Search for ${displayText}${showCursor ? '|' : ''}...`}
                className="w-full px-4 py-3 pl-12 pr-4 text-sm bg-white/10 backdrop-blur-sm border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-muted-foreground/70 transition-all duration-300"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
