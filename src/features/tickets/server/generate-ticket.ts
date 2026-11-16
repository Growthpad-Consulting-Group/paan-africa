import { errorMessage } from '@/utils/errors'
import { generateTicketImage } from '@/lib/ticketGenerator'
import { readJson, reply } from '@/lib/server/http'

/** POST /api/generate-ticket: renders a ticket PNG from the posted ticket data. */
export async function generateTicket(request: Request): Promise<Response> {
  try {
    const body = (await readJson(request)) ?? {}
    const ticketData = body.ticketData as Parameters<typeof generateTicketImage>[0] | undefined

    if (!ticketData) {
      return reply({ success: false, message: 'Missing ticket data' }, 400)
    }

    // Generate the ticket image
    const imageBuffer = await generateTicketImage(ticketData)

    if (!imageBuffer || imageBuffer.length === 0) {
      throw new Error('Generated image buffer is empty')
    }

    // Ensure it's a proper Node.js Buffer
    const buffer = Buffer.isBuffer(imageBuffer) ? imageBuffer : Buffer.from(imageBuffer)

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': String(buffer.length),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('Error generating ticket:', error)
    return reply({ success: false, message: 'Failed to generate ticket image', error: errorMessage(error) }, 500)
  }
}
