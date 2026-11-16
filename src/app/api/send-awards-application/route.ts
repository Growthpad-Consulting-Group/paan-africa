import { sendAwardsApplication } from '@/features/awards/server/send-awards-application';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = sendAwardsApplication;
