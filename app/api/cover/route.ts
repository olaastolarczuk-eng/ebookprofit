import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { title, style, chapter } = await req.json()

    let stylePrompt = 'minimalist ebook cover'

    if (style === 'course') {
      stylePrompt = 'modern online course ebook cover, bright colors'
    }

    if (style === 'book') {
      stylePrompt = 'classic book cover, elegant, editorial style'
    }

    // domyślny prompt – okładka
    let prompt = `
Professional ebook cover design.

Title: ${title}
Style: ${stylePrompt}

Include:
- strong visual illustration
- symbolic elements
- modern composition
- bold readable title

No plain color backgrounds.
No logos or watermarks.
`

    // jeśli to grafika rozdziału
    if (chapter) {
      prompt = `
Illustration for an ebook chapter.

Chapter: ${chapter}
Topic: ${title}

Create a modern, clean illustration.
No text on the image.
No logos or watermarks.
Visually engaging and professional.
`
    }

    const image = await openai.images.generate({
      model: 'gpt-image-1',
      prompt,
      size: '1024x1536',
    })

    const base64 = image.data[0].b64_json

    return NextResponse.json({ image: base64 })
  } catch (err) {
    console.error('Cover error:', err)
    return NextResponse.json(
      { error: 'Cover generation failed' },
      { status: 500 }
    )
  }
}