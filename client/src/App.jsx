import { useState, useEffect } from "react"
import StoreInfo from "./components/StoreInfo"
import Header from "./components/Header"
import Hero from "./components/Hero"
import ProductCard from "./components/ProductCard"
import Cart from "./components/Cart"
import AdminPanel from "./components/AdminPanel"

import initialProducts from "./data/products"

import {
  getSavedOrders,
  getNextOrderNumber,
  saveOrder,
} from "./utils/orders"

const ADMIN_PASSWORD = "nat123"

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("adegaNatProducts")
    return savedProducts ? JSON.parse(savedProducts) : initialProducts
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [showLoginModal, setShowLoginModal] = useState(false)

  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [deliveryFee, setDeliveryFee] = useState("")
  const [observation, setObservation] = useState("")

  const [isAdult, setIsAdult] = useState(false)

  const [hasConfirmedAge, setHasConfirmedAge] = useState(
    localStorage.getItem("adegaNatAgeConfirmed") === "true"
  )

  const [showAdmin, setShowAdmin] = useState(false)

  const [savedOrders, setSavedOrders] = useState(getSavedOrders())

  const [selectedCategory, setSelectedCategory] = useState("Todos")

  useEffect(() => {
    localStorage.setItem("adegaNatProducts", JSON.stringify(products))
  }, [products])

  const productsTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const deliveryValue = Number(deliveryFee) || 0

  const total = productsTotal + deliveryValue

  const monthlyRevenue = savedOrders.reduce(
    (acc, order) => acc + order.total,
    0
  )

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Todos"
        ? true
        : product.category === selectedCategory

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSearch
  })

  function confirmAgeAccess() {
    localStorage.setItem("adegaNatAgeConfirmed", "true")
    setHasConfirmedAge(true)
  }

  function handleAdminAccess() {
    setShowLoginModal(true)
  }

  function handleAdminLogin() {
    if (adminPassword === ADMIN_PASSWORD) {
      setShowAdmin(true)
      setShowLoginModal(false)
      setAdminPassword("")
    } else {
      alert("Senha incorreta.")
    }
  }

  function addProduct(newProduct) {
    const product = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    }

    setProducts([...products, product])
  }

  function updateProduct(updatedProduct) {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id
          ? {
              ...updatedProduct,
              price: Number(updatedProduct.price),
              stock: Number(updatedProduct.stock),
            }
          : product
      )
    )
  }

  function deleteProduct(productId) {
    const confirmDelete = confirm("Tem certeza que deseja excluir este produto?")

    if (!confirmDelete) return

    setProducts(products.filter((product) => product.id !== productId))
  }

  function deleteOrder(orderNumber) {
    const confirmDelete = confirm("Deseja excluir este pedido?")

    if (!confirmDelete) return

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const savedData =
      JSON.parse(localStorage.getItem("adegaNatOrders")) || {
        month: currentMonth,
        year: currentYear,
        lastOrderNumber: 0,
        orders: [],
      }

    const updatedOrders = savedData.orders.filter(
      (order) => order.number !== orderNumber
    )

    localStorage.setItem(
      "adegaNatOrders",
      JSON.stringify({
        ...savedData,
        orders: updatedOrders,
      })
    )

    setSavedOrders(updatedOrders)
  }

  function updateOrderStatus(orderNumber, newStatus) {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const savedData =
      JSON.parse(localStorage.getItem("adegaNatOrders")) || {
        month: currentMonth,
        year: currentYear,
        lastOrderNumber: 0,
        orders: [],
      }

    const updatedOrders = savedData.orders.map((order) =>
      order.number === orderNumber
        ? { ...order, status: newStatus }
        : order
    )

    localStorage.setItem(
      "adegaNatOrders",
      JSON.stringify({
        ...savedData,
        orders: updatedOrders,
      })
    )

    setSavedOrders(updatedOrders)
  }

  function resetStock() {
    setProducts(initialProducts)
    localStorage.setItem("adegaNatProducts", JSON.stringify(initialProducts))
  }

  function clearMonthlyOrders() {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    localStorage.setItem(
      "adegaNatOrders",
      JSON.stringify({
        month: currentMonth,
        year: currentYear,
        lastOrderNumber: 0,
        orders: [],
      })
    )

    setSavedOrders([])
  }

  function updateStock(productId, amount) {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? {
              ...product,
              stock: Math.max(0, product.stock + amount),
            }
          : product
      )
    )
  }

  function addToCart(product) {
    if (product.stock === 0) {
      return
    }

    const productInCart = cart.find((item) => item.id === product.id)

    if (productInCart && productInCart.quantity >= product.stock) {
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

  function sendWhatsApp() {
    if (
      !customerName ||
      !phone ||
      !address ||
      !paymentMethod ||
      cart.length === 0
    ) {
      alert("Preencha os dados corretamente.")
      return
    }

    if (!isAdult) {
      alert("Confirme a maioridade.")
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

👤 ${customerName}
📞 ${phone}

📍 ${address}

💳 ${paymentMethod}

🚚 Taxa: R$ ${deliveryValue}

📝 ${observation || "Sem observação"}

🛒 Itens:
${itemsMessage}

💰 Total:
R$ ${total}
`

    const newOrder = {
      number: orderNumber,
      customerName,
      phone,
      address,
      paymentMethod,
      deliveryFee: deliveryValue,
      observation,
      status: "Novo",
      isAdult,
      items: cart,
      total,
      date: new Date().toISOString(),
    }

    saveOrder(newOrder)

    setSavedOrders(getSavedOrders())

    const url = `https://wa.me/5535984760977?text=${encodeURIComponent(
      finalMessage
    )}`

    window.open(url, "_blank")

    setProducts(
      products.map((product) => {
        const itemInCart = cart.find(
          (item) => item.id === product.id
        )

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
    setPhone("")
    setAddress("")
    setPaymentMethod("")
    setDeliveryFee("")
    setObservation("")
    setIsAdult(false)
    setIsCartOpen(false)
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {!hasConfirmedAge && (
        <div className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center px-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 max-w-md text-center">
            <h2 className="text-3xl font-black text-amber-400 mb-4">
              Confirmação de idade
            </h2>

            <button
              onClick={confirmAgeAccess}
              className="w-full bg-amber-500 py-4 rounded-2xl font-bold text-black"
            >
              Tenho 18 anos ou mais
            </button>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center px-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-3xl font-black text-amber-400 mb-6">
              Painel Admin
            </h2>

            <input
              type="password"
              placeholder="Senha"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={handleAdminLogin}
                className="flex-1 bg-amber-500 hover:bg-amber-600 py-4 rounded-xl text-black font-bold"
              >
                Entrar
              </button>

              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-xl font-bold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Header
        showAdmin={showAdmin}
        handleAdminAccess={handleAdminAccess}
        setIsCartOpen={setIsCartOpen}
      />

      <Hero />
      <StoreInfo />

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <h3 className="text-3xl sm:text-4xl font-black">
              Destaques da Adega
            </h3>

            <input
              type="text"
              placeholder="Buscar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 lg:w-80"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {["Todos", "Whisky", "Cerveja", "Vodka"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-xl border transition ${
                  selectedCategory === category
                    ? "bg-amber-500 text-black border-amber-500"
                    : "bg-zinc-900 border-zinc-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>

      <AdminPanel
        showAdmin={showAdmin}
        setShowAdmin={setShowAdmin}
        savedOrders={savedOrders}
        monthlyRevenue={monthlyRevenue}
        products={products}
        updateStock={updateStock}
        clearMonthlyOrders={clearMonthlyOrders}
        resetStock={resetStock}
        addProduct={addProduct}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
        updateOrderStatus={updateOrderStatus}
        deleteOrder={deleteOrder}
      />

      <Cart
  cart={cart}
  productsTotal={productsTotal}
  deliveryFee={deliveryFee}
  setDeliveryFee={setDeliveryFee}
  total={total}
  customerName={customerName}
  setCustomerName={setCustomerName}
  phone={phone}
  setPhone={setPhone}
  address={address}
  setAddress={setAddress}
  paymentMethod={paymentMethod}
  setPaymentMethod={setPaymentMethod}
  observation={observation}
  setObservation={setObservation}
  isAdult={isAdult}
  setIsAdult={setIsAdult}
  addToCart={addToCart}
  setCart={setCart}
  sendWhatsApp={sendWhatsApp}
  isCartOpen={isCartOpen}
  setIsCartOpen={setIsCartOpen}
  openCart={() => setIsCartOpen(true)}
/>
    </div>
  )
}

export default App