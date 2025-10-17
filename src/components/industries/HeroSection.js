import React, { useRef, useEffect, useState } from 'react';

const TwistedWireRing = () => {
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLaptopView, setIsLaptopView] = useState(false);

  // Check for dark theme and screen size
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
                     window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkTheme(isDark);
    };

    const checkScreenSize = () => {
      setIsLaptopView(window.innerWidth <= 1024 && window.innerWidth >= 1024);
    };

    checkTheme();
    checkScreenSize();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addListener(checkTheme);

    // Listen for window resize
    window.addEventListener('resize', checkScreenSize);

    return () => {
      observer.disconnect();
      mediaQuery.removeListener(checkTheme);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Add keyframes for the pulsing animation
  const pulseKeyframes = `
    @keyframes pulse {
      0% {
        transform: translateY(-50%) scale(1);
        opacity: 0.3;
      }
      100% {
        transform: translateY(-50%) scale(1.1);
        opacity: 0.5;
      }
    }
  `;

  return (
    <>
      <style>{pulseKeyframes}</style>
      <div 
        className="pb-4 md:pb-6 relative"
        style={{
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          fontFamily: 'Arial, sans-serif',
          width: '100vw',
          height: '80vh',
          position: 'relative'
        }}
      >
      {/* Background layers matching IndustriesOverview */}
      <div className="absolute inset-0 bg-muted/30 dark:bg-muted/10"></div>
      <div className="absolute inset-0 bg-[url('/grid.png')] opacity-[0.03]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-80"></div>
      
      {/* Enhanced Glowing effect behind video - Dark theme only */}
      <div
        className="hidden dark:block"
        style={{
          position: 'absolute',
          top: '50%',
          right: '8%',
          width: '700px',
          height: '700px',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, rgba(177, 84, 134, 0.4) 0%, rgba(61, 9, 109, 0.3) 30%, rgba(84, 24, 187, 0.2) 60%, rgba(138, 43, 226, 0.1) 80%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(25px)',
          zIndex: 0,
          animation: 'pulse 3s ease-in-out infinite alternate'
        }}
      />
      
      {/* Additional outer glow for enhanced effect */}
      <div
        className="hidden dark:block"
        style={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          width: '700px',
          height: '700px',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, rgba(75, 0, 130, 0.1) 40%, rgba(25, 25, 112, 0.05) 70%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: -1,
          animation: 'pulse 4s ease-in-out infinite alternate-reverse'
        }}
      />
      
      {/* Video Background - positioned on the right */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="hidden lg:block dark:lg:hidden"
        style={{
          position: 'absolute',
          top: '50%',
          right: '10%',
          width: window.innerWidth >= 1440 ? '500px' : '320px',
          height: window.innerWidth >= 1440 ? '500px' : '320px',
          transform: window.innerWidth >= 1440 ? 'translateY(-50%) scale(1.0)' : 'translateY(-50%) scale(1.2)',
          transformOrigin: 'center',
          zIndex: 1,
          opacity: 0.85,
          objectFit: 'cover',
          clipPath: window.innerWidth >= 1440 ? 'circle(150px at center)' : 'circle(100px at center)'
        }}
      >
        <source 
          src="https://res.cloudinary.com/dvt1c3v7l/video/upload/v1757321404/6eec83c9955d2bbde372a4cd32fda7da_h6qppf.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* Video Background for Dark Theme */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hidden dark:lg:block"
        style={{
          position: 'absolute',
          top: '50%',
          right: '15%',
          width: window.innerWidth >= 1024 ? '400px' : '320px',
          height: window.innerWidth >= 1024 ? '400px' : '320px',
          transform: 'translateY(-50%)',
          zIndex: 1,
          opacity: 0.85,
          objectFit: 'cover',
          borderRadius: '50%'
        }}
      >
        <source 
          src="https://res.cloudinary.com/deni4qbla/video/upload/v1757142111/e037db6aa948d11532f5c5df7f226776_1_z9kbnp.mp4" 
          type="video/mp4" 
        />
      </video>
      
      {/* Enhanced circular overlay with glow - Dark theme only */}
      <div
        className="hidden dark:lg:block"
        style={{
          position: 'absolute',
          top: '50%',
          right: '15%',
          width: window.innerWidth >= 1440 ? '400px' : '320px',
          height: window.innerWidth >= 1440 ? '400px' : '320px',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, rgba(26, 10, 46, 0.1) 0%, rgba(22, 33, 62, 0.2) 40%, rgba(15, 15, 35, 0.3) 70%, rgba(0, 0, 0, 0.4) 100%)',
          borderRadius: '50%',
          zIndex: 2,
          boxShadow: '0 0 60px rgba(177, 84, 134, 0.3), 0 0 120px rgba(84, 24, 187, 0.2), inset 0 0 40px rgba(138, 43, 226, 0.1)'
        }}
      />
      
      {/* Desktop Layout - Hero Content positioned on the left */}
      <div className="hidden lg:block relative z-10 flex items-center justify-start" style={{minHeight: '80vh', paddingTop: '10vh'}}>
        <div className="w-1/2 pl-16 md:pl-20 lg:pl-24 xl:pl-32">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
            <span className="text-sm font-medium text-primary">Industries We Serve</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="text-black dark:text-white">Industry-Specific </span>
            <span className="text-blue-600 dark:text-blue-400">SAP Solutions</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            We deliver tailored SAP solutions for diverse industries, addressing unique 
            challenges and creating opportunities for innovation and growth.
          </p>

          {/* CTA Button */}
          <button className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Explore Industries
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden flex flex-col">
        {/* Video Section - Mobile centered at top */}
        <div className="relative flex-shrink-0 h-64 flex items-center justify-center">
          {/* Glowing effect for mobile dark theme */}
          <div
            className="hidden dark:block absolute"
            style={{
              width: '240px',
              height: '240px',
              background: 'radial-gradient(circle, rgba(177, 84, 134, 0.2) 0%, rgba(61, 9, 109, 0.15) 30%, rgba(84, 24, 187, 0.1) 80%, transparent 100%)',
              borderRadius: '50%',
              filter: 'blur(15px)',
              zIndex: -1,
              animation: 'pulse 3s ease-in-out infinite alternate'
            }}
          />
          
          {/* Light Theme Mobile Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute block dark:hidden"
            style={{
              width: '200px',
              height: '200px',
              opacity: 0.85,
              objectFit: 'cover',
              borderRadius: '50%'
            }}
          >
            <source 
              src="https://res.cloudinary.com/dvt1c3v7l/video/upload/v1757321404/6eec83c9955d2bbde372a4cd32fda7da_h6qppf.mp4" 
              type="video/mp4"
            />
          </video>

          {/* Dark Theme Mobile Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute hidden dark:block"
            style={{
              width: '200px',
              height: '200px',
              opacity: 0.85,
              objectFit: 'cover',
              borderRadius: '50%'
            }}
          >
            <source 
              src="https://res.cloudinary.com/deni4qbla/video/upload/v1757142111/e037db6aa948d11532f5c5df7f226776_1_z9kbnp.mp4" 
              type="video/mp4"
            />
          </video>
        </div>

        {/* Content Section - Mobile below video */}
        <div className="relative z-10 flex-1 px-6 sm:px-8 pb-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
            <span className="text-sm font-medium text-primary">Industries We Serve</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-black dark:text-white">Industry-Specific </span>
            <span className="text-blue-600 dark:text-blue-400">SAP Solutions</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            We deliver tailored SAP solutions for diverse industries, addressing unique 
            challenges and creating opportunities for innovation and growth.
          </p>

          {/* CTA Button */}
          <button className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Explore Industries
            <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
      
    
    </div>
    </>
  );
};

export default TwistedWireRing;