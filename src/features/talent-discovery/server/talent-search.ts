import { reply } from '@/lib/server/http';
import { errorMessage } from '@/utils/errors';
import { supabaseAdmin } from '@/lib/server/supabaseAdmin';


export async function searchTalent(request: Request): Promise<Response> {

  try {
    const q = new URL(request.url).searchParams;
    const user_type = q.get('user_type') ?? 'all';
    const skills = q.get('skills') ?? '';
    const countries = q.get('countries') ?? '';
    const is_verified = q.get('is_verified') ?? 'false';
    const is_featured = q.get('is_featured') ?? 'false';
    const search = q.get('search') ?? '';
    const limit = q.get('limit') ?? '50';
    const offset = q.get('offset') ?? '0';
    const sort_by = q.get('sort_by') ?? 'rating';
    const sort_order = q.get('sort_order') ?? 'desc';

    // Build the base query using the profile_search_view
    let query = supabaseAdmin()
      .from('profile_search_view')
      .select(`
        id,
        full_name,
        username,
        user_type,
        tagline,
        bio,
        avatar_url,
        is_verified,
        is_featured,
        rating,
        rating_count,
        city_name,
        latitude,
        longitude,
        country_name,
        country_code,
        country_flag,
        region,
        skills,
        skill_categories,
        created_at,
        last_active
      `);

    // Apply filters
    if (user_type !== 'all') {
      query = query.eq('user_type', user_type);
    }

    if (is_verified === 'true') {
      query = query.eq('is_verified', true);
    }

    if (is_featured === 'true') {
      query = query.eq('is_featured', true);
    }

    // Text search in name, tagline, or bio
    if (search && search.trim()) {
      query = query.or(`full_name.ilike.%${search}%,tagline.ilike.%${search}%,bio.ilike.%${search}%`);
    }

    // Skills filter
    if (skills && skills.trim()) {
      const skillList = skills.split(',').map((s: any) => s.trim()).filter(Boolean);
      if (skillList.length > 0) {
        // Use overlap operator to check if any of the skills match
        query = query.overlaps('skills', skillList);
      }
    }

    // Countries filter
    if (countries && countries.trim()) {
      const countryList = countries.split(',').map((c: any) => c.trim()).filter(Boolean);
      if (countryList.length > 0) {
        query = query.in('country_name', countryList);
      }
    }

    // Sorting
    const validSortFields = ['rating', 'rating_count', 'created_at', 'last_active', 'full_name'];
    const sortField = validSortFields.includes(sort_by) ? sort_by : 'rating';
    const sortDirection = sort_order === 'asc' ? 'asc' : 'desc';
    
    query = query.order(sortField, { ascending: sortDirection === 'asc' });

    // Pagination
    query = query.range(parseInt(String(offset)), parseInt(String(offset)) + parseInt(String(limit)) - 1);

    const { data: profiles, error, count } = await query;

    if (error) {
      console.error('Search error:', error);
      return reply({ error: 'Failed to search profiles' }, 500);
    }

    // Get additional data for each profile (badges, portfolio count)
    const profileIds = profiles.map(p => p.id);
    
    // Get badges for all profiles
    const { data: badges } = await supabaseAdmin()
      .from('profile_badges')
      .select(`
        profile_id,
        badge_id,
        earned_at,
        badges (
          name,
          description,
          icon,
          color
        )
      `)
      .in('profile_id', profileIds)
      .eq('is_visible', true);

    // Get portfolio counts
    const { data: portfolioCounts } = await supabaseAdmin()
      .from('portfolio_items')
      .select('profile_id')
      .in('profile_id', profileIds)
      .eq('is_public', true);

    // Organize badges by profile
    const badgesByProfile: Record<string, unknown[]> = {};
    (badges as any[] | null)?.forEach(badge => {
      if (!badgesByProfile[badge.profile_id]) {
        badgesByProfile[badge.profile_id] = [];
      }
      badgesByProfile[badge.profile_id].push({
        id: badge.badge_id,
        name: badge.badges.name,
        description: badge.badges.description,
        icon: badge.badges.icon,
        color: badge.badges.color,
        earned_at: badge.earned_at
      });
    });

    // Count portfolios by profile
    const portfolioCountsByProfile: Record<string, number> = {};
    portfolioCounts?.forEach(item => {
      portfolioCountsByProfile[item.profile_id] = (portfolioCountsByProfile[item.profile_id] || 0) + 1;
    });

    // Enhance profiles with additional data
    const enhancedProfiles = profiles.map(profile => ({
      ...profile,
      badges: badgesByProfile[profile.id] || [],
      portfolio_count: portfolioCountsByProfile[profile.id] || 0
    }));

    return reply({
      success: true,
      data: enhancedProfiles,
      pagination: {
        limit: parseInt(String(limit)),
        offset: parseInt(String(offset)),
        total: count
      },
      filters: {
        user_type,
        skills: skills ? skills.split(',').map((s: any) => s.trim()) : [],
        countries: countries ? countries.split(',').map((c: any) => c.trim()) : [],
        is_verified: is_verified === 'true',
        is_featured: is_featured === 'true',
        search
      }
    });

  } catch (error) {
    console.error('Search API error:', error);
    return reply({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? errorMessage(error) : undefined
    }, 500);
  }
}

// Additional endpoint for getting search suggestions
export async function getSearchSuggestions(req: any, res: any) {
  try {
    const { type = 'skills', query = '' } = req.query;

    if (type === 'skills') {
      const { data: skills } = await supabaseAdmin()
        .from('skills')
        .select('name')
        .ilike('name', `%${query}%`)
        .limit(10);

      return reply({
        success: true,
        suggestions: skills?.map(s => s.name) || []
      });
    }

    if (type === 'countries') {
      const { data: countries } = await supabaseAdmin()
        .from('countries')
        .select('name')
        .ilike('name', `%${query}%`)
        .limit(10);

      return reply({
        success: true,
        suggestions: countries?.map(c => c.name) || []
      });
    }

    return reply({ error: 'Invalid suggestion type' }, 400);

  } catch (error) {
    console.error('Suggestions API error:', error);
    return reply({ error: 'Failed to get suggestions' }, 500);
  }
}
