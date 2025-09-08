import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/sturij-logo.png" 
                alt="Sturij" 
                className="h-8 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-warm-white/80 mb-4">
              Creating beautiful fitted furniture since 2002. Quality craftsmanship, transparent pricing, lifetime guarantee.
            </p>
            <div className="flex items-center gap-2 text-warm-white/80 hover:text-honey-gold transition-colors duration-200">
              <Phone className="h-4 w-4" />
              <span>0800 123 4567</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sage-green">Our Solutions</h4>
            <ul className="space-y-2 text-warm-white/80">
              <li>
                <Link to="/our-solutions" className="hover:text-honey-gold transition-colors duration-200">
                  Fitted Wardrobes
                </Link>
              </li>
              <li>
                <Link to="/our-solutions" className="hover:text-honey-gold transition-colors duration-200">
                  Home Offices
                </Link>
              </li>
              <li>
                <Link to="/our-solutions" className="hover:text-honey-gold transition-colors duration-200">
                  Media Walls
                </Link>
              </li>
              <li>
                <Link to="/our-solutions" className="hover:text-honey-gold transition-colors duration-200">
                  Kitchens
                </Link>
              </li>
              <li>
                <Link to="/our-solutions" className="hover:text-honey-gold transition-colors duration-200">
                  Storage Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sage-green">Company</h4>
            <ul className="space-y-2 text-warm-white/80">
              <li>
                <Link to="/about" className="hover:text-honey-gold transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-were-different" className="hover:text-honey-gold transition-colors duration-200">
                  How We're Different
                </Link>
              </li>
              <li>
                <Link to="/sturij-process" className="hover:text-honey-gold transition-colors duration-200">
                  Our Process
                </Link>
              </li>
              <li>
                <Link to="/materials-quality" className="hover:text-honey-gold transition-colors duration-200">
                  Quality Standards
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sage-green">Get Started</h4>
            <ul className="space-y-2 text-warm-white/80">
              <li>
                <Link to="/book-appointment" className="hover:text-honey-gold transition-colors duration-200">
                  Book Consultation
                </Link>
              </li>
              <li>
                <Link to="/knowledge-centre" className="hover:text-honey-gold transition-colors duration-200">
                  Knowledge Centre
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-honey-gold transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage-green/20 mt-8 pt-8 text-center text-warm-white/60">
          <p>&copy; 2024 Sturij. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}