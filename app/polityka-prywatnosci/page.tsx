export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-8">

        <h1 className="text-4xl font-bold mb-10">
          Polityka Prywatności
        </h1>

        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Administrator danych</h2>
          <p className="text-gray-400">
            Administratorem danych osobowych jest EbookProfit.
            Kontakt: kontakt@twojadomena.pl
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Zakres zbieranych danych</h2>
          <p className="text-gray-400">
            Przetwarzamy dane podane podczas rejestracji (adres email),
            dane niezbędne do realizacji płatności (obsługiwane przez Stripe)
            oraz dane analityczne (np. Meta Pixel).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Cel przetwarzania danych</h2>
          <p className="text-gray-400">
            Dane przetwarzane są w celu realizacji usługi generowania ebooków,
            obsługi płatności oraz działań marketingowych.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Pliki cookies</h2>
          <p className="text-gray-400">
            Strona wykorzystuje pliki cookies w celu zapewnienia prawidłowego działania,
            analizy ruchu oraz prowadzenia działań marketingowych.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Prawa użytkownika</h2>
          <p className="text-gray-400">
            Użytkownik ma prawo do wglądu, poprawy oraz usunięcia swoich danych
            zgodnie z przepisami RODO.
          </p>
        </section>

      </div>
    </main>
  )
}
