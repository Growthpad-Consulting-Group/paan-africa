import { aiBusinessPlanGenerator } from '@/features/tools/server/ai-business-plan-generator';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = aiBusinessPlanGenerator;
