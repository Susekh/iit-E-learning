import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t mt-12 from-blue-100 to-white dark:from-[#0f0f0f] dark:to-[#141414] text-gray-800 dark:text-gray-200 border-t dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">EduZone</h2>
            <p className="text-sm">
              Your favorite place to learn and grow with curated online courses and fun challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/courses" className="hover:underline">Courses</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a href="" className="hover:text-blue-500 transition">🌐</a>
              <a href="" className="hover:text-blue-500 transition">📘</a>
              <a href="" className="hover:text-blue-500 transition">📸</a>
              <a href="" className="hover:text-blue-500 transition">🐦</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} EduZone. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
