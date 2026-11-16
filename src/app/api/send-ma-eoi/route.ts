import { sendMaEoi } from '@/features/ma-program/server/send-ma-eoi';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = sendMaEoi;
