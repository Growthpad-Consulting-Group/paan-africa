import { buildMetadata } from '@/lib/seo';
import { translate as t } from '@/hooks/useTranslations';
import PartnersPage from '@/features/partners/components/PartnersPage';

export const metadata = buildMetadata({
  path: '/partners',
  title: t('partners.seo.title'),
  description: t('partners.seo.description'),
  keywords: t('partners.seo.keywords'),
});

export default function Page() {
  return <PartnersPage />;
}
