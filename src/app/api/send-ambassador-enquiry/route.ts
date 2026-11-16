import { sendAmbassadorEnquiry } from '@/features/ambassador/server/send-ambassador-enquiry';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = sendAmbassadorEnquiry;
