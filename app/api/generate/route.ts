import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { topic } = await req.json()

    // 1. Generowanie spisu treści
    const tocCompletion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'Jesteś ekspertem od pisania profesjonalnych ebooków.',
        },
        {
          role: 'user',
          content: `Stwórz spis treści ebooka na temat: "${topic}".

Zasady:
- 7–8 rozdziałów
- logiczna, sprzedażowa struktura
- zwróć tylko listę rozdziałów`,
        },
      ],
    })

    const toc = tocCompletion.choices[0].message.content || ''

    const chapters = toc
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    // 2. Generowanie rozdziałów równolegle
    const chapterPromises = chapters.map((chapterTitle) =>
      openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content:
              'Jesteś profesjonalnym autorem ebooków biznesowych.',
          },
          {
            role: 'user',
            content: `
Napisz rozdział ebooka.

Temat ebooka: "${topic}"
Tytuł rozdziału: "${chapterTitle}"

Wymagania:
- długość: 800–1200 słów
- styl: profesjonalny, biznesowy
- dodawaj przykłady, case study i ciekawostki
- język: polski
`,
          },
        ],
        temperature: 0.7,
      })
    )

    const chapterResults = await Promise.all(chapterPromises)

    let fullEbook = `Tytuł: ${topic}\n\nSpis treści:\n${toc}\n\n`

    chapterResults.forEach((result, index) => {
      const chapterText = result.choices[0].message.content
      fullEbook += `\n\n${chapters[index]}\n\n${chapterText}\n`
    })

    return NextResponse.json({ text: fullEbook })
  } catch (err: any) {
    console.error('AI error:', err)
    return NextResponse.json(
      { error: 'Błąd generowania ebooka' },
      { status: 500 }
    )
  }
}