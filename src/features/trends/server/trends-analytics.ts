import { errorMessage } from '@/utils/errors'
import { mockAnalyticsData, mockFeaturedInsights, getMockData } from '@/lib/mock-data'
import { reply } from '@/lib/server/http'

/** GET /api/trends/analytics: analytics and insights (mock data until the live sources are connected). */
export async function getTrendAnalytics(request: Request): Promise<Response> {
  try {
    const params = new URL(request.url).searchParams
    const period = params.get('period') ?? '7d'
    const region = params.get('region')
    const category = params.get('category')

    const insights = {
      mostTalkedAboutCampaigns: getMockData('viral_campaigns').slice(0, 5),
      topTrendingHashtags: getMockData('trending_hashtags').slice(0, 10),
      featuredInsights: mockFeaturedInsights.slice(0, 3),
    }

    return reply({
      success: true,
      data: { analytics: mockAnalyticsData, insights, period, region, category },
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return reply({ success: false, error: 'Failed to fetch analytics', message: errorMessage(error) }, 500)
  }
}
