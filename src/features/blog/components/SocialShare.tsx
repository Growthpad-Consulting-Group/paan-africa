"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const SocialShare = ({ title }: { title: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`
  };

  return (
    <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
      <div className="flex flex-col gap-3 bg-white/40 rounded-full p-3 shadow-lg">
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] hover:scale-110 transition-transform" title="Share on Twitter">
          <Icon icon="mdi:twitter" className="w-6 h-6" />
        </a>
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-[#4267B2] hover:scale-110 transition-transform" title="Share on Facebook">
          <Icon icon="mdi:facebook" className="w-6 h-6" />
        </a>
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:scale-110 transition-transform" title="Share on LinkedIn">
          <Icon icon="mdi:linkedin" className="w-6 h-6" />
        </a>
        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-110 transition-transform" title="Share on WhatsApp">
          <Icon icon="mdi:whatsapp" className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default SocialShare;
