"use client";
import { motion } from "framer-motion";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedBlobBackground from "./AnimatedBlobBackground";

const description = `Atorix IT is a leading technology solutions provider specializing in innovative software development and digital transformation. We help businesses leverage cutting-edge technologies to drive growth, efficiency, and competitive advantage in today's digital landscape.`;

export default function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="w-full h-[100vh] flex items-center justify-center">
        {/* Dark Theme Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover dark:block hidden"
        >
          <source src="https://res.cloudinary.com/deni4qbla/video/upload/v1757913598/Futuristic_interface___HUD_sound_effects_720p_e65uch.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Light Theme Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover dark:hidden block"
        >
          <source src="https://res.cloudinary.com/deni4qbla/video/upload/v1760692802/VID_20251017141956_hdthph.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 bg-white/40 dark:bg-black/40"></div>
      </div>

      {/* Centered Logo */}
      <div className="absolute inset-0 flex items-center justify-center z-[2]">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-6xl md:text-8xl font-bold tracking-wider leading-none">
            <span className="text-white dark:text-black [text-shadow:1px_0_0_#fff,0_1px_0_#fff,-1px_0_0_#fff,0_-1px_0_#fff] dark:[text-shadow:none] -ml-5">ATO</span>
            <span className="font-black text-black dark:text-white">RIX</span>
          </div>
          <div className="text-6xl md:text-8xl font-bold tracking-[0.3em] mt-[-0.5rem]">
            <span className="text-black dark:text-black [text-shadow:1px_0_0_#fff,0_1px_0_#fff,-1px_0_0_#fff,0_-1px_0_#fff] dark:[text-shadow:none] -mr-5">I</span>
            <span className="text-white dark:text-white">T</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="w-1/2 h-full backdrop-blur-sm bg-black/20 border-r border-white/10 p-8 flex items-center">
          {/* Content area kept for future use */}
        </div>
      </div>
      
      {/* Description at left corner */}
      <motion.div 
        className="absolute bottom-4 left-8 max-w-lg p-5 bg-black/60 backdrop-blur-sm rounded-lg"
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">About Us</h2>
        <p className="text-base text-white/60">
          {description}
        </p>
      </motion.div>
    </section>
  );
}