import { sendExperienceBooking } from '@/features/summit/server/send-experience-booking';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = sendExperienceBooking;
