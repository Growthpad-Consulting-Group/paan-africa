import { subscribeNewsletter } from '@/features/newsletter/server/subscribe-newsletter';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = subscribeNewsletter;
