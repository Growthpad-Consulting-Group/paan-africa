import { retrieveTicket } from '@/features/tickets/server/retrieve-ticket';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = retrieveTicket;
