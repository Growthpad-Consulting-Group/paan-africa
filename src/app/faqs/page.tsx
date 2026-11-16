import { buildMetadata } from '@/shared/lib/seo';
import { translate as t } from '@/shared/hooks/useTranslations';
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
