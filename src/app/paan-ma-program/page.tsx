import { buildMetadata } from '@/lib/seo';
import { translate as t } from '@/hooks/useTranslations';
import MaProgramPage from '@/features/ma-program/components/MaProgramPage';

export const metadata = buildMetadata({
  path: '/paan-ma-program',
  title: t('paanMaProgram.seo.title'),
  description: t('paanMaProgram.seo.description'),
  keywords: t('paanMaProgram.seo.keywords'),
  canonicalUrl: 'https://paan.africa/paan-ma-program',
});

export default function Page() {
  return <MaProgramPage />;
}
