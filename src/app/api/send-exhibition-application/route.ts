import { sendExhibitionApplication } from '@/features/summit/server/send-exhibition-application';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = sendExhibitionApplication;
