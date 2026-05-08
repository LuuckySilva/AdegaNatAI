import { useState } from "react"

const initialProducts = [
  {
    id: 1,
    name: "Jack Daniels",
    category: "Whisky",
    price: 129,
    stock: 4,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
  },
  {
    id: 2,
    name: "Heineken",
    category: "Cerveja",
    price: 12,
    stock: 8,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9",
  },
  {
    id: 3,
    name: "Chivas Regal",
    category: "Whisky",
    price: 189,
    stock: 3,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b",
  },
]

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [address, setAddress] = useState("")
  const [showAdmin, setShowAdmin] = useState(false)

  const savedOrders =
    JSON.parse(localStorage.getItem("adegaNatOrders"))?.orders || []

  const monthlyRevenue = savedOrders.reduce(
    (acc, order) => acc + order.total,
    0
  )

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  function addToCart(product) {
    if (product.stock === 0) {
      alert(`${product.name} está esgotado.`)
      return
    }

    const productInCart = cart.find((item) => item.id === product.id)

    if (productInCart && productInCart.quantity >= product.stock) {
      alert(`Estoque máximo disponível para ${product.name}: ${product.stock}`)
      return
    }

    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  function getNextOrderNumber() {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const savedData = JSON.parse(localStorage.getItem("adegaNatOrders")) || {
      month: currentMonth,
      year: currentYear,
      lastOrderNumber: 0,
      orders: [],
    }

    if (savedData.month !== currentMonth || savedData.year !== currentYear) {
      const resetData = {
        month: currentMonth,
        year: currentYear,
        lastOrderNumber: 0,
        orders: [],
      }

      localStorage.setItem("adegaNatOrders", JSON.stringify(resetData))
      return 1
    }

    return savedData.lastOrderNumber + 1
  }

  function sendWhatsApp() {
    if (!customerName || !address || cart.length === 0) {
      alert("Preencha nome, endereço e adicione pelo menos 1 produto.")
      return
    }

    const orderNumber = getNextOrderNumber()

    const itemsMessage = cart
      .map(
        (item) =>
          `• ${item.name} (${item.quantity}x) - R$ ${
            item.price * item.quantity
          }`
      )
      .join("\n")

    const finalMessage = `
🍷 NOVO PEDIDO - ADEGA NAT AI

📦 Pedido Nº: ${orderNumber}

👤 Cliente:
${customerName}

📍 Endereço:
${address}

🛒 Itens:
${itemsMessage}

💰 Total:
R$ ${total}
`

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const savedData = JSON.parse(localStorage.getItem("adegaNatOrders")) || {
      month: currentMonth,
      year: currentYear,
      lastOrderNumber: 0,
      orders: [],
    }

    const newOrder = {
      number: orderNumber,
      customerName,
      address,
      items: cart,
      total,
      date: new Date().toISOString(),
    }

    const updatedData = {
      ...savedData,
      month: currentMonth,
      year: currentYear,
      lastOrderNumber: orderNumber,
      orders: [...savedData.orders, newOrder],
    }

    localStorage.setItem("adegaNatOrders", JSON.stringify(updatedData))

    const url = `https://wa.me/5535984760977?text=${encodeURIComponent(
      finalMessage
    )}`

    window.open(url, "_blank")

    setProducts(
      products.map((product) => {
        const itemInCart = cart.find((item) => item.id === product.id)

        if (itemInCart) {
          return {
            ...product,
            stock: product.stock - itemInCart.quantity,
          }
        }

        return product
      })
    )

    setCart([])
    setCustomerName("")
    setAddress("")
    setIsCartOpen(false)
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <h1 className="text-2xl sm:text-3xl font-black text-amber-400">
            Adega Nat AI
          </h1>

          <nav className="hidden lg:flex gap-8 text-zinc-300">
            <a href="#">Início</a>
            <a href="#">Catálogo</a>
            <a href="#">Promoções</a>
          </nav>

          <div className="flex gap-3">
            <button
              onClick={() => setShowAdmin(!showAdmin)}
              className="hidden sm:block bg-zinc-900 hover:bg-zinc-800 px-5 py-3 rounded-xl font-bold transition border border-zinc-800"
            >
              Painel Admin
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 px-5 py-3 rounded-xl font-bold transition"
            >
              Fazer Pedido
            </button>
          </div>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24">
        <img
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b"
          alt=""
          className="absolute w-full h-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 text-center px-4">
          <span className="bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
            Atendimento inteligente para adegas
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mt-8 max-w-5xl leading-tight">
            Sua adega digital com pedidos automáticos
          </h2>

          <p className="text-zinc-300 text-base sm:text-xl mt-8 max-w-2xl mx-auto">
            Catálogo online, pedidos via WhatsApp e automações inteligentes para aumentar suas vendas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button className="bg-amber-500 hover:bg-amber-600 px-8 py-4 rounded-2xl text-lg font-bold transition">
              Ver Catálogo
            </button>

            <button className="border border-zinc-700 hover:border-amber-500 px-8 py-4 rounded-2xl text-lg font-bold transition">
              Promoções
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <h3 className="text-3xl sm:text-4xl font-black">
            Destaques da Adega
          </h3>

          <div className="flex gap-3 overflow-x-auto pb-2">
            <button className="bg-zinc-900 px-5 py-2 rounded-xl border border-zinc-800">
              Whisky
            </button>

            <button className="bg-zinc-900 px-5 py-2 rounded-xl border border-zinc-800">
              Cerveja
            </button>

            <button className="bg-zinc-900 px-5 py-2 rounded-xl border border-zinc-800">
              Vodka
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden hover:border-amber-500 transition"
            >
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
                    {product.stock === 0 ? "Esgotado" : "Adicionar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showAdmin && (
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
              Últimos pedidos
            </h4>

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

                  <p className="text-zinc-400 mb-3">
                    📍 {order.address}
                  </p>

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
      )}

      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="fixed bottom-5 right-5 z-50 bg-amber-500 w-16 h-16 rounded-full text-black font-black shadow-2xl md:hidden"
      >
        🛒
      </button>

      <div
        className={`
          fixed z-40
          md:right-5 md:bottom-5
          bottom-0 left-0 md:left-auto w-full md:w-96
          bg-zinc-950 border border-zinc-800
          rounded-t-3xl md:rounded-3xl
          p-5 transition-all duration-300
          ${isCartOpen ? "translate-y-0" : "translate-y-full md:translate-y-0"}
        `}
      >
        <h3 className="text-2xl font-bold mb-5">
          Carrinho ({cart.length})
        </h3>

        <div className="space-y-3 mb-5">
          <input
            type="text"
            placeholder="Nome do cliente"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="text"
            placeholder="Endereço completo"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />
        </div>

        <div className="space-y-3 max-h-60 overflow-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-zinc-900 p-3 rounded-xl gap-3"
            >
              <div>
                <p className="font-semibold">
                  {item.name} ({item.quantity}x)
                </p>

                <span className="text-amber-400">
                  R$ {item.price * item.quantity}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCart(
                      cart
                        .map((product) =>
                          product.id === item.id
                            ? { ...product, quantity: product.quantity - 1 }
                            : product
                        )
                        .filter((product) => product.quantity > 0)
                    )
                  }
                  className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-lg text-sm"
                >
                  -
                </button>

                <button
                  onClick={() => addToCart(item)}
                  className="bg-amber-500 hover:bg-amber-600 px-3 py-1 rounded-lg text-sm text-black font-bold"
                >
                  +
                </button>

                <button
                  onClick={() =>
                    setCart(cart.filter((product) => product.id !== item.id))
                  }
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-zinc-400">Total</span>

          <span className="text-2xl font-black text-amber-400">
            R$ {total}
          </span>
        </div>

        <button
          onClick={sendWhatsApp}
          className="w-full mt-5 bg-green-500 hover:bg-green-600 py-4 rounded-2xl font-bold transition"
        >
          Enviar Pedido
        </button>
      </div>
    </div>
  )
}

export default App