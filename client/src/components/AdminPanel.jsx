import { useState } from "react"

function AdminPanel({
  showAdmin,
  setShowAdmin,
  savedOrders,
  monthlyRevenue,
  products,
  updateStock,
  clearMonthlyOrders,
  resetStock,
  addProduct,
}) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState("")

  function handleAddProduct() {
    if (!name || !category || !price || !stock || !image) {
      alert("Preencha todos os campos.")
      return
    }

    addProduct({
      name,
      category,
      price,
      stock,
      image,
    })

    setName("")
    setCategory("")
    setPrice("")
    setStock("")
    setImage("")
  }

  if (!showAdmin) return null

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h3 className="text-3xl font-black text-amber-400">
            Painel Administrativo
          </h3>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={resetStock}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl font-bold"
            >
              Resetar estoque
            </button>

            <button
              onClick={clearMonthlyOrders}
              className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl font-bold"
            >
              Limpar pedidos
            </button>

            <button
              onClick={() => setShowAdmin(false)}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-bold"
            >
              Fechar
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
            <p className="text-zinc-400">Pedidos do mês</p>

            <strong className="text-4xl text-white">
              {savedOrders.length}
            </strong>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
            <p className="text-zinc-400">Faturamento do mês</p>

            <strong className="text-4xl text-amber-400">
              R$ {monthlyRevenue}
            </strong>
          </div>
        </div>

        <h4 className="text-2xl font-bold mb-5">
          Adicionar Produto
        </h4>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <input
            type="text"
            placeholder="Nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
          />

          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
          />

          <input
            type="number"
            placeholder="Estoque"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="URL da imagem"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 md:col-span-2"
          />

          <button
            onClick={handleAddProduct}
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-xl md:col-span-2"
          >
            Adicionar Produto
          </button>
        </div>

        <h4 className="text-2xl font-bold mb-5">
          Controle de Estoque
        </h4>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
            >
              <h5 className="font-bold text-lg">
                {product.name}
              </h5>

              <p className="text-zinc-400 mt-2">
                Estoque atual: {product.stock}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() =>
                    updateStock(product.id, -1)
                  }
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-bold"
                >
                  -1
                </button>

                <button
                  onClick={() =>
                    updateStock(product.id, 1)
                  }
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-bold"
                >
                  +1
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdminPanel