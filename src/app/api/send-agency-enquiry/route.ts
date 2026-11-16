import { sendAgencyEnquiry } from '@/features/agencies/server/send-agency-enquiry';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = sendAgencyEnquiry;
