"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export default function PostNewsletter() {
  const [subscribeForm, setSubscribeForm] = useState({ name: '', email: '' });
  const [subscribeStatus, setSubscribeStatus] = useState({ loading: false, message: '', error: false });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus({ loading: true, message: '', error: false });
    try {
      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscribeForm),
      });
      if (response.ok) {
        setSubscribeStatus({ loading: false, message: 'Subscription successful! Please check your email for confirmation.', error: false });
        setSubscribeForm({ name: '', email: '' });
      } else {
        const data = await response.json().catch(() => ({}));
        setSubscribeStatus({ loading: false, message: data.message || 'Subscription failed. Please try again later.', error: true });
      }
    } catch (err) {
      setSubscribeStatus({ loading: false, message: 'An error occurred. Please try again later.', error: true });
    }
  };

  return (
        <div className="bg-gradient-to-r from-paan-dark-blue to-paan-dark-blue rounded-xl p-8 mt-12 md:p-12 text-center text-white mb-8">
      <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
      <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
        Subscribe to our newsletter and never miss the latest insights from Africa's creative and tech landscape.
      </p>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Enter your name"
          value={subscribeForm.name}
          onChange={(e) => setSubscribeForm((prev) => ({ ...prev, name: e.target.value }))}
          required
          className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-paan-yellow"
        />
        <input
          type="email"
          placeholder="Enter your email address"
          value={subscribeForm.email}
          onChange={(e) => setSubscribeForm((prev) => ({ ...prev, email: e.target.value }))}
          required
          className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-paan-yellow"
        />
        <button
          type="submit"
          disabled={subscribeStatus.loading}
          className={`bg-paan-red text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${subscribeStatus.loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-paan-red'}`}
        >
          {subscribeStatus.loading ? (
            <span className="flex items-center justify-center">
              <Icon icon="eos-icons:loading" className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
              Subscribing...
            </span>
          ) : 'Subscribe'}
        </button>
      </form>
      {subscribeStatus.message && (
        <div className={`mt-4 text-sm font-medium ${subscribeStatus.error ? 'text-red-300' : 'text-green-300'}`}>
          {subscribeStatus.message}
        </div>
      )}
    </div>
  );
}
