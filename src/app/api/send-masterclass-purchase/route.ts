import { sendMasterclassPurchase } from '@/features/masterclasses/server/send-masterclass-purchase';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = sendMasterclassPurchase;
