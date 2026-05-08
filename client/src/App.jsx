import { useState, useEffect } from "react"

import Header from "./components/Header"
import Hero from "./components/Hero"
import ProductCard from "./components/ProductCard"
import Cart from "./components/Cart"
import AdminPanel from "./components/AdminPanel"
import StoreInfo from "./components/StoreInfo"

const API_URL = "http://localhost:3000"

const ADMIN_USER = "admin"
const ADMIN_PASSWORD = "nat123"

function App() {
  const [products, setProducts] = useState([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)

  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const [showAdmin, setShowAdmin] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(
    window.location.hash === "#admin"
  )

  const [adminUser, setAdminUser] = useState("")
  const [adminPassword, setAdminPassword] = useState("")

  const [savedOrders, setSavedOrders] = useState([])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  useEffect(() => {
    fetchProducts()
    fetchOrders()
  }, [])

  async function fetchProducts() {
    try {
      const response = await fetch(`${API_URL}/products`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
      alert("Erro ao carregar produtos do servidor.")
    } finally {
      setIsLoadingProducts(false)
    }
  }

  async function fetchOrders() {
    try {
      const response = await fetch(`${API_URL}/orders`)
      const data = await response.json()
      setSavedOrders(data)
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error)
    }
  }

  const monthlyRevenue = savedOrders.reduce(
    (acc, order) => acc + Number(order.total || 0),
    0
  )

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Todos" ? true : product.category === selectedCategory

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSearch
  })

  function handleAdminLogin(event) {
    event.preventDefault()

    if (adminUser === ADMIN_USER && adminPassword === ADMIN_PASSWORD) {
      setShowAdmin(true)
      setShowAdminLogin(false)
      setAdminUser("")
      setAdminPassword("")
      return
    }

    alert("Usuário ou senha incorretos.")
  }

  function closeAdminLogin() {
    setShowAdminLogin(false)
    setAdminUser("")
    setAdminPassword("")
    window.location.hash = ""
  }

  function addToCart(product) {
    if (product.stock <= 0 || !product.active) return

    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      if (existingItem.quantity >= product.stock) return

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

    setIsCartOpen(true)
  }

  async function addProduct(newProduct) {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      })

      const createdProduct = await response.json()
      setProducts([...products, createdProduct])
    } catch (error) {
      console.error("Erro ao adicionar produto:", error)
      alert("Erro ao adicionar produto.")
    }
  }

  async function updateProduct(updatedProduct) {
    try {
      const response = await fetch(`${API_URL}/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      })

      const productFromApi = await response.json()

      setProducts(
        products.map((product) =>
          product.id === productFromApi.id ? productFromApi : product
        )
      )
    } catch (error) {
      console.error("Erro ao atualizar produto:", error)
      alert("Erro ao atualizar produto.")
    }
  }

  async function deleteProduct(productId) {
    const confirmDelete = confirm("Deseja remover este produto?")

    if (!confirmDelete) return

    try {
      await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
      })

      setProducts(products.filter((product) => product.id !== productId))
      setCart(cart.filter((item) => item.id !== productId))
    } catch (error) {
      console.error("Erro ao remover produto:", error)
      alert("Erro ao remover produto.")
    }
  }

  async function updateStock(productId, amount) {
    const product = products.find((item) => item.id === productId)

    if (!product) return

    const updatedProduct = {
      ...product,
      stock: Math.max(0, product.stock + amount),
    }

    await updateProduct(updatedProduct)
  }

  async function updateOrderStatus(orderId, newStatus) {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      })

      const updatedOrder = await response.json()

      setSavedOrders(
        savedOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      )
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error)
      alert("Erro ao atualizar status do pedido.")
    }
  }

  async function deleteOrder(orderId) {
    const confirmDelete = confirm("Deseja excluir este pedido?")

    if (!confirmDelete) return

    try {
      await fetch(`${API_URL}/orders/${orderId}`, {
        method: "DELETE",
      })

      setSavedOrders(savedOrders.filter((order) => order.id !== orderId))
    } catch (error) {
      console.error("Erro ao excluir pedido:", error)
      alert("Erro ao excluir pedido.")
    }
  }

  if (showAdmin) {
    return (
      <AdminPanel
        setShowAdmin={setShowAdmin}
        products={products}
        addProduct={addProduct}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
        updateStock={updateStock}
        savedOrders={savedOrders}
        monthlyRevenue={monthlyRevenue}
        updateOrderStatus={updateOrderStatus}
        deleteOrder={deleteOrder}
      />
    )
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {showAdminLogin && (
        <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center px-6">
          <form
            onSubmit={handleAdminLogin}
            className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl"
          >
            <span className="text-amber-400 font-bold">Acesso restrito</span>

            <h2 className="text-3xl font-black mt-3 mb-6">
              Painel Administrativo
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Usuário"
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="password"
                placeholder="Senha"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-black py-4 rounded-2xl mt-6"
            >
              Entrar no painel
            </button>

            <button
              type="button"
              onClick={closeAdminLogin}
              className="w-full bg-zinc-800 hover:bg-zinc-700 font-bold py-4 rounded-2xl mt-3"
            >
              Voltar ao site
            </button>

            <p className="text-zinc-500 text-sm mt-5 text-center">
              Área exclusiva para administração do catálogo.
            </p>
          </form>
        </div>
      )}

      <Header setIsCartOpen={setIsCartOpen} />

      <main>
        <section id="inicio">
          <Hero />
        </section>

        <section id="catalogo" className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <h3 className="text-3xl sm:text-4xl font-black">Catálogo</h3>

              <input
                type="text"
                placeholder="Buscar produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 lg:w-80 outline-none"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {["Todos", "Promoções", "Porções", "Outros"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-xl border transition whitespace-nowrap ${
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

          {isLoadingProducts ? (
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 text-center text-zinc-400">
              Carregando produtos...
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          )}
        </section>

        <section id="localizacao">
          <StoreInfo />
        </section>
      </main>

      <Cart
  cart={cart}
  setCart={setCart}
  addToCart={addToCart}
  isCartOpen={isCartOpen}
  setIsCartOpen={setIsCartOpen}
  products={products}
  setProducts={setProducts}
  fetchOrders={fetchOrders}
/>
    </div>
  )
}

export default App