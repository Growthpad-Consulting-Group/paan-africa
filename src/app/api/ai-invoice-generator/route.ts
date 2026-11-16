import { aiInvoiceGenerator } from '@/features/tools/server/ai-invoice-generator';

export const maxDuration = 30;

// Other methods get Next's automatic 405.
export const POST = aiInvoiceGenerator;
