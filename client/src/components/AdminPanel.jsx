import { useState } from "react"

function AdminPanel({
  setShowAdmin,
  products,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  savedOrders,
  monthlyRevenue,
  updateOrderStatus,
  deleteOrder,
}) {
  const [activeTab, setActiveTab] = useState("Visão Geral")
  const [editingProduct, setEditingProduct] = useState(null)

  const [name, setName] = useState("")
  const [category, setCategory] = useState("Outros")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [active, setActive] = useState(true)
  const [isPromotion, setIsPromotion] = useState(false)
  const [promoValidUntil, setPromoValidUntil] = useState("")
  const [newCategory, setNewCategory] = useState("")

  function resetForm() {
    setName("")
    setCategory("Outros")
    setPrice("")
    setStock("")
    setImage("")
    setDescription("")
    setActive(true)
    setIsPromotion(false)
    setPromoValidUntil("")
    setEditingProduct(null)
    setNewCategory("")
  }

  function handleSubmit() {
    if (!name || price === "" || stock === "" || !image) {
      alert("Preencha os campos obrigatórios.")
      return
    }

    const productData = {
      id: editingProduct?.id || Date.now(),
      name,
      category: newCategory.trim() || category,
      price: Number(price),
      stock: Number(stock),
      image,
      description,
      active,
      isPromotion,
      promoValidUntil,
    }

    if (editingProduct) {
      updateProduct(productData)
    } else {
      addProduct(productData)
    }

    resetForm()
    setNewCategory("")
  }

  function handleEdit(product) {
  setEditingProduct(product)
  setName(product.name)
  setCategory(product.category)
  setPrice(String(product.price))
  setStock(String(product.stock))
  setImage(product.image)
  setDescription(product.description || "")
  setActive(product.active)
  setIsPromotion(product.isPromotion)
  setPromoValidUntil(product.promoValidUntil || "")
  setActiveTab("Produtos")

  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, 100)
}

  const totalProducts = products.length
  const activeProducts = products.filter((product) => product.active).length
  const promotions = products.filter((product) => product.isPromotion).length
  const outOfStock = products.filter((product) => product.stock <= 0).length
  const categories = [
  ...new Set(products.map((product) => product.category)),
]

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="text-amber-400 font-bold">
              Painel Administrativo
            </span>

            <h1 className="text-4xl font-black mt-2">
              Adega Nat AI
            </h1>
          </div>

          <button
            onClick={() => setShowAdmin(false)}
            className="bg-red-500 hover:bg-red-600 px-6 py-4 rounded-2xl font-bold"
          >
            Voltar ao Site
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-3 overflow-x-auto pb-4 mb-10">
          {[
            "Visão Geral",
            "Produtos",
            "Promoções",
            "Horários",
            "Pedidos",
            "Configurações",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 rounded-2xl font-bold whitespace-nowrap transition ${
                activeTab === tab
                  ? "bg-amber-500 text-black"
                  : "bg-zinc-900 border border-zinc-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Visão Geral" && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
              <span className="text-zinc-400">Produtos cadastrados</span>
              <h3 className="text-5xl font-black mt-4">{totalProducts}</h3>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
              <span className="text-zinc-400">Produtos ativos</span>
              <h3 className="text-5xl font-black mt-4 text-green-400">
                {activeProducts}
              </h3>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
              <span className="text-zinc-400">Promoções ativas</span>
              <h3 className="text-5xl font-black mt-4 text-amber-400">
                {promotions}
              </h3>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
              <span className="text-zinc-400">Produtos sem estoque</span>
              <h3 className="text-5xl font-black mt-4 text-red-400">
                {outOfStock}
              </h3>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
              <span className="text-zinc-400">Pedidos do mês</span>
              <h3 className="text-5xl font-black mt-4 text-blue-400">
                {savedOrders.length}
              </h3>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
              <span className="text-zinc-400">Faturamento mensal</span>
              <h3 className="text-4xl font-black mt-4 text-green-400">
                R$ {monthlyRevenue}
              </h3>
            </div>
          </div>
        )}

        {(activeTab === "Produtos" || activeTab === "Promoções") && (
          <div className="grid lg:grid-cols-[400px,1fr] gap-8">
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 h-fit">
              <h3 className="text-2xl font-black mb-6">
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
                />

                <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
>
  {categories.map((categoryItem) => (
    <option key={categoryItem} value={categoryItem}>
      {categoryItem}
    </option>
  ))}
</select>

<input
  type="text"
  placeholder="Nova categoria opcional: Ex: Refrigerantes, Energéticos, Balas..."
  value={newCategory}
  onChange={(e) => setNewCategory(e.target.value)}
  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
/>

                <input
                  type="number"
                  placeholder="Preço"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  placeholder="Quantidade em estoque"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Imagem URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
                />

                <textarea
                  placeholder="Descrição"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 min-h-28"
                />

                <input
                  type="date"
                  value={promoValidUntil}
                  onChange={(e) => setPromoValidUntil(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
                />

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                  />
                  Produto ativo
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isPromotion}
                    onChange={(e) => setIsPromotion(e.target.checked)}
                  />
                  Produto em promoção
                </label>

                <div className="flex gap-3">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-2xl"
                  >
                    {editingProduct ? "Salvar" : "Adicionar"}
                  </button>

                  {editingProduct && (
                    <button
                      onClick={resetForm}
                      className="bg-zinc-800 hover:bg-zinc-700 px-6 rounded-2xl font-bold"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {products
                .filter((product) =>
                  activeTab === "Promoções" ? product.isPromotion : true
                )
                .map((product) => (
                  <div
                    key={product.id}
                    className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-60 w-full object-cover"
                    />

                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-amber-400 text-sm">
                          {product.category}
                        </span>

                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            product.active
                              ? "bg-green-500 text-black"
                              : "bg-red-500"
                          }`}
                        >
                          {product.active ? "Ativo" : "Inativo"}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black mt-3">
                        {product.name}
                      </h3>

                      <p className="text-zinc-400 text-sm mt-2">
                        {product.description}
                      </p>

                      <div className="mt-5 space-y-2">
                        <p>💰 R$ {product.price}</p>
                        <p>📦 Estoque: {product.stock}</p>

                        {product.isPromotion && (
                          <p className="text-green-400">
                            Promoção válida até {product.promoValidUntil}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-6">
                        <button
                          onClick={() => updateStock(product.id, 1)}
                          className="bg-green-500 hover:bg-green-600 py-3 rounded-xl font-bold"
                        >
                          + Estoque
                        </button>

                        <button
                          onClick={() => updateStock(product.id, -1)}
                          className="bg-red-500 hover:bg-red-600 py-3 rounded-xl font-bold"
                        >
                          - Estoque
                        </button>

                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-bold"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl font-bold"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === "Horários" && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-3xl font-black mb-8">
              Horário de funcionamento
            </h3>

            <div className="space-y-4 text-zinc-300">
              {[
                ["Quarta", "10:00 às 00:00"],
                ["Quinta", "10:00 às 00:00"],
                ["Sexta", "11:00 às 01:00"],
                ["Sábado", "11:00 às 01:00"],
                ["Domingo", "11:00 às 01:00"],
                ["Segunda", "10:00 às 00:00"],
                ["Terça", "Fechado"],
              ].map(([day, time]) => (
                <div
                  key={day}
                  className="flex justify-between border-b border-zinc-800 pb-3"
                >
                  <span>{day}</span>
                  <span
                    className={
                      time === "Fechado"
                        ? "text-red-400 font-bold"
                        : "text-zinc-300"
                    }
                  >
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Pedidos" && (
          <div className="space-y-4">
            {savedOrders.length === 0 && (
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 text-center text-zinc-400">
                Nenhum pedido registrado ainda.
              </div>
            )}

            {savedOrders
              .slice()
              .reverse()
              .map((order) => (
                <div
                  key={order.id}
                  className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
                    <div>
                      <p className="text-amber-400 font-bold">
                        Pedido Nº {order.id}
                      </p>

                      <h3 className="text-2xl font-black">
                        {order.customerName}
                      </h3>
                    </div>

                    <strong className="text-3xl text-amber-400">
                      R$ {order.total}
                    </strong>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-zinc-300 mb-6">
                    <p>📞 {order.customerPhone}</p>
                    <p>📍 {order.address}</p>
                    <p>💳 {order.paymentMethod}</p>
                    <p>🚚 Taxa: R$ {order.deliveryTax || 0}</p>
                    <p>📝 {order.notes || "Sem observação"}</p>
                    <p>📅 {order.createdAt}</p>
                  </div>

                  <div className="border-t border-zinc-800 pt-4 mb-6">
                    {order.products.map((item) => (
                      <p key={item.id} className="text-zinc-300">
                        • {item.name} ({item.quantity}x) - R${" "}
                        {item.price * item.quantity}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <select
                      value={order.status || "Novo"}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
                    >
                      <option>Novo</option>
                      <option>Em preparo</option>
                      <option>Saiu para entrega</option>
                      <option>Finalizado</option>
                    </select>

                    <a
                      href={`https://wa.me/55${String(
                        order.customerPhone || ""
                      ).replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-black px-4 py-3 rounded-xl font-bold"
                    >
                      WhatsApp Cliente
                    </a>

                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl font-bold"
                    >
                      Excluir pedido
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {activeTab === "Configurações" && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-5">
            <h3 className="text-3xl font-black mb-4">
              Configurações
            </h3>

            <p className="text-zinc-300">
              📍 Endereço: Engenheiro Teixeira Soares, 125 - Regina Coeli,
              Cambuquira - MG
            </p>

            <p className="text-zinc-300">
              🗺️ Google Maps:
              https://maps.app.goo.gl/NFP9pDAfsAELGEuN9
            </p>

            <p className="text-zinc-300">
              🔐 Senha admin atual: nat123
            </p>

            <p className="text-amber-400">
              ⚠️ Dados salvos em localStorage. Para produção real, o ideal será
              backend + banco de dados.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel