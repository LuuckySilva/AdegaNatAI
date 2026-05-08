import { useState, useEffect } from "react"

import Header from "./components/Header"
import Hero from "./components/Hero"
import ProductCard from "./components/ProductCard"
import Cart from "./components/Cart"
import AdminPanel from "./components/AdminPanel"

import initialProducts from "./data/products"

import {
  getSavedOrders,
  getMonthlyRevenue,
  getNextOrderNumber,
  saveOrder,
} from "./utils/orders"

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("adegaNatProducts")

    return savedProducts
      ? JSON.parse(savedProducts)
      : initialProducts
  })

  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [address, setAddress] = useState("")
  const [showAdmin, setShowAdmin] = useState(false)
  const [savedOrders, setSavedOrders] = useState(getSavedOrders())
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  useEffect(() => {
    localStorage.setItem(
      "adegaNatProducts",
      JSON.stringify(products)
    )
  }, [products])

  const monthlyRevenue = getMonthlyRevenue()

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        )

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

    const newOrder = {
      number: orderNumber,
      customerName,
      address,
      items: cart,
      total,
      date: new Date().toISOString(),
    }

    saveOrder(newOrder)
    setSavedOrders(getSavedOrders())

    const url = `https://wa.me/5535984128081?text=${encodeURIComponent(
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
      <Header
        showAdmin={showAdmin}
        setShowAdmin={setShowAdmin}
        setIsCartOpen={setIsCartOpen}
      />

      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <h3 className="text-3xl sm:text-4xl font-black">
            Destaques da Adega
          </h3>

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
      />

      <Cart
        cart={cart}
        total={total}
        customerName={customerName}
        setCustomerName={setCustomerName}
        address={address}
        setAddress={setAddress}
        addToCart={addToCart}
        setCart={setCart}
        sendWhatsApp={sendWhatsApp}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
    </div>
  )
}

export default App