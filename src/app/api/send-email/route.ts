import { sendEmail } from '@/features/contact/server/send-email';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = sendEmail;
