import { readJson, reply } from '@/shared/lib/server/http';
import { errorMessage } from '@/shared/lib/errors';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)
  : null;

export async function retrieveTicket(request: Request): Promise<Response> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = ((await readJson(request)) ?? {}) as Record<string, any>;

  const { searchType, searchValue } = body;

  if (!searchType || !searchValue) {
    return reply({ message: 'Search type and value are required' }, 400);
  }

  if (!supabase) {
    console.error('Supabase is not configured');
    return reply({ 
      message: 'Database not configured. Please contact support.' 
    }, 500);
  }

  try {
    let query = supabase
      .from('attendees')
      .select(`
        id,
        full_name,
        email,
        ticket_type,
        purchase_id,
        ticket_purchases!inner (
          payment_reference,
          paid_at,
          status,
          payment_status
        )
      `)
      .eq('ticket_purchases.status', 'paid')
      .eq('ticket_purchases.payment_status', 'completed');

    // Apply search filter based on type
    if (searchType === 'email') {
      query = query.ilike('email', searchValue.trim());
    } else if (searchType === 'registration') {
      query = query.eq('ticket_purchases.payment_reference', searchValue.trim());
    } else {
      return reply({ message: 'Invalid search type' }, 400);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database query error:', error);
      return reply({ 
        message: 'Failed to retrieve tickets',
        error: error.message 
      }, 500);
    }

    if (!data || data.length === 0) {
      return reply({ 
        message: 'No tickets found with the provided information' 
      }, 404);
    }

    // Format the response
    const tickets = (data as any[]).map(attendee => ({
      id: attendee.id,
      attendee_name: attendee.full_name,
      attendee_email: attendee.email,
      ticket_type: attendee.ticket_type,
      payment_reference: attendee.ticket_purchases.payment_reference,
      paid_at: attendee.ticket_purchases.paid_at,
      status: attendee.ticket_purchases.status
    }));

    return reply({ 
      success: true,
      tickets 
    });

  } catch (error) {
    console.error('Error retrieving tickets:', error);
    return reply({ 
      message: 'An error occurred while retrieving tickets',
      error: errorMessage(error) 
    }, 500);
  }
}
