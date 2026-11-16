import { sendAgencyContact } from '@/features/agencies/server/send-agency-contact';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = sendAgencyContact;
