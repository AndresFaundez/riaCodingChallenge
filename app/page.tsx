import ExchangeOverview from "@/components/overview/ExchangeOverview"
import Converter from "@/components/converter/Converter"
const Page = () => {
  return (
    <section>
      <h1 className = "text-center">The best currency exchange there is <br /> Event You Cant Miss</h1>
      <p className = "text-center mt-5">USD, EUR, and Many More, All in One Place</p>
      <ExchangeOverview />
      <Converter />
    </section>
  )
}

export default Page