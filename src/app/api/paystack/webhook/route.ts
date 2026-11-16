import { paystackWebhook } from '@/features/payments/server/paystack-webhook';

export const maxDuration = 30;

// Never cached; the body is read raw for signature verification.
export const dynamic = 'force-dynamic';

export const POST = paystackWebhook;
