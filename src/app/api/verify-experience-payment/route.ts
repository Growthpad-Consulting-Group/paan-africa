import { verifyExperiencePayment } from '@/features/summit/server/verify-experience-payment';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = verifyExperiencePayment;
