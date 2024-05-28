export default function SubInfo() {
  return (
    <section className="italic mb-16">
      <div className="bg-[#f8f9fa] mb-8">
        <div className="flex justify-between py-12 px-28">
          <div>
            <h3 className="text-lg">FREE SHIPPING</h3>
            <div className="text-gray-400 text-sm">Free shipping worldwide</div>
          </div>
          <div>
            <h3 className="text-lg">24 x 7 SERVICE</h3>
            <div className="text-gray-400 text-sm">Free shipping worldwide</div>
          </div>
          <div>
            <h3 className="text-lg">FESTIVAL OFFER</h3>
            <div className="text-gray-400 text-sm">Free shipping worldwide</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-1/3">
          <h3 className="text-xl">LET'S BE FRIENDS!</h3>
          <div className="text-gray-400 text-sm">
            Nisi nisi tempor consequat laboris nisi.
          </div>
        </div>
        <form action="">
          <input
            type="text"
            placeholder="    Enter your email address"
            className="h-full w-80 border-gray-200 hover:border-gray-400 border-solid border-2"
          />
          <button className="px-4 py-3 text-slate-50">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
