import Footer from '@/components/Footer';
import { Navbar } from '@/components/navbar';
import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#1f2937] text-white px-6 py-12">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-400 mb-6">Terms of Service</h1>
        <p className="text-gray-300 mb-4">
          Welcome to ChainVerse Nexus. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h2 className="text-2xl text-purple-300 mt-6 mb-2">1. Use of Service</h2>
        <p className="text-gray-400 mb-4">
          You agree to use ChainVerse Nexus for lawful purposes only. Any unauthorized use of the platform is strictly prohibited.
        </p>

        <h2 className="text-2xl text-purple-300 mt-6 mb-2">2. Ownership</h2>
        <p className="text-gray-400 mb-4">
          All content on this platform, including NFTs, is the property of their respective owners. You may not copy, distribute, or create derivative works without permission.
        </p>

        <h2 className="text-2xl text-purple-300 mt-6 mb-2">3. Account Termination</h2>
        <p className="text-gray-400 mb-4">
          We reserve the right to suspend or terminate accounts that violate our terms or engage in malicious activity.
        </p>

        <h2 className="text-2xl text-purple-300 mt-6 mb-2">4. Limitation of Liability</h2>
        <p className="text-gray-400 mb-4">
          ChainVerse Nexus is not liable for any losses or damages resulting from the use of our platform or NFTs.
        </p>

        <p className="text-sm text-gray-500 mt-10">
          Last updated: April 22, 2025
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;