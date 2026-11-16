import { getTrends, refreshTrends } from '@/features/trends/server/trends-index';

export const dynamic = 'force-dynamic';

export const GET = getTrends;
export const POST = refreshTrends;
