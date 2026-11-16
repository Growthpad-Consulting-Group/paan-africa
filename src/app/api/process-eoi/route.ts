import { processEoi } from '@/features/membership/server/process-eoi';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = processEoi;
