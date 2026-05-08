function AdminPanel({
  showAdmin,
  setShowAdmin,
  savedOrders,
  monthlyRevenue,
  updateOrderStatus,
  deleteOrder,
}) {
  if (!showAdmin) return null

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-black text-amber-400">
            Painel Administrativo
          </h3>

          <button
            onClick={() => setShowAdmin(false)}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-bold"
          >
            Fechar
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-zinc-900 rounded-2xl p-5">
            <p className="text-zinc-400">
              Pedidos do mês
            </p>

            <strong className="text-4xl">
              {savedOrders.length}
            </strong>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-5">
            <p className="text-zinc-400">
              Faturamento
            </p>

            <strong className="text-4xl text-amber-400">
              R$ {monthlyRevenue}
            </strong>
          </div>
        </div>

        <div className="space-y-4">
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
                  <p>📞 {order.phone}</p>
                  <p>📍 {order.address}</p>
                  <p>💳 {order.paymentMethod}</p>

                  <div className="flex flex-col gap-3 pt-2">
                    <select
                      value={order.status || "Novo"}
                      onChange={(e) =>
                        updateOrderStatus(
                          order.number,
                          e.target.value
                        )
                      }
                      className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
                    >
                      <option value="Novo">
                        Novo
                      </option>

                      <option value="Em preparo">
                        Em preparo
                      </option>

                      <option value="Saiu para entrega">
                        Saiu para entrega
                      </option>

                      <option value="Finalizado">
                        Finalizado
                      </option>
                    </select>

                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`https://wa.me/55${order.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-500 hover:bg-green-600 px-4 py-3 rounded-xl font-bold text-black"
                      >
                        WhatsApp Cliente
                      </a>

                      <button
                        onClick={() => deleteOrder(order.number)}
                        className="bg-red-600 hover:bg-red-700 px-4 py-3 rounded-xl font-bold"
                      >
                        Excluir Pedido
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 border-t border-zinc-800 pt-4">
                  {order.items.map((item) => (
                    <p
                      key={item.id}
                      className="text-zinc-300"
                    >
                      • {item.name} ({item.quantity}x)
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