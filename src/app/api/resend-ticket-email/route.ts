import { resendTicketEmail } from '@/features/tickets/server/resend-ticket-email';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = resendTicketEmail;
