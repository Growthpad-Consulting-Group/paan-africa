import { sendAcademyEnquiry } from '@/features/academy/server/send-academy-enquiry';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = sendAcademyEnquiry;
