import { updateBookingPaymentReference } from '@/features/summit/server/update-booking-payment-reference';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = updateBookingPaymentReference;
