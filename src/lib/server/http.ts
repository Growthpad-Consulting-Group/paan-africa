import { NextResponse } from 'next/server'

/** JSON response with a status code (the `{ message }` shape the forms read). */
export function reply(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status })
}

export const methodNotAllowed = () => reply({ message: 'Method not allowed' }, 405)

/** Parses a JSON request body; resolves to `null` when it is missing or not valid JSON. */
export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const data = await request.json()
    return data && typeof data === 'object' ? (data as Record<string, unknown>) : null
  } catch {
    return null
  }
}

/** Names of the `required` fields that are missing (falsy) in `body`. */
export function missingFields(body: Record<string, unknown>, required: string[]): string[] {
  return required.filter((field) => !body[field])
}

/** A trimmed string field, or '' when absent or not a string. */
export function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}
