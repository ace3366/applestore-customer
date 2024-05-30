export default function Banner() {
  return (
    <section className="flex justify-between italic bg-gray-100 h-40">
      <h2 className="text-3xl pl-16 my-auto">CHECKOUT</h2>
      <h3 className="text-lg pr-16 my-auto hidden sm:block font-semibold">
        HOME / CART / <span className="text-gray-400">CHECKOUT</span>
      </h3>
    </section>
  );
}
