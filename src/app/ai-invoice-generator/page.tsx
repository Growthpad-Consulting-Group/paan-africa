import { buildMetadata } from '@/lib/seo';
import AiInvoiceGeneratorPage from '@/features/tools/components/AiInvoiceGeneratorPage';

export const metadata = buildMetadata({
  path: '/ai-invoice-generator',
  title: 'Free AI Invoice Generator | PAAN',
  description: "Generate professional, client-ready invoices in seconds with PAAN's free AI-powered invoice generator. Perfect for agencies, freelancers, and businesses across Africa.",
  keywords: 'AI invoice generator, professional invoices, invoice template, business invoicing, PAAN AI tools, African business tools, free invoice generator',
});

export default function Page() {
  return <AiInvoiceGeneratorPage />;
}
