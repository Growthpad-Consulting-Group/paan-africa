import { sendSpeakerApplication } from '@/features/summit/server/send-speaker-application';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = sendSpeakerApplication;
