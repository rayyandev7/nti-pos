function Sales() {
  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Sales
          </h1>

          <p className="text-gray-400">
            Create and manage sales
          </p>
        </div>

      </div>

      <div className="grid grid-cols-12 gap-6">

        {/* Products */}
        <div className="col-span-8 bg-[#2A2D31] rounded-xl p-6">

          <h2 className="text-xl font-semibold text-white mb-4">
            Products
          </h2>

        </div>

        {/* Cart */}
        <div className="col-span-4 bg-[#2A2D31] rounded-xl p-6">

          <h2 className="text-xl font-semibold text-white mb-4">
            Cart
          </h2>

        </div>

      </div>

    </div>
  );
}

export default Sales;