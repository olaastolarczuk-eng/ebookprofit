export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-center mb-6">
        EbookProfit AI
      </h1>

      <p className="text-xl text-center max-w-2xl mb-8">
        Stwórz profesjonalny eBook w 3 minuty.
        AI napisze go za Ciebie od A do Z.
        Ty tylko wpisujesz temat.
      </p>

      <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
        Zacznij Generować
      </button>
    </main>
  )
}