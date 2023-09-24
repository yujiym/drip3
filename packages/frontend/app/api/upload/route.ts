import { put } from '@vercel/blob'
import { customAlphabet } from 'nanoid'

export const runtime = 'edge'

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  5
)
export async function POST(req: Request): Promise<string> {
  const file = req.body || ''
  const contentType = req.headers.get('content-type') || 'text/plain'
  const filename = `${nanoid()}.${contentType.split('/')[1]}`
  const blob = await put(filename, file, {
    contentType,
    access: 'public',
  })

  return blob.url
}