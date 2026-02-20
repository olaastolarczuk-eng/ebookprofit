import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { topic, style } = await req.json()

    const prompt = `
Napisz ebook na temat: "${topic}"

Struktura:
- Tytuł
- Spis treści
- 5–7 rozdziałów
- Podsumowanie

Styl:
- profesjonalny
- biznesowy
- zrozumiały
- gotowy do sprzedaży
`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: 'Jesteś ekspertem od tworzenia ebooków.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    })

    const text = completion.choices[0].message.content

    return NextResponse.json({ text })
  } catch (err: any) {
    console.error('AI error:', err)
    return NextResponse.json(
      { error: 'Błąd generowania ebooka' },
      { status: 500 }
    )
  }
}