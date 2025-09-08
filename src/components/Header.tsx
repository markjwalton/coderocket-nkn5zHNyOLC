import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-warm-white shadow-sm border-b border-sage-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center group">
            <img 
              src="/sturij-logo.png" 
              alt="Sturij" 
              className="h-10 w-auto transition-all duration-300 group-hover:opacity-80"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/how-were-different" className="nav-link text-charcoal hover:text-sage-green">
              How We're Different
            </Link>
            <Link to="/our-solutions" className="nav-link text-charcoal hover:text-sage-green">
              Our Solutions
            </Link>
            <Link to="/materials-quality" className="nav-link text-charcoal hover:text-sage-green">
              Materials & Quality
            </Link>
            <Link to="/sturij-process" className="nav-link text-charcoal hover:text-sage-green">
              Our Process
            </Link>
            <Link to="/knowledge-centre" className="nav-link text-charcoal hover:text-sage-green">
              Knowledge Centre
            </Link>
            <Link to="/about" className="nav-link text-charcoal hover:text-sage-green">
              About
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/contact" className="nav-link text-charcoal hover:text-sage-green">
              Contact
            </Link>
            <Button asChild className="interactive-button">
              <Link to="/book-appointment">Book Consultation</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-sage-green/10 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-charcoal" />
            ) : (
              <Menu className="h-6 w-6 text-charcoal" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-sage-green/10 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/how-were-different" 
                className="text-charcoal hover:text-sage-green transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How We're Different
              </Link>
              <Link 
                to="/our-solutions" 
                className="text-charcoal hover:text-sage-green transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Solutions
              </Link>
              <Link 
                to="/materials-quality" 
                className="text-charcoal hover:text-sage-green transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Materials & Quality
              </Link>
              <Link 
                to="/sturij-process" 
                className="text-charcoal hover:text-sage-green transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Process
              </Link>
              <Link 
                to="/knowledge-centre" 
                className="text-charcoal hover:text-sage-green transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Knowledge Centre
              </Link>
              <Link 
                to="/about" 
                className="text-charcoal hover:text-sage-green transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-charcoal hover:text-sage-green transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button asChild className="interactive-button w-full mt-4">
                <Link to="/book-appointment" onClick={() => setIsMenuOpen(false)}>
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}