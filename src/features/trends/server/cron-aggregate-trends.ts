import { errorMessage } from '@/shared/lib/errors'
import { aggregateAllTrends } from '@/features/trends/lib/trends-api'
import { reply } from '@/shared/lib/server/http'

/** POST /api/cron/aggregate-trends: scheduled trend aggregation, protected by CRON_SECRET_TOKEN. */
export async function aggregateTrends(request: Request): Promise<Response> {
  // Verify the request is from a legitimate cron service
  const authHeader = request.headers.get('authorization')
  const expectedToken = process.env.CRON_SECRET_TOKEN

  if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
    return reply({ success: false, error: 'Unauthorized', message: 'Invalid or missing authorization token' }, 401)
  }

  try {
    console.log('Starting automated trend aggregation...')

    const startTime = Date.now()
    const results = await aggregateAllTrends()
    const duration = Date.now() - startTime

    console.log(`Trend aggregation completed in ${duration}ms`)

    const summary = {
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      design_trends_count: results.design_trends.length,
      viral_campaigns_count: results.viral_campaigns.length,
      trending_hashtags_count: results.trending_hashtags.length,
      creative_news_count: results.creative_news.length,
      total_items: Object.values(results).reduce((sum, arr) => sum + arr.length, 0),
    }

    console.log('Aggregation summary:', summary)

    return reply({
      success: true,
      message: 'Trend aggregation completed successfully',
      data: summary,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error in automated trend aggregation:', error)
    return reply(
      { success: false, error: 'Aggregation failed', message: errorMessage(error), timestamp: new Date().toISOString() },
      500
    )
  }
}
