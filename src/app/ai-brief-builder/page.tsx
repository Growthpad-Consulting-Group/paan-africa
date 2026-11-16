import { buildMetadata } from '@/lib/seo';
import AiBriefBuilderPage from '@/features/tools/components/AiBriefBuilderPage';

export const metadata = buildMetadata({
  path: '/ai-brief-builder',
  title: 'PAAN AI Brief Builder | Generate Professional Creative Briefs',
  description: "Use PAAN's AI-powered brief builder to generate comprehensive, professional creative briefs in seconds. Streamline your creative process with our intelligent brief generator.",
  keywords: 'AI brief builder, creative brief generator, marketing brief, project brief, PAAN AI tools',
});

export default function Page() {
  return <AiBriefBuilderPage />;
}
