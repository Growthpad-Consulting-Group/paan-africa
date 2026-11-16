import { sendCategoryNomination } from '@/features/awards/server/send-category-nomination';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = sendCategoryNomination;
