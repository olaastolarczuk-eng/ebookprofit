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
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Jesteś ekspertem od pisania profesjonalnych ebooków.',
        },
        {
          role: 'user',
          content: `Stwórz spis treści ebooka na temat: "${topic}".

Zasady:
- 4–5 rozdziałów
- logiczna, sprzedażowa struktura
- nie pisz nagłówka "Spis treści"
- nie powtarzaj spisu
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
Napisz treść rozdziału ebooka.

Temat ebooka: "${topic}"
Tytuł rozdziału: "${chapterTitle}"

Struktura rozdziału:

1. Krótkie wprowadzenie do tematu

2. Sekcja pierwsza – wyjaśnienie tematu

3. Sekcja druga – praktyczne strategie

4. Sekcja trzecia – przykłady lub case study

5. Wskazówki praktyczne (lista punktowana)

6. Podsumowanie rozdziału


Zasady:

- nie powtarzaj tytułu rozdziału
- nie używaj znaków ### ani **
- pisz akapitami
- używaj list punktowanych zaczynających się od "- "
- styl: profesjonalny ale przystępny



WAŻNE:
- Zaczynaj od tytułu rozdziału w treści.
- Zacznij od razu od pierwszego akapitu.

Wymagania:
- długość: 400–600 słów
- pisz krótkimi akapitami (2–3 zdania)
- unikaj bardzo długich bloków tekstu
- dodawaj przykłady, case study i ciekawostki
- język: polski
`,
          },
        ],
        temperature: 0.7,
      })
    )

   const chapterResults = await Promise.all(chapterPromises)

let fullEbook = `Tytuł: ${topic}\n\n===SPIS_TRESCI===\n${toc}\n===KONIEC_SPISU===\n\n`

const seenHeadings = new Set<string>()

chapterResults.forEach((result) => {
  let chapterText = result.choices[0].message.content || ''

  const lines = chapterText.split('\n')

  const cleanedLines = lines.filter((line) => {
    const trimmed = line.trim()

    // wykryj nagłówki typu "2. Coś tam"
    if (/^\d+\.\s+/.test(trimmed)) {
      if (seenHeadings.has(trimmed)) {
        return false // usuń duplikat
      }
      seenHeadings.add(trimmed)
    }

    return true
  })

  fullEbook += `\n\n${cleanedLines.join('\n').trim()}\n`
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