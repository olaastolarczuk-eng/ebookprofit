export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        Polityka prywatności
      </h1>

      <p className="mb-4">
        Niniejsza Polityka Prywatności określa zasady przetwarzania danych
        osobowych użytkowników korzystających z serwisu EbookProfit.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Administrator danych
      </h2>

      <p className="mb-4">
        Administratorem danych osobowych jest właściciel serwisu EbookProfit.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Zakres zbieranych danych
      </h2>

      <p className="mb-4">
        Podczas korzystania z serwisu możemy przetwarzać następujące dane:
      </p>

      <ul className="list-disc ml-6 mb-4">
        <li>adres e-mail użytkownika</li>
        <li>dane konta użytkownika</li>
        <li>treści wprowadzane do generatora ebooków</li>
        <li>dane techniczne związane z korzystaniem ze strony</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Cel przetwarzania danych
      </h2>

      <p className="mb-4">
        Dane osobowe przetwarzane są w celu:
      </p>

      <ul className="list-disc ml-6 mb-4">
        <li>utworzenia i obsługi konta użytkownika</li>
        <li>generowania ebooków przy użyciu sztucznej inteligencji</li>
        <li>obsługi płatności za plany premium</li>
        <li>zapewnienia prawidłowego działania serwisu</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Płatności
      </h2>

      <p className="mb-4">
        Płatności w serwisie realizowane są za pośrednictwem zewnętrznego
        operatora płatności Stripe. Dane kart płatniczych nie są
        przechowywane przez serwis EbookProfit.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Udostępnianie danych
      </h2>

      <p className="mb-4">
        Dane użytkowników mogą być przekazywane podmiotom współpracującym
        z serwisem w zakresie niezbędnym do świadczenia usług, w tym
        dostawcom usług płatniczych oraz usług AI.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Prawa użytkownika
      </h2>

      <p className="mb-4">
        Użytkownik ma prawo do dostępu do swoich danych, ich poprawiania
        oraz żądania ich usunięcia.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Kontakt
      </h2>

      <p>
        W sprawach dotyczących ochrony danych można skontaktować się
        poprzez adres e-mail: ebookprofitai@gmail.com
      </p>

    </main>
  )
}