"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { errorMessage } from "@/utils/errors";


export default function NewsletterSubscribe() {
  const [subscribeForm, setSubscribeForm] = useState({ name: '', email: '' });
  const [subscribeStatus, setSubscribeStatus] = useState({ loading: false, message: '', error: false });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus({ loading: true, message: '', error: false });

    try {
      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscribeForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed');
      }

      setSubscribeStatus({
        loading: false,
        message: 'Thank you for subscribing! Please check your email for confirmation.',
        error: false
      });
      setSubscribeForm({ name: '', email: '' }); // Reset form
      
      // Show success toast
      toast.success('Successfully subscribed! Please check your email for confirmation.');
    } catch (error) {
      setSubscribeStatus({
        loading: false,
        message: errorMessage(error, '') || 'Failed to subscribe. Please try again.',
        error: true
      });
      
      // Show error toast
      toast.error(errorMessage(error, '') || 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="mt-20 bg-gradient-to-r from-[#172840] to-[#243a52] rounded-2xl p-8 md:p-12 text-center text-white">
      <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
      <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
        Subscribe to our newsletter and never miss the latest insights from Africa's creative and tech landscape.
      </p>
      
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={subscribeForm.name}
          onChange={(e) => setSubscribeForm(prev => ({ ...prev, name: e.target.value }))}
          required
          className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-paan-yellow" 
        />
        <input 
          type="email" 
          placeholder="Enter your email address"
          value={subscribeForm.email}
          onChange={(e) => setSubscribeForm(prev => ({ ...prev, email: e.target.value }))}
          required
          className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F2B706]"
        />
        <button 
          type="submit"
          disabled={subscribeStatus.loading}
          className={`bg-paan-red text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
            subscribeStatus.loading 
              ? 'opacity-75 cursor-not-allowed' 
              : 'hover:bg-paan-red'
          }`}
        >
          {subscribeStatus.loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subscribing...
            </span>
          ) : 'Subscribe'}
        </button>
      </form>
    
      {/* Status Message */}
      {subscribeStatus.message && (
        <div className={`mt-4 text-sm font-medium ${
          subscribeStatus.error ? 'text-red-300' : 'text-green-300'
        }`}>
          {subscribeStatus.message}
        </div>
      )}
    </div>
  );
}
