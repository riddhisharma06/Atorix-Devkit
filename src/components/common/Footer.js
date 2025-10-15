"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";
import { NeonLogoBorder } from "./Navbar";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative py-16 bg-black text-white overflow-hidden">
      {/* Animated Circular Neon Wave Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="relative w-[800px] h-[800px] animate-spin-slow">
          {/* Multiple circular rings */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderImage: "linear-gradient(45deg, #8b5cf6, #3b82f6, #8b5cf6) 1",
                borderImageSlice: 1,
                transform: `scale(${0.5 + i * 0.15})`,
                opacity: 0.8 - i * 0.05,  // Increased base opacity
                boxShadow: `0 0 ${25 + i * 15}px rgba(139, 92, 246, ${0.7 - i * 0.05}), 
                          inset 0 0 ${25 + i * 15}px rgba(59, 130, 246, ${0.5 - i * 0.03})`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Link href="/" className="flex items-center">
                <NeonLogoBorder width={100} height={28} />
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Atorix IT Solutions is the Best SAP S4 HANA Implementation Partner
              in India with its head office in Pune. We provide robust, business
              process solutions for successful clients.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/industries"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  Industries
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/sap-application/implementation-rollout"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  SAP S/4 Implementation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sap-application/sap-ecc-s4-hana-support"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  SAP S/4 Support
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sap-application/sap-integration"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  SAP S/4 Integration
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sap-application/upgrade-services"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  SAP S/4 Upgrade
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sap-application/sap-s4-hana-migration"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  SAP S/4 Migration
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sap-application/sap-business-one-implementation"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  SAP Business One
                </Link>
              </li>
              <li>
                <Link
                  href="/services/data-science"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  Data Science
                </Link>
              </li>
              <li>
                <Link
                  href="/services/data-science/machine-learning"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/data-science/data-analytics"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  Data Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-400">
                  3rd Floor, Office No. C 305 DP Road, Police, Wireless Colony,
                  Pune, Maharashtra.
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-purple-400 flex-shrink-0" />
                <a
                  href="tel:+918956001555"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  +91 89560 01555
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-purple-400 flex-shrink-0" />
                <a
                  href="mailto:info@atorix.in"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  info@atorix.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Atorix IT Solutions. All rights
            reserved.
          </p>
          <div className="flex mt-4 sm:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-500 mx-2">|</span>
            <Link
              href="/terms"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-gray-500 mx-2">|</span>
            <Link
              href="/blog"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </footer>
  );
}