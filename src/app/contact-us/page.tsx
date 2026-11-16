import { buildMetadata } from '@/shared/lib/seo';
import ContactUsPage from '@/features/contact/components/ContactUsPage';

export const metadata = buildMetadata({
  path: '/contact-us',
  title: 'Contact Us | Get in Touch with PAAN | Pan-African Agency Network',
  description: "Contact the Pan-African Agency Network (PAAN) for inquiries, partnerships, membership information, and support. Reach out to our team to learn how we can help your agency grow and connect with Africa's creative and tech community.",
  keywords: 'contact PAAN, PAAN contact, Pan-African Agency Network contact, reach out to PAAN, PAAN support, PAAN inquiry, PAAN partnership, PAAN membership inquiry, contact African agencies network, PAAN customer service, get in touch with PAAN, PAAN help, PAAN assistance, African agency network contact',
});

export default function Page() {
  return <ContactUsPage />;
}
