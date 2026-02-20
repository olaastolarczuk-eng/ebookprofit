import { NextResponse } from 'next/server'
import { Document, Packer, Paragraph, TextRun } from 'docx'

export async function POST(req: Request) {
  try {
    const { text, title } = await req.json()

    const lines = text.split('\n')

    const paragraphs = lines.map((line: string) => {
      const clean = line
        .replace(/\*\*/g, '')
        .replace(/####\s*/g, '')
        .replace(/###\s*/g, '')
        .replace(/##\s*/g, '')
        .replace(/#\s*/g, '')

      return new Paragraph({
        children: [new TextRun(clean)],
        spacing: { after: 200 },
      })
    })

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: title || 'Ebook',
                  bold: true,
                  size: 40,
                }),
              ],
              spacing: { after: 400 },
            }),
            ...paragraphs,
          ],
        },
      ],
    })

    const buffer = await Packer.toBuffer(doc)
const uint8Array = new Uint8Array(buffer)

return new NextResponse(uint8Array, {

      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="ebook.docx"`,
      },
    })
  } catch (err) {
    console.error('DOCX error:', err)
    return NextResponse.json(
      { error: 'DOCX generation failed' },
      { status: 500 }
    )
  }
}