import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

        {/* --- Company Info --- */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center mb-3 sm:mb-4">
            <Link to="/" className="flex items-center">
              <img 
                src="https://res.cloudinary.com/dvkxgrcbv/image/upload/v1766064439/logo_vwfmey.png" 
                alt="Stylish Touches" 
                className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain"
                style={{ maxWidth: '280px' }}
              />
            </Link>
          </div>
          <p className="text-xs sm:text-sm leading-6 text-gray-400">
            Discover premium eyeglasses, sunglasses, and contact lenses at unbeatable prices.
            Style your vision with the latest trends and comfort-focused designs.
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Links</h2>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
          </ul>
        </div>

        {/* --- Product Categories --- */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Categories</h2>
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm">
            <ul className="space-y-2">
              <li><Link to="/category/Eyeglasses" className="hover:text-white transition-colors">Eyeglasses</Link></li>
              <li><Link to="/category/Sunglasses" className="hover:text-white transition-colors">Sunglasses</Link></li>
              <li><Link to="/category/Computer%20Glasses" className="hover:text-white transition-colors">Computer Glasses</Link></li>
              <li><Link to="/category/Contact%20Lenses" className="hover:text-white transition-colors">Contact Lenses</Link></li>
              <li><Link to="/category/Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
            <ul className="space-y-2">
              <li><Link to="/category/Bags" className="hover:text-white transition-colors">Bags</Link></li>
              <li><Link to="/category/Men's%20Shoes" className="hover:text-white transition-colors">Men's Shoes</Link></li>
              <li><Link to="/category/Women's%20Shoes" className="hover:text-white transition-colors">Women's Shoes</Link></li>
            </ul>
          </div>
        </div>

        {/* --- Contact Info --- */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Get in Touch</h2>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" size={16}/>
              <span className="break-words">1245 Fashion Street, Bandra West, Mumbai - 400050, Maharashtra, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" size={16}/>
              <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" size={16}/>
              <a href="tel:+918765432109" className="hover:text-white transition-colors">+91 87654 32109</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" size={16}/>
              <a href="mailto:support@stylishtouches.in" className="hover:text-white transition-colors break-all">support@stylishtouches.in</a>
            </li>
          </ul>

          <div className="flex gap-3 sm:gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Facebook className="w-5 h-5 sm:w-5 sm:h-5" size={20}/>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Instagram className="w-5 h-5 sm:w-5 sm:h-5" size={20}/>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Twitter className="w-5 h-5 sm:w-5 sm:h-5" size={20}/>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Youtube className="w-5 h-5 sm:w-5 sm:h-5" size={20}/>
            </a>
          </div>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} Stylish Touches. All Rights Reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-4 gap-y-2 text-xs sm:text-sm">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-white transition-colors whitespace-nowrap">
                Privacy Policy
              </Link>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-white transition-colors whitespace-nowrap">
                Refund & Cancellation Policy
              </Link>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <Link to="/shipping-policy" className="text-gray-500 hover:text-white transition-colors whitespace-nowrap">
                Shipping Policy
              </Link>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <Link to="/return-policy" className="text-gray-500 hover:text-white transition-colors whitespace-nowrap">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
