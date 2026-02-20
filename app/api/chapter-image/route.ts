import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { title } = await req.json()

    const prompt = `
Minimalist illustration for an ebook chapter.
Topic: ${title}
Style: modern, clean, soft colors, abstract, professional, no text.
`

    const image = await openai.images.generate({
      model: 'gpt-image-1',
      prompt,
      size: '1536x1024',
    })

    if (!image.data || image.data.length === 0) {
  return NextResponse.json(
    { error: 'Nie udało się wygenerować obrazu' },
    { status: 500 }
  )
}

return NextResponse.json({
  image: image.data[0].b64_json,
})

  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Image generation failed' },
      { status: 500 }
    )
  }
}