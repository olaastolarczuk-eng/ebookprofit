export default function Terms() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-8">

        <h1 className="text-4xl font-bold mb-10">
          Regulamin
        </h1>

        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Zakres usługi</h2>
          <p className="text-gray-400">
            EbookProfit umożliwia generowanie treści ebooków przy użyciu technologii AI.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Płatności</h2>
          <p className="text-gray-400">
            Płatności realizowane są za pośrednictwem Stripe.
            Opłata jest jednorazowa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Odpowiedzialność</h2>
          <p className="text-gray-400">
            Użytkownik ponosi odpowiedzialność za sposób wykorzystania wygenerowanych treści.
          </p>
        </section>

      </div>
    </main>
  )
}
