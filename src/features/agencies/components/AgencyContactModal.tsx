"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import type { Agency, Localized } from "@/features/agencies/lib/agencyService";
import ReCAPTCHA from "react-google-recaptcha";

type Props = {
  onClose: () => void;
  agency: Agency;
  L: (value: Localized | undefined) => string;
  t: (key: string) => string;
};

export default function AgencyContactModal({ onClose, agency, L, t }: Props) {
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', message: '' });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const { siteKey: recaptchaSiteKey, ref: recaptchaRef, token: recaptchaToken, setToken: setRecaptchaToken } = useRecaptcha();

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (contactErrors[name]) {
      setContactErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle reCAPTCHA change
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    setContactErrors(prev => ({
      ...prev,
      recaptcha: ''
    }));
  };

  const validateContactForm = () => {
    const newErrors: Record<string, string> = {};
    if (!contactForm.name.trim()) newErrors.name = t('certifiedAgencies.common.contactModal.errors.nameRequired');
    if (!contactForm.email.trim()) {
      newErrors.email = t('certifiedAgencies.common.contactModal.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      newErrors.email = t('certifiedAgencies.common.contactModal.errors.invalidEmail');
    }
    if (!contactForm.company.trim()) newErrors.company = t('certifiedAgencies.common.contactModal.errors.companyRequired');
    if (!contactForm.message.trim()) newErrors.message = t('certifiedAgencies.common.contactModal.errors.messageRequired');
    if (!recaptchaToken) newErrors.recaptcha = t('certifiedAgencies.common.contactModal.errors.recaptchaRequired');
    return newErrors;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateContactForm();
    if (Object.keys(validationErrors).length > 0) {
      setContactErrors(validationErrors);
      toast.error(t('certifiedAgencies.common.toast.fillRequiredFields'));
      return;
    }

    setIsSending(true);
    const toastId = toast.loading(t('certifiedAgencies.common.toast.sendingMessage'));

    try {
      const res = await fetch('/api/send-agency-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...contactForm, 
          recaptchaToken,
          agency: agency.name 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(t('certifiedAgencies.common.toast.messageSent'), { id: toastId });
        // Reset form and reCAPTCHA
        setContactForm({ name: '', email: '', company: '', message: '' });
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
        onClose();
      } else {
        toast.error(data.message || t('certifiedAgencies.common.toast.messageFailed'), { id: toastId });
      }
    } catch (error) {
      toast.error(t('certifiedAgencies.common.toast.errorOccurred'), { id: toastId });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full relative overflow-hidden shadow-xl">
        {/* Close button */}
        <button
          onClick={() => { 
            onClose();
          }}
          className="absolute top-4 right-4 text-[#172840] hover:text-[#F25849] transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
    
        {/* Modal content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-[#172840] mb-2">{`Contact ${agency.name}`}</h2>
            <p className="text-gray-600">{L(agency.contactDescription) || 'Get in touch with our team for your creative marketing needs'}</p>
          </div>
    
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-[#172840] mb-1">
                  {t('certifiedAgencies.common.contactModal.form.fullName')} <span className="text-[#F25849]">{t('certifiedAgencies.common.contactModal.form.required')}</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  value={contactForm.name}
                  onChange={handleContactChange}
                  disabled={isSending}
                  className={`w-full px-4 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                    contactErrors.name ? 'border-red-500' : ''
                  } ${isSending ? 'opacity-50' : ''}`}
                />
                {contactErrors.name && <p className="text-red-500 text-sm mt-1">{contactErrors.name}</p>}
              </div>
    
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-[#172840] mb-1">
                  {t('certifiedAgencies.common.contactModal.form.emailAddress')} <span className="text-[#F25849]">{t('certifiedAgencies.common.contactModal.form.required')}</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  value={contactForm.email}
                  onChange={handleContactChange}
                  disabled={isSending}
                  className={`w-full px-4 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                    contactErrors.email ? 'border-red-500' : ''
                  } ${isSending ? 'opacity-50' : ''}`}
                />
                {contactErrors.email && <p className="text-red-500 text-sm mt-1">{contactErrors.email}</p>}
              </div>
    
              <div className="md:col-span-2">
                <label htmlFor="contact-company" className="block text-sm font-medium text-[#172840] mb-1">
                  {t('certifiedAgencies.common.contactModal.form.companyName')} <span className="text-[#F25849]">{t('certifiedAgencies.common.contactModal.form.required')}</span>
                </label>
                <input
                  type="text"
                  id="contact-company"
                  name="company"
                  required
                  value={contactForm.company}
                  onChange={handleContactChange}
                  disabled={isSending}
                  className={`w-full px-4 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                    contactErrors.company ? 'border-red-500' : ''
                  } ${isSending ? 'opacity-50' : ''}`}
                />
                {contactErrors.company && <p className="text-red-500 text-sm mt-1">{contactErrors.company}</p>}
              </div>
            </div>
    
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-[#172840] mb-1">
                {t('certifiedAgencies.common.contactModal.form.message')} <span className="text-[#F25849]">{t('certifiedAgencies.common.contactModal.form.required')}</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                value={contactForm.message}
                onChange={handleContactChange}
                disabled={isSending}
                rows={4}
                className={`w-full px-4 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 resize-none ${
                  contactErrors.message ? 'border-red-500' : ''
                } ${isSending ? 'opacity-50' : ''}`}
                placeholder={t('certifiedAgencies.common.contactModal.form.placeholder')}
              ></textarea>
              {contactErrors.message && <p className="text-red-500 text-sm mt-1">{contactErrors.message}</p>}
            </div>
    
            {/* reCAPTCHA */}
            <div>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={recaptchaSiteKey as string}
                onChange={handleRecaptchaChange}
              />
              {contactErrors.recaptcha && (
                <p className="text-red-500 text-sm mt-1">{contactErrors.recaptcha}</p>
              )}
            </div>
    
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSending}
                className={`bg-[#F25849] text-white py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] hover:shadow-lg font-medium text-sm ${
                  isSending ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSending ? t('certifiedAgencies.common.contactModal.form.sending') : t('certifiedAgencies.common.contactModal.form.sendMessage')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
