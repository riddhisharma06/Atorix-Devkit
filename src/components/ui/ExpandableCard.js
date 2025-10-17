"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ExpandableCard({ 
  title, 
  description, 
  icon: Icon, 
  defaultOpen = false,
  className,
  children 
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("border rounded-lg overflow-hidden transition-all duration-200", className)}>
      <button
        className="w-full flex items-center justify-between p-4 text-left hover:bg-accent/10 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-3">
          {Icon && <Icon className="h-5 w-5 text-primary" />}
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="flex-shrink-0 ml-4">
          <svg
            className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        aria-hidden={!isOpen}
      >
        <div className="p-4 pt-0">
          {description && <p className="text-muted-foreground mb-4">{description}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
