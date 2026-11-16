import { buildMetadata } from '@/lib/seo';
import AiBusinessPlanGeneratorPage from '@/features/tools/components/AiBusinessPlanGeneratorPage';

export const metadata = buildMetadata({
  path: '/ai-business-plan-generator',
  title: 'Free AI Business Plan Generator | PAAN',
  description: "Generate comprehensive, investor-ready business plans in seconds with PAAN's free AI-powered business plan generator. Perfect for entrepreneurs, startups, and businesses across Africa.",
  keywords: 'AI business plan generator, professional business plans, business plan template, startup business plan, PAAN AI tools, African business tools, free business plan generator, investor-ready business plan',
});

export default function Page() {
  return <AiBusinessPlanGeneratorPage />;
}
