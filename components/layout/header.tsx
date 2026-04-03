"use client";

import React from "react"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "痛点", href: "#problems" },
  { label: "我们是谁", href: "#who-we-are" },
  { label: "服务矩阵", href: "#service-matrix" },
  { label: "Launch Video", href: "#launch-video" },
  { label: "增长成果", href: "#growth-proof" },
  { label: "团队", href: "#team" },
  { label: "价格", href: "#pricing" },
  { label: "联系", href: "#contact" },
  { label: "增长", href: "/growth" },
  { label: "指南", href: "/playbooks" },
  { label: "博客", href: "/blog" },
  { label: "毒舌Agent", href: "/viperVC" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      } ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
              <Image 
                src="/logo.jpg" 
                alt="StartPoint Logo" 
                width={32} 
                height={32} 
                className="object-cover"
              />
            </div>
            <span className="font-bold text-lg text-foreground">
              起始点 <span className="text-gradient-animate">StartPoint</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavigation(e, item.href)}
                className={`relative text-muted-foreground hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-[#fc9918] after:transition-all after:duration-300 hover:after:w-full ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
                style={{ transitionDelay: `${100 + index * 50}ms` }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div 
            className={`hidden md:block transition-all duration-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <Button className="bg-gradient-to-r from-primary to-[#fc9918] text-white hover:opacity-90 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
              免费咨询
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-muted-foreground hover:text-primary transition-all duration-300 py-2 transform ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={(e) => handleNavigation(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
              <Button className="mt-4 bg-gradient-to-r from-primary to-[#fc9918] text-white hover:opacity-90 rounded-full">
                免费咨询
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
