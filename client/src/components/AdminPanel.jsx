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
  updateProduct,
  deleteProduct,
  updateOrderStatus,
}) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState("")

  const [editingProduct, setEditingProduct] = useState(null)

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

  function startEditProduct(product) {
    setEditingProduct({
      ...product,
      price: String(product.price),
      stock: String(product.stock),
    })
  }

  function cancelEditProduct() {
    setEditingProduct(null)
  }

  function saveEditProduct() {
    if (
      !editingProduct.name ||
      !editingProduct.category ||
      !editingProduct.price ||
      !editingProduct.stock ||
      !editingProduct.image
    ) {
      alert("Preencha todos os campos do produto.")
      return
    }

    updateProduct(editingProduct)
    setEditingProduct(null)
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

        <h4 className="text-2xl font-bold mb-5">Adicionar Produto</h4>

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

        <h4 className="text-2xl font-bold mb-5">Produtos cadastrados</h4>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
            >
              {editingProduct?.id === product.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
                  />

                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
                  />

                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
                  />

                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
                  />

                  <input
                    type="text"
                    value={editingProduct.image}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        image: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
                  />

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={saveEditProduct}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl font-bold"
                    >
                      Salvar
                    </button>

                    <button
                      onClick={cancelEditProduct}
                      className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-xl font-bold"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full object-cover rounded-xl mb-4"
                  />

                  <h5 className="font-bold text-lg">{product.name}</h5>

                  <p className="text-zinc-400 mt-1">
                    Categoria: {product.category}
                  </p>

                  <p className="text-zinc-400">
                    Preço: R$ {product.price}
                  </p>

                  <p className="text-zinc-400">
                    Estoque atual: {product.stock}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() => updateStock(product.id, -1)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-bold"
                    >
                      -1
                    </button>

                    <button
                      onClick={() => updateStock(product.id, 1)}
                      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-bold"
                    >
                      +1
                    </button>

                    <button
                      onClick={() => startEditProduct(product)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl font-bold"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-xl font-bold"
                    >
                      Excluir
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <h4 className="text-2xl font-bold mb-5">Últimos pedidos</h4>

        <div className="space-y-4">
          {savedOrders.length === 0 && (
            <p className="text-zinc-400">
              Nenhum pedido registrado ainda.
            </p>
          )}

          {savedOrders
            .slice()
            .reverse()
            .map((order) => (
              <div
                key={order.number}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-amber-400 font-bold">
                      Pedido Nº {order.number}
                    </p>

                    <h5 className="text-xl font-bold">
                      {order.customerName}
                    </h5>
                  </div>

                  <strong className="text-2xl text-amber-400">
                    R$ {order.total}
                  </strong>
                </div>

                <div className="space-y-2 text-zinc-300 mb-4">
                  <p>📌 Status: {order.status || "Novo"}</p>

                  <select
                    value={order.status || "Novo"}
                    onChange={(e) =>
                      updateOrderStatus(order.number, e.target.value)
                    }
                    className="w-full md:w-64 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none"
                  >
                    <option value="Novo">Novo</option>
                    <option value="Em preparo">Em preparo</option>
                    <option value="Saiu para entrega">
                      Saiu para entrega
                    </option>
                    <option value="Finalizado">Finalizado</option>
                  </select>

                  <p>📞 {order.phone}</p>
                  <p>📍 {order.address}</p>
                  <p>💳 {order.paymentMethod}</p>
                  <p>🚚 Entrega: R$ {order.deliveryFee || 0}</p>
                  <p>📝 {order.observation || "Sem observação"}</p>

                  <p>
                    🔞{" "}
                    {order.isAdult
                      ? "Maioridade confirmada"
                      : "Não confirmado"}
                  </p>

                  <p>
                    📅 {new Date(order.date).toLocaleString("pt-BR")}
                  </p>
                </div>

                <div className="space-y-1 border-t border-zinc-800 pt-4">
                  {order.items.map((item) => (
                    <p key={item.id} className="text-zinc-300">
                      • {item.name} ({item.quantity}x) - R$ {item.price * item.quantity}
                    </p>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default AdminPanel