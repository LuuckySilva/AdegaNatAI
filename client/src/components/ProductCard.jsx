function ProductCard({
  product,
  addToCart,
}) {
  if (!product.active) {
    return null
  }

  const isOutOfStock =
    product.stock <= 0

  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden hover:border-amber-500 transition duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover"
        />

        {product.isPromotion && (
          <div className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-black px-4 py-2 rounded-full shadow-lg">
            PROMOÇÃO
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="bg-red-500 text-white px-6 py-3 rounded-2xl font-black text-lg">
              ESGOTADO
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-amber-400 text-sm font-semibold">
            {product.category}
          </span>

          {product.isPromotion &&
            product.promoValidUntil && (
              <span className="text-green-400 text-xs">
                até{" "}
                {
                  product.promoValidUntil
                }
              </span>
            )}
        </div>

        <h3 className="text-2xl font-black mb-3">
          {product.name}
        </h3>

        <p className="text-zinc-400 text-sm leading-relaxed min-h-[48px]">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-8">
          <div>
            <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight whitespace-nowrap">
  R$ {Number(product.price).toFixed(2).replace(".", ",")}
</span>
          </div>

          <button
            onClick={() =>
              addToCart(product)
            }
            disabled={isOutOfStock}
            className={`min-w-[120px] px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
              isOutOfStock
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600 text-black hover:scale-105"
            }`}
          >
            {isOutOfStock
              ? "Acabou"
              : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard