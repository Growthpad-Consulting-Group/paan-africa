import { NextResponse } from 'next/server'

/** GET /api/verify-payment?reference=...: asks Paystack whether a transaction succeeded. */
export async function verifyPayment(request: Request): Promise<Response> {
  const reference = new URL(request.url).searchParams.get('reference')

  if (!reference) {
    return NextResponse.json({ error: 'Reference required' }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Verification failed' }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to reach Paystack' }, { status: 502 })
  }
}
