import { errorMessage } from '@/utils/errors'
import { getMockData } from '@/lib/mock-data'
import { reply } from '@/lib/server/http'

/** GET /api/trends: trend items by type (mock data until the live sources are connected). */
export async function getTrends(request: Request): Promise<Response> {
  try {
    const params = new URL(request.url).searchParams
    const type = params.get('type') ?? 'design_trends'
    const limit = parseInt(params.get('limit') ?? '20', 10)
    const offset = parseInt(params.get('offset') ?? '0', 10)
    const category = params.get('category')
    const region = params.get('region')
    const featured = params.get('featured') ?? false

    let trends = getMockData(type, { category, region, featured })

    // Apply limit and offset
    if (limit) {
      trends = trends.slice(offset, offset + limit)
    }

    return reply({
      success: true,
      data: trends,
      pagination: { limit, offset, hasMore: trends.length === limit },
    })
  } catch (error) {
    console.error('Error fetching trends:', error)
    return reply({ success: false, error: 'Failed to fetch trends', message: errorMessage(error) }, 500)
  }
}

/** POST /api/trends: manual trigger for trend aggregation (mock data). */
export async function refreshTrends(): Promise<Response> {
  try {
    return reply({
      success: true,
      message: 'Mock data refresh completed successfully',
      data: {
        design_trends_count: getMockData('design_trends').length,
        viral_campaigns_count: getMockData('viral_campaigns').length,
        trending_hashtags_count: getMockData('trending_hashtags').length,
        creative_news_count: getMockData('creative_news').length,
      },
    })
  } catch (error) {
    console.error('Error in mock data refresh:', error)
    return reply({ success: false, error: 'Failed to refresh mock data', message: errorMessage(error) }, 500)
  }
}
