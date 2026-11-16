import { buildMetadata } from '@/shared/lib/seo';
import PdfEditorPage from '@/features/tools/components/PdfEditorPage';

export const metadata = buildMetadata({
  path: '/pdf-editor',
  title: 'Free Online PDF Editor | Edit & Sign | PAAN',
  description: 'Free PDF editor in your browser: preview PDFs, add text and signatures, watermark, page numbers, merge or split files, then download. Private client-side editing by PAAN Africa.',
  keywords: 'free PDF editor, online PDF editor, edit PDF free, merge PDF, split PDF, sign PDF online, PDF signature, watermark PDF, PDF tools, PAAN Africa, paan.africa',
  canonicalUrl: 'https://paan.africa/pdf-editor',
  ogTitle: 'Free PDF Editor - Edit, merge & sign PDFs online | PAAN',
  ogDescription: 'Merge, split, sign, and annotate PDFs in your browser. Free PDF editor with preview, text, signatures, and watermarks. No server upload of your files.',
  twitterTitle: 'Free PDF Editor | PAAN Africa',
  twitterDescription: 'Edit, merge, split, and sign PDFs free in your browser. Preview, text, watermarks, and more.',
});

export default function Page() {
  return <PdfEditorPage />;
}
