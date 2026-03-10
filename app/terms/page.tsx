export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        Regulamin serwisu EbookProfit
      </h1>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Postanowienia ogólne
      </h2>

      <p className="mb-4">
        Niniejszy regulamin określa zasady korzystania z serwisu EbookProfit,
        który umożliwia generowanie ebooków przy użyciu technologii
        sztucznej inteligencji.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Konto użytkownika
      </h2>

      <p className="mb-4">
        Aby korzystać z funkcjonalności serwisu, użytkownik musi
        utworzyć konto.
      </p>

      <p className="mb-4">
        Użytkownik zobowiązuje się do podania prawdziwych danych
        podczas rejestracji oraz do ochrony dostępu do swojego konta.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Zakres usług
      </h2>

      <ul className="list-disc ml-6 mb-4">
        <li>generowanie ebooków przy użyciu AI</li>
        <li>edycja wygenerowanych treści</li>
        <li>pobieranie ebooków w formacie PDF i DOCX</li>
        <li>zarządzanie wygenerowanymi ebookami</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Płatności
      </h2>

      <p className="mb-4">
        Niektóre funkcje serwisu dostępne są w ramach płatnych planów.
        Płatności realizowane są przez operatora Stripe.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Odpowiedzialność za treści
      </h2>

      <p className="mb-4">
        Treści generowane są automatycznie przy użyciu sztucznej
        inteligencji. Administrator nie ponosi odpowiedzialności
        za sposób wykorzystania wygenerowanych materiałów.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Zakazane działania
      </h2>

      <ul className="list-disc ml-6 mb-4">
        <li>generowanie treści nielegalnych</li>
        <li>naruszanie praw autorskich</li>
        <li>działania zakłócające działanie serwisu</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Zmiany regulaminu
      </h2>

      <p className="mb-4">
        Administrator zastrzega sobie prawo do wprowadzania zmian
        w niniejszym regulaminie.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Kontakt
      </h2>

      <p>
        W sprawach dotyczących serwisu można skontaktować się
        poprzez e-mail: ebookprofitai@gmail.com
      </p>

    </main>
  )
}