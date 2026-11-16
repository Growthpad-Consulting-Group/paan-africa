import { errorMessage } from '@/utils/errors'
import { generatePDFTicket } from '@/lib/pdfTicketGenerator'
import { readJson, reply } from '@/lib/server/http'

/** POST /api/generate-pdf-ticket: renders a ticket PDF from the posted ticket data. */
export async function generatePdfTicket(request: Request): Promise<Response> {
  try {
    const body = (await readJson(request)) ?? {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ticketData = body.ticketData as Record<string, any> | undefined

    if (!ticketData) {
      return reply({ success: false, message: 'Missing ticket data' }, 400)
    }

    // Generate the PDF ticket
    const pdfBuffer = await generatePDFTicket(ticketData)

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="paan-summit-ticket-${ticketData.ticketId}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generating PDF ticket:', error)
    return reply({ success: false, message: 'Failed to generate PDF ticket', error: errorMessage(error) }, 500)
  }
}
