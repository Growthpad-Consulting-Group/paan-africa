import { sendPartnerEnquiry } from '@/features/contact/server/send-partner-enquiry';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = sendPartnerEnquiry;
