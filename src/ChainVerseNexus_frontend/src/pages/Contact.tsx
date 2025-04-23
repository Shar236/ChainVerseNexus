import Footer from '@/components/Footer';
import { Navbar } from '@/components/navbar';
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#1f2937] text-white px-4 py-12 flex flex-col items-center justify-center">
      <Navbar />
      <h1 className="text-4xl font-bold mb-4 text-purple-400">Contact Us</h1>
      <p className="text-lg text-gray-300 mb-10 text-center max-w-xl">
        Got a question, feedback, or want to collaborate? Reach out to the ChainVerse Nexus team!
      </p>

      <form className="w-full max-w-xl bg-[#1e1e2f] p-8 rounded-2xl shadow-lg space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-purple-300">Name</label>
          <input
            type="text"
            className="w-full p-3 rounded-md bg-[#2a2a3c] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-purple-300">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded-md bg-[#2a2a3c] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-purple-300">Message</label>
          <textarea
            rows={5}
            className="w-full p-3 rounded-md bg-[#2a2a3c] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write your message..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition duration-300"
        >
          Send Message
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Contact;