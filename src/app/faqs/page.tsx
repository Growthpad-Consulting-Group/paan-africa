import { buildMetadata } from '@/lib/seo';
import { translate as t } from '@/hooks/useTranslations';
import FaqsPage from '@/features/faqs/components/FaqsPage';

export const metadata = buildMetadata({
  path: '/faqs',
  title: t('faqs.seo.title'),
  description: t('faqs.seo.description'),
  keywords: t('faqs.seo.keywords'),
});

export default function Page() {
  return <FaqsPage />;
}
