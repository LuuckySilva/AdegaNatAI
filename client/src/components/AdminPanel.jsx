function AdminPanel({
  showAdmin,
  setShowAdmin,
  savedOrders,
  monthlyRevenue,
  products,
  updateStock,
  clearMonthlyOrders,
  resetStock,
}) {
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

        <h4 className="text-2xl font-bold mb-5">Controle de Estoque</h4>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
            >
              <h5 className="font-bold text-lg">{product.name}</h5>

              <p className="text-zinc-400 mt-2">
                Estoque atual: {product.stock}
              </p>

              <div className="flex gap-2 mt-4">
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
              </div>
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

          {savedOrders.map((order) => (
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

              <p className="text-zinc-400 mb-3">📍 {order.address}</p>

              <div className="space-y-1">
                {order.items.map((item) => (
                  <p key={item.id} className="text-zinc-300">
                    • {item.name} ({item.quantity}x) - R${" "}
                    {item.price * item.quantity}
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