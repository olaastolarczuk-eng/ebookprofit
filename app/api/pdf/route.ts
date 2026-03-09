import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {

    const { text, title, cover } = await req.json()

    const fontPath = path.join(
      process.cwd(),
      'public/fonts',
      'Inter-Regular.ttf'
    )

    if (!fs.existsSync(fontPath)) {
      return NextResponse.json(
        { error: 'Font not found' },
        { status: 500 }
      )
    }

    const doc = new PDFDocument({
      size: 'A4',
      margin: 60,
      font: fontPath,
    })

    const buffers: Buffer[] = []

    doc.on('data', (b) => buffers.push(b))

    const pdfPromise = new Promise<Buffer>((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(buffers)))
    })

    // ===== OKŁADKA =====
    if (cover) {

      const img = Buffer.from(cover, 'base64')

      doc.image(img, 0, 0, {
        width: doc.page.width,
        height: doc.page.height,
      })

      doc.addPage()
    }

    // ===== STAŁY STYL =====
    const headingSize = 20
    const bodySize = 12
    const lineGap = 6

    // ===== TYTUŁ =====
    if (!cover && title) {

      doc.fontSize(24).text(title, {
        align: 'center'
      })

      doc.moveDown(2)
    }

    // ===== SPIS TREŚCI =====
    doc.fontSize(16).text('Spis treści:')
    doc.moveDown(1)

    const lines = text.split('\n')

    let lastChapter: string | null = null
    let tocItems = 0
    let inToc = true

    for (const rawLine of lines) {

      let clean = rawLine.trim()

      if (clean.includes('===SPIS_TRESCI===')) continue
      if (clean.includes('===KONIEC_SPISU===')) continue

      if (
        clean.toLowerCase().startsWith('tytuł:') ||
        clean.toLowerCase().startsWith('spis treści')
      ) {
        continue
      }

      clean = clean
        .replace(/\*\*/g, '')
        .replace(/####\s*/g, '')
        .replace(/###\s*/g, '')
        .replace(/##\s*/g, '')
        .replace(/#\s*/g, '')

      if (!clean) {
        doc.moveDown()
        continue
      }

      // ===== SPIS TREŚCI =====
      if (clean.match(/^\d+\./) && inToc) {

        tocItems++

        if (tocItems > 12) {

          inToc = false
          doc.addPage()

        }

      }

      const match = clean.match(/^(\d+)\./)

      if (match) {

        const chapterNumber = match[1]

        if (chapterNumber === lastChapter) continue

        lastChapter = chapterNumber

      }

      // ===== NAGŁÓWKI ROZDZIAŁÓW =====
      const isMainChapter = clean.match(/^\d+\.\s/)

      if (!inToc && isMainChapter) {

        if (doc.y > doc.page.height - 150) {
          doc.addPage()
        }

        doc.moveDown()

        doc.fontSize(headingSize).text(clean, {
          align: 'center'
        })

        doc.moveDown()

        doc.fontSize(bodySize)

        continue
      }

      // ===== WSKAZÓWKA BOX =====
      if (clean.toLowerCase().startsWith('wskazówka')) {

        const boxWidth =
          doc.page.width -
          doc.page.margins.left -
          doc.page.margins.right

        doc.moveDown()

        const boxHeight =
          doc.heightOfString(clean, { width: boxWidth - 20 }) + 20

        doc.rect(doc.x, doc.y, boxWidth, boxHeight).stroke()

        doc.text(clean, doc.x + 12, doc.y + 12, {
          width: boxWidth - 24,
        })

        doc.moveDown(3)

        doc.x = doc.page.margins.left

        continue
      }

      // ===== PRZYKŁAD BOX =====
      if (clean.toLowerCase().startsWith('przykład')) {

        const boxWidth =
          doc.page.width -
          doc.page.margins.left -
          doc.page.margins.right

        doc.moveDown()

        const h =
          doc.heightOfString(clean, { width: boxWidth - 20 }) + 20

        doc.rect(doc.x, doc.y, boxWidth, h)

doc.dash(5, { space: 5 })
doc.stroke()
doc.undash()

        doc.text(clean, doc.x + 10, doc.y + 10, {
          width: boxWidth - 20,
        })

        doc.moveDown(3)

        doc.x = doc.page.margins.left

        continue
      }

      // ===== ZWYKŁY TEKST =====
      doc.x = doc.page.margins.left

      doc.fontSize(bodySize)

      doc.text(clean, {
        align: 'justify',
        lineGap: lineGap,
        width:
          doc.page.width -
          doc.page.margins.left -
          doc.page.margins.right,
      })

      doc.moveDown(1.2)

    }

    doc.end()

    const pdf = await pdfPromise

    const uint8Array = new Uint8Array(pdf)

    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ebook.pdf"',
      },
    })

  } catch (err) {

    console.error(err)

    return NextResponse.json(
      { error: 'PDF error' },
      { status: 500 }
    )

  }
}