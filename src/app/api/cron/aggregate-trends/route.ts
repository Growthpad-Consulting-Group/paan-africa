import { aggregateTrends } from '@/features/trends/server/cron-aggregate-trends';

export const maxDuration = 30;

export const POST = aggregateTrends;
