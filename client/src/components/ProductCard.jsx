function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden hover:border-amber-500 transition">
      <img
        src={product.image}
        alt={product.name}
        className="h-72 w-full object-cover"
      />

      <div className="p-6">
        <span className="text-amber-400 text-sm">
          {product.category}
        </span>

        <h4 className="text-2xl font-bold mt-2">
          {product.name}
        </h4>

        <p className="text-zinc-400 text-sm mt-2">
          Estoque: {product.stock} unidades
        </p>

        <div className="flex items-center justify-between mt-6">
          <span className="text-3xl font-black text-amber-400">
            R$ {product.price}
          </span>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={`px-5 py-3 rounded-xl font-bold transition ${
              product.stock === 0
                ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600"
            }`}
          >
            {product.stock === 0
              ? "Esgotado"
              : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard