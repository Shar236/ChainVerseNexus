import React from "react";
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1c1e2b] via-[#232640] to-[#1f2235] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4 ml-6 text-purple-400">
              ChainVerse Nexus
            </h2>
            <p className="text-sm ml-6 text-gray-300">
              Explore the future of blockchain with our seamless NFT and
              blockchain platform.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/" className="hover:text-white transition">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/nft-gallery" className="hover:text-white transition">
                  NFT Gallery
                </a>
              </li>
              <li>
                <a href="/chains" className="hover:text-white transition">
                  Chain Explorer
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/TermsOfService" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            <div className="flex space-x-4 text-xl">
              <a
                href="https://x.com/Sharvan_7X"
                aria-label="Twitter"
                className="hover:text-white"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com/itz_sharvan_kumar"
                aria-label="Instagram"
                className="hover:text-white"
              >
                <FaInstagram />
              </a>
              <a
                href="https://github.com/Shar236/ChainVerseNexus"
                aria-label="GitHub"
                className="hover:text-white"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/sharvankumar236"
                aria-label="Linkedin"
                className="hover:text-white"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          © 2025 ChainVerse Nexus. Built with 💜 for the blockchain future.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
