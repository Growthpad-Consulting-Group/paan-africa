import fs from 'fs'
import os from 'os'
import path from 'path'

export type UploadedFile = {
  originalFilename: string
  mimetype: string
  size: number
  /** Temp file the upload was written to (same shape formidable gave the old handlers). */
  filepath: string
}

export type ParsedForm = {
  fields: Record<string, string[]>
  files: Record<string, UploadedFile[]>
}

type Limits = {
  maxFileSize?: number
  maxFiles?: number
  /** Return false to silently skip a file (formidable's `filter`). */
  filter?: (file: { name: string; originalFilename: string; mimetype: string }) => boolean
}

/**
 * Parses a multipart/form-data request into the `{ fields, files }` shape formidable produced
 * (every value an array), so the upload handlers kept their logic when `formidable` was dropped.
 * Files are written to the OS temp dir; callers delete them when done.
 */
export async function parseMultipart(request: Request, limits: Limits = {}): Promise<ParsedForm> {
  const { maxFileSize = 10 * 1024 * 1024, maxFiles = 10, filter } = limits
  const form = await request.formData()
  const fields: ParsedForm['fields'] = {}
  const files: ParsedForm['files'] = {}
  let fileCount = 0

  for (const [name, value] of form.entries()) {
    if (typeof value === 'string') {
      ;(fields[name] ??= []).push(value)
      continue
    }
    if (value.size === 0 && !value.name) continue // empty file input
    if (filter && !filter({ name, originalFilename: value.name, mimetype: value.type })) continue
    if (++fileCount > maxFiles) throw new Error('Too many files')
    if (value.size > maxFileSize) throw new Error('File too large')
    const filepath = path.join(os.tmpdir(), `upload_${Date.now()}_${Math.random().toString(36).slice(2)}_${value.name || 'file'}`)
    fs.writeFileSync(filepath, Buffer.from(await value.arrayBuffer()))
    ;(files[name] ??= []).push({ originalFilename: value.name, mimetype: value.type, size: value.size, filepath })
  }
  return { fields, files }
}
