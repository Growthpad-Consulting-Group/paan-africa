import { sendSummitTicket } from '@/features/tickets/server/send-summit-ticket';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = sendSummitTicket;
