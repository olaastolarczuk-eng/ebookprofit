'use client'

import Image from 'next/image'

type Props = {
  value: string
  onChange: (style: string) => void
}

const styles = [
  {
    id: 'minimal',
    name: 'Minimalny',
    img: '/styles/minimal.png',
  },
  {
    id: 'business',
    name: 'Biznesowy',
    img: '/styles/business.png',
  },
  {
    id: 'luxury',
    name: 'Luksusowy',
    img: '/styles/luxury.png',
  },
  {
    id: 'book',
    name: 'Książkowy',
    img: '/styles/book.png',
  },
  {
    id: 'course',
    name: 'Kursowy',
    img: '/styles/course.png',
  },
]

export default function StylePicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onChange(style.id)}
          className={`border rounded-xl overflow-hidden transition ${
            value === style.id
              ? 'border-black ring-2 ring-black'
              : 'border-gray-300'
          }`}
        >
          <Image
            src={style.img}
            alt={style.name}
            width={400}
            height={250}
            className="w-full h-40 object-cover"
          />
          <div className="p-2 text-center font-medium">
            {style.name}
          </div>
        </button>
      ))}
    </div>
  )
}