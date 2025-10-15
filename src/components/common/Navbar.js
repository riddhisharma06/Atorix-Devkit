"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/ui/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

// Import services data
import servicesData from "@/data/services.json";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  // Services is handled separately with dropdown
  { name: "Industries", path: "/industries" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

// Enhanced Neon Logo Border with Continuous Animation - Theme Aware
export function NeonLogoBorder({ width = 110, height = 30, className = "", isMobile = false }) {
  const { theme } = useTheme();
  const containerSize = isMobile ? "p-0.5" : "p-0.5";
  const innerPadding = isMobile ? "p-1.5" : "p-1.5";
  const logoContainerClass = `relative ${containerSize} ${className} flex items-center justify-center ml-[-5px] md:ml-0 lg:ml-[-15px]`;
  
  // Theme-based styling
  const isLightMode = theme === 'light';
  const logoBackgroundColor = isLightMode ? 'bg-white' : 'bg-black';
  
  return (
    <div className={logoContainerClass}>
      {/* Animated Glow Layer with Rotating Colors */}
      <div className="absolute inset-0 rounded-full animated-glow-layer"
        style={{
          zIndex: 0,
        }}
      />
      
      {/* Animated Border Layer with Moving Colors */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 rounded-full animated-border-layer" />
      </div>
      
      {/* Logo Container with Continuous Shine Effect - Theme Aware Background */}
      <div className={`relative rounded-full ${logoBackgroundColor} ${innerPadding} flex items-center justify-center z-10 overflow-hidden`}>
        {/* Continuous Shine Animation Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 z-20 animate-shine" />
        
        <div className="flex items-center z-30">
          <div className="flex items-center">
            <div className="relative w-10 h-10 -ml-1">
              <Image
                src={
                  isLightMode 
                    ? "/atorix-logo-old.png" 
                    : "/atorix-logo.png"
                }
                alt="Atorix Logo"
                fill
                className="relative z-30 object-contain"
                priority
              />
            </div>
            <Image
              src={
                isLightMode 
                  ? "/crop_logo.webp.webp"
                  : "/atorix text logo@3x.webp"
              }
              alt="Atorix"
              width={width - 25}
              height={height}
              className="object-contain relative z-30 -ml-1"
              priority
            />
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        /* Define custom property for angle animation */
        @property --gradient-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @property --glow-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        /* Animated Glow Layer with Moving Colors */
        .animated-glow-layer {
          background: conic-gradient(
            from var(--glow-angle),
            #000,
            #402fb5,
            #cf30aa,
            #f12711,
            #f5af19,
            #000
          );
          opacity: 0.4;
          animation: rotate-glow 8s linear infinite, pulse 3s ease-in-out infinite;
        }

        /* Animated Border Layer with Moving Colors */
        .animated-border-layer {
          background: conic-gradient(
            from var(--gradient-angle),
            transparent 0deg,
            #f12711 60deg,
            #f5af19 120deg,
            transparent 180deg,
            #402fb5 240deg,
            #cf30aa 300deg,
            transparent 360deg
          );
          animation: rotate-gradient 6s linear infinite;
        }

        /* Rotation Animation for Glow */
        @keyframes rotate-glow {
          0% {
            --glow-angle: 0deg;
          }
          100% {
            --glow-angle: 360deg;
          }
        }

        /* Rotation Animation for Border */
        @keyframes rotate-gradient {
          0% {
            --gradient-angle: 0deg;
          }
          100% {
            --gradient-angle: 360deg;
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        /* Continuous shine animation */
        @keyframes shine {
          0% {
            transform: translateX(-150%) skewX(-12deg);
          }
          100% {
            transform: translateX(150%) skewX(-12deg);
          }
        }
        
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }

        /* Fix for sticky navbar dropdown issues */
        .sticky-navbar {
          overflow: visible !important;
          z-index: 9999 !important;
        }
        
        .sticky-navbar .dropdown-menu {
          position: absolute !important;
          z-index: 10000 !important;
          display: block !important;
        }
      `}</style>
    </div>
  );
}

// Mobile Neon Logo (Smaller version)
function MobileNeonLogo() {
  return (
    <NeonLogoBorder 
      width={30}
      height={30}
      className="scale-95"
      isMobile={true}
    />
  );
}

// Rest of your Navbar component code remains the same...
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const sheetCloseRef = useRef(null);

  // State for hover dropdowns
  const [openCategory, setOpenCategory] = useState(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const timeoutRef = useRef(null);
  const subMenuTimeoutRef = useRef(null);

  // State for mobile menu accordions
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Check if current route is Industries page
  const isIndustriesPage = pathname === "/industries";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    if (isSheetOpen && sheetCloseRef.current) {
      sheetCloseRef.current.click();
      setIsSheetOpen(false);
    }
  }, [pathname, isSheetOpen]);

  // Check if current path is a service path
  const isServicePath = pathname.startsWith("/services");

  // Check if current path is blog path
  const isBlogPath = pathname.includes("/blog");

  // Handle mouse events for the main dropdown - ENHANCED VERSION
  const handleServicesMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
      setOpenCategory(null);
    }, 200);
  };

  // Handle mouse events for category submenus
  const handleCategoryMouseEnter = (categoryId) => {
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
      subMenuTimeoutRef.current = null;
    }
    setOpenCategory(categoryId);
  };

  const handleCategoryMouseLeave = () => {
    subMenuTimeoutRef.current = setTimeout(() => {
      setOpenCategory(null);
    }, 200);
  };

  // Handle clicking the dropdown menu container to keep it open
  const handleDropdownClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
      subMenuTimeoutRef.current = null;
    }
  };

  // Toggle category expansion in mobile menu
  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Function to handle sheet open/close
  const handleSheetOpenChange = (open) => {
    setIsSheetOpen(open);
  };

  // Function to close mobile menu for navigation
  const closeSheet = () => {
    if (sheetCloseRef.current) {
      sheetCloseRef.current.click();
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
      },
    },
  };

  // Mobile Menu Component
  const MobileMenu = ({ isScrolled }) => {
    return (
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0" hideCloseButton={true}>
          <div className="flex flex-col h-full">
            <div className="relative flex items-center justify-center p-4 border-b h-20">
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="absolute left-4">
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </SheetClose>
              <Link href="/" onClick={() => setIsSheetOpen(false)} className="flex-shrink-0">
                <NeonLogoBorder width={90} height={28} />
              </Link>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                    pathname === link.path
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setIsSheetOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Services Dropdown in Mobile */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setExpandedCategory(expandedCategory === 'services' ? null : 'services')}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-lg text-base font-medium hover:bg-accent/50"
                >
                  <span>Services</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${expandedCategory === 'services' ? 'rotate-90' : ''}`} />
                </button>
                
                {expandedCategory === 'services' && (
                  <div className="ml-4 space-y-2 border-l-2 border-accent pl-4">
                    {servicesData.categories.map((category) => (
                      <div key={category.id} className="space-y-1">
                        <button
                          onClick={() => setExpandedCategory(expandedCategory === category.id ? 'services' : category.id)}
                          className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium hover:bg-accent/30"
                        >
                          <span>{category.name}</span>
                          <ChevronRight className={`h-4 w-4 transition-transform ${expandedCategory === category.id ? 'rotate-90' : ''}`} />
                        </button>
                        
                        {expandedCategory === category.id && (
                          <div className="ml-4 space-y-1">
                            {category.services.map((service) => (
                              <Link
                                key={service.id}
                                href={`/services/${category.id}/${service.id}`}
                                className="block py-2 px-3 rounded-lg text-sm hover:bg-accent/30"
                                onClick={() => setIsSheetOpen(false)}
                              >
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t mt-4">
                <Button asChild className="w-full bg-transparent border-1 border-[#DF7D13] text-[#DF7D13] hover:bg-[#DF7D13] hover:text-white transition-all duration-300">
                  <Link href="/get-demo" onClick={() => setIsSheetOpen(false)}>Get Demo</Link>
                </Button>
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  return (
    <>
      {/* FIRST NAVBAR - Fixed navbar */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-100 ease-in-out ${
        isScrolled ? 'opacity-0 pointer-events-none transform -translate-y-full' : 'opacity-100 pointer-events-auto transform translate-y-0'
      }`}>
        <div className="transition-all duration-100 ease-in-out overflow-visible">
          <div className="h-14 md:h-16 flex items-center justify-between transition-all duration-100 ease-in-out px-6 md:px-8 lg:px-12 relative bg-background/80 backdrop-blur-md shadow-sm w-full">
            {/* Logo with Neon Border Effect */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0 -ml-2 md:-ml-2">
              <NeonLogoBorder />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8 overflow-visible flex-1" style={{overflow: 'visible'}}>
              {/* Home and About links */}
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-xs md:text-sm font-medium transition-colors hover:text-[#DF7D13] ${
                    pathname === link.path
                      ? "font-semibold" 
                      : "text-foreground/80"
                  }`}
                  style={pathname === link.path ? {color: '#DF7D13'} : {}}
                >
                  {link.name}
                </Link>
              ))}

              {/* Services Dropdown with Hover */}
              <div
                className="relative overflow-visible"
                ref={servicesRef}
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
                onClick={handleDropdownClick}
              >
                <div className="inline-flex items-center">
                  <Link 
                    href="/services" 
                    className={`inline-flex items-center text-xs md:text-sm font-medium transition-colors hover:text-[#DF7D13] ${
                      isServicePath ? "font-semibold" : "text-foreground/80"
                    }`}
                    style={isServicePath ? {color: '#DF7D13'} : {}}
                  >
                    Services
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Link>
                </div>

                {isServicesOpen && (
                  <div className="absolute left-0 top-full pt-2 z-[9999]" style={{position: 'absolute', zIndex: 9999}}>
                    <div className="w-64 bg-popover rounded-xl border shadow-lg p-2" style={{backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))'}}>
                      <div className="space-y-1 py-1">
                        {servicesData.categories.map((category) => (
                          <div
                            key={category.id}
                            className="relative"
                            onMouseEnter={() =>
                              handleCategoryMouseEnter(category.id)
                            }
                            onMouseLeave={handleCategoryMouseLeave}
                          >
                            <div className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-accent cursor-pointer">
                              <span>{category.name}</span>
                              <ChevronDown className="ml-auto h-4 w-4 -rotate-90" />
                            </div>

                            {openCategory === category.id && (
                              <div className="absolute top-0 left-full pl-2 z-[10000]" style={{position: 'absolute', zIndex: 10000}}>
                                <div className="w-64 bg-popover rounded-xl border shadow-lg p-2" style={{backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))'}}>
                                  <div className="space-y-1 py-1">
                                    {category.services.map((service) => (
                                      <Link
                                        key={service.id}
                                        href={`/services/${category.id}/${service.id}`}
                                        className="block px-3 py-2 text-sm rounded-lg hover:bg-accent"
                                      >
                                        {service.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Industries, Blog and Contact links */}
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-xs md:text-sm font-medium transition-colors hover:text-[#DF7D13] ${
                    pathname === link.path ||
                    (link.path === "/blog" && isBlogPath) ||
                    (link.path === "/industries" && isIndustriesPage)
                      ? "font-semibold"
                      : "text-foreground/80"
                  }`}
                  style={(pathname === link.path || 
                         (link.path === "/blog" && isBlogPath) ||
                         (link.path === "/industries" && isIndustriesPage)) ? {color: '#DF7D13'} : {}}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right side - Desktop and Mobile sections */}
            <div className="flex items-center space-x-4">
              {/* TABLET & LAPTOP: GET DEMO FIRST, THEN TOGGLE */}
              <div className="hidden md:flex items-center space-x-4">
                <Button asChild variant="outline" className="md:order-1 lg:order-1 rounded-full font-semibold bg-transparent border-1 hover:bg-[#DF7D13] hover:text-white transition-all duration-300" size="sm">
                  <Link href="/get-demo">Get Demo</Link>
                </Button>
                <div className="md:order-2 lg:order-2">
                  <ThemeToggle />
                </div>
              </div>
              
              {/* MOBILE: GET DEMO → TOGGLE → MENU */}
              <div className="flex md:hidden items-center space-x-2">
                <Button asChild variant="outline" className="rounded-full font-semibold text-xs h-8 px-2 bg-transparent border-1 hover:bg-[#DF7D13] hover:text-white transition-all duration-300" size="sm">
                  <Link href="/get-demo">Get Demo</Link>
                </Button>
                <ThemeToggle />
                {!isScrolled && <MobileMenu isScrolled={isScrolled} />}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SECOND NAVBAR - Sticky navbar - Logo moved further left */}
      <header className={`sticky top-1 w-full transition-all duration-100 ease-in-out sticky-navbar ${
        isScrolled ? 'opacity-100 pointer-events-auto transform translate-y-0 z-[9999]' : 'opacity-0 pointer-events-none transform -translate-y-full z-[9999]'
      }`}>
        {/* Outer container with padding for space around navbar */}
        <div className="transition-all duration-100 ease-in-out px-4 py-2" style={{overflow: 'visible'}}>
          <div 
            className="h-16 md:h-18 flex items-center justify-between transition-all duration-100 ease-in-out px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-4 relative bg-background/95 backdrop-blur-md shadow-sm rounded-full max-w-4xl mx-auto border-2"
            style={{
              borderColor: '#DF7D13',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              overflow: 'visible'
            }}
          >
            {/* Combined Logo - Moved further left */}
            <Link href="/" className="flex-shrink-0 mr-3 md:mr-6 -ml-4 md:-ml-6 lg:-ml-6">
              <NeonLogoBorder width={100} height={28} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center space-x-3 lg:space-x-5 flex-1 ml-4" style={{overflow: 'visible', position: 'relative'}}>
              {/* Home and About links */}
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-xs md:text-sm font-medium transition-colors hover:text-[#DF7D13] ${
                    pathname === link.path
                      ? "font-semibold" 
                      : "text-foreground/80"
                  }`}
                  style={pathname === link.path ? {color: '#DF7D13'} : {}}
                >
                  {link.name}
                </Link>
              ))}

              {/* Services Dropdown with Hover - FIXED FOR STICKY */}
              <div
                className="relative"
                style={{overflow: 'visible', position: 'relative'}}
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
                onClick={handleDropdownClick}
              >
                <div className="inline-flex items-center">
                  <Link 
                    href="/services" 
                    className={`inline-flex items-center text-xs md:text-sm font-medium transition-colors hover:text-[#DF7D13] ${
                      isServicePath ? "font-semibold" : "text-foreground/80"
                    }`}
                    style={isServicePath ? {color: '#DF7D13'} : {}}
                  >
                    Services
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Link>
                </div>

                {isServicesOpen && (
                  <div 
                    className="absolute left-0 top-full pt-2 dropdown-menu" 
                    style={{
                      position: 'absolute', 
                      zIndex: 10000,
                      left: 0,
                      top: '100%',
                      paddingTop: '8px'
                    }}
                  >
                    <div className="w-64 bg-popover rounded-xl border shadow-lg p-2" style={{backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))'}}>
                      <div className="space-y-1 py-1">
                        {servicesData.categories.map((category) => (
                          <div
                            key={category.id}
                            className="relative"
                            onMouseEnter={() => handleCategoryMouseEnter(category.id)}
                            onMouseLeave={handleCategoryMouseLeave}
                          >
                            <div className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-accent cursor-pointer">
                              <span>{category.name}</span>
                              <ChevronDown className="ml-auto h-4 w-4 -rotate-90" />
                            </div>

                            {openCategory === category.id && (
                              <div 
                                className="absolute top-0 left-full pl-2" 
                                style={{
                                  position: 'absolute', 
                                  zIndex: 10001,
                                  top: 0,
                                  left: '100%',
                                  paddingLeft: '8px'
                                }}
                              >
                                <div className="w-64 bg-popover rounded-xl border shadow-lg p-2" style={{backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))'}}>
                                  <div className="space-y-1 py-1">
                                    {category.services.map((service) => (
                                      <Link
                                        key={service.id}
                                        href={`/services/${category.id}/${service.id}`}
                                        className="block px-3 py-2 text-sm rounded-lg hover:bg-accent"
                                      >
                                        {service.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Industries, Blog and Contact links */}
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-xs md:text-sm font-medium transition-colors hover:text-[#DF7D13] ${
                    pathname === link.path ||
                    (link.path === "/blog" && isBlogPath) ||
                    (link.path === "/industries" && isIndustriesPage)
                      ? "font-semibold"
                      : "text-foreground/80"
                  }`}
                  style={(pathname === link.path || 
                         (link.path === "/blog" && isBlogPath) ||
                         (link.path === "/industries" && isIndustriesPage)) ? {color: '#DF7D13'} : {}}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
              
            {/* TABLET & LAPTOP: GET DEMO FIRST, THEN TOGGLE */}
            <div className="hidden md:flex items-center ml-4">
              <Button asChild variant="outline" className="md:order-1 lg:order-1 mr-4 rounded-full font-semibold bg-transparent border-1 hover:bg-[#DF7D13] hover:text-white transition-all duration-300" size="sm">
                <Link href="/get-demo">Get Demo</Link>
              </Button>
              <div className="md:order-2 lg:order-2">
                <ThemeToggle />
              </div>
            </div>

            {/* MOBILE: GET DEMO → TOGGLE → MENU */}
            <div className="flex md:hidden items-center space-x-1.5 flex-shrink-0">
              <Button asChild variant="outline" className="rounded-full font-semibold text-xs h-7 px-2 bg-transparent border hover:bg-[#DF7D13] hover:text-white transition-all duration-300" size="sm">
                <Link href="/get-demo">Demo</Link>
              </Button>
              <ThemeToggle />
              <MobileMenu isScrolled={true} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}