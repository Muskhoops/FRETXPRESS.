import React, { useState, useEffect, useRef } from 'react';
import { Truck } from 'lucide-react';
import Logo from '../assets/logo.svg';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+|-+$/g, '');

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-4 md:py-5' 
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center space-x-2"
            aria-label="FretXpress Logo"
          >
            <div className="w-16 h-16 relative">
              <img 
                src={Logo} 
                alt="Logo" 
                className="absolute inset-0 w-full h-full p-2"
              />
            </div>
            <span className={`text-xl md:text-2xl font-bold ${isScrolled ? 'text-secondary-900' : 'text-white'}`}>
              <span>Fret</span>
              <span className="text-primary-500">Xpress</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {['Accueil', 'À propos', 'Services', 'Confiance', 'Contact'].map((item, index) => (
              <a
                key={index}
                href={`#${slugify(item)}`}
                className={`font-medium transition-colors duration-300 hover:text-primary-500 ${
                  isScrolled ? 'text-secondary-900' : 'text-white'
                }`}
              >
                {item}
              </a>
            ))}
            <a
              href="#devis"
              className="font-medium bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-300"
            >
              Devis
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Menu principal"
          >
            <div className={`w-6 h-0.5 my-1.5 transition-all duration-300 ${isScrolled ? 'bg-secondary-900' : 'bg-white'} ${mobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 my-1.5 transition-all duration-300 ${isScrolled ? 'bg-secondary-900' : 'bg-white'} ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-6 h-0.5 my-1.5 transition-all duration-300 ${isScrolled ? 'bg-secondary-900' : 'bg-white'} ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`lg:hidden transition-all duration-300 overflow-hidden rounded-lg ${
            mobileMenuOpen
              ? `max-h-80 mt-4 opacity-100 ${!isScrolled ? 'bg-black bg-opacity-90' : 'bg-white'}`
              : 'max-h-0 mt-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 py-4 px-4">
            {['Accueil', 'À propos', 'Services', 'Confiance', 'Contact'].map((item, index) => (
              <a
                key={index}
                href={`#${slugify(item)}`}
                className={`font-medium ${
                  isScrolled ? 'text-secondary-900' : 'text-white'
                } hover:text-primary-500 transition-colors duration-300`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="#devis"
              className="font-medium bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-300 inline-block text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Devis
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
