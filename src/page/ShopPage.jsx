import Banner from "../components/ShopPage/Banner";
import ProductList from "../components/ShopPage/ProductList";
import SearchSection from "../components/ShopPage/SearchSection";
export default function ShopPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Banner></Banner>
      <section className="my-10 flex justify-between gap-7">
        {" "}
        <SearchSection className="basis-1/4"></SearchSection>
        <ProductList></ProductList>
      </section>
    </div>
  );
}
