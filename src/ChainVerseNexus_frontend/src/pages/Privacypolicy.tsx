import Footer from '@/components/Footer';
import { Navbar } from '@/components/navbar';
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#1f2937] text-white px-6 py-12">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-400 mb-6">Privacy Policy</h1>
        <p className="text-gray-300 mb-4">
          Your privacy is important to us. This policy outlines how ChainVerse Nexus collects, uses, and protects your information.
        </p>

        <h2 className="text-2xl text-purple-300 mt-6 mb-2">1. Information We Collect</h2>
        <p className="text-gray-400 mb-4">
          We may collect personal information such as your name, email address, and wallet ID when you use our platform.
        </p>

        <h2 className="text-2xl text-purple-300 mt-6 mb-2">2. Use of Information</h2>
        <p className="text-gray-400 mb-4">
          Your data is used to personalize your experience, provide customer support, and improve our services.
        </p>

        <h2 className="text-2xl text-purple-300 mt-6 mb-2">3. Data Protection</h2>
        <p className="text-gray-400 mb-4">
          We implement industry-standard measures to protect your data from unauthorized access, disclosure, or destruction.
        </p>

        <h2 className="text-2xl text-purple-300 mt-6 mb-2">4. Third-party Services</h2>
        <p className="text-gray-400 mb-4">
          We may share data with trusted third-party providers to operate our platform but never sell your personal data.
        </p>

        <p className="text-sm text-gray-500 mt-10">
          Last updated: April 22, 2025
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;