import { useState } from "react"

const products = [
  {
    id: 1,
    name: "Jack Daniels",
    category: "Whisky",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
  },

  {
    id: 2,
    name: "Heineken",
    category: "Cerveja",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9",
  },

  {
    id: 3,
    name: "Chivas Regal",
    category: "Whisky",
    price: 189,
    image:
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b",
  },
]

function App() {
  const [cart, setCart] = useState([])

  function addToCart(product) {
    setCart([...cart, product])
  }

  const total = cart.reduce((acc, item) => acc + item.price, 0)

  function sendWhatsApp() {
    const message = cart
      .map(
        (item) =>
          `• ${item.name} - R$ ${item.price}`
      )
      .join("%0A")

    const url = `https://wa.me/5535984128081?text=🍷 Pedido AdegaFlow AI:%0A%0A${message}%0A%0ATotal: R$ ${total}`

    window.open(url, "_blank")
  }

  return (
    <div className="bg-black text-white min-h-screen">
      
      {/* HEADER */}

      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          
          <h1 className="text-3xl font-black text-amber-400">
            AdegaFlow AI
          </h1>

          <nav className="hidden md:flex gap-8 text-zinc-300">
            <a href="#">Início</a>
            <a href="#">Catálogo</a>
            <a href="#">Promoções</a>
          </nav>

          <button className="bg-amber-500 hover:bg-amber-600 px-5 py-3 rounded-xl font-bold transition">
            Fazer Pedido
          </button>

        </div>
      </header>

      {/* HERO */}

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        
        <img
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b"
          alt=""
          className="absolute w-full h-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 text-center px-6">
          
          <span className="bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-semibold">
            Atendimento inteligente para adegas
          </span>

          <h2 className="text-6xl md:text-7xl font-black mt-8 max-w-5xl leading-tight">
            Sua adega digital com pedidos automáticos
          </h2>

          <p className="text-zinc-300 text-xl mt-8 max-w-2xl mx-auto">
            Catálogo online, pedidos via WhatsApp e automações inteligentes para aumentar suas vendas.
          </p>

          <div className="flex gap-4 justify-center mt-10">
            
            <button className="bg-amber-500 hover:bg-amber-600 px-8 py-4 rounded-2xl text-lg font-bold transition">
              Ver Catálogo
            </button>

            <button className="border border-zinc-700 hover:border-amber-500 px-8 py-4 rounded-2xl text-lg font-bold transition">
              Promoções
            </button>

          </div>
        </div>
      </section>

      {/* PRODUTOS */}

      <section className="max-w-7xl mx-auto px-6 py-24">
        
        <div className="flex items-center justify-between mb-12">
          
          <h3 className="text-4xl font-black">
            Destaques da Adega
          </h3>

          <div className="flex gap-3">
            
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
                alt=""
                className="h-72 w-full object-cover"
              />

              <div className="p-6">
                
                <span className="text-amber-400 text-sm">
                  {product.category}
                </span>

                <h4 className="text-2xl font-bold mt-2">
                  {product.name}
                </h4>

                <div className="flex items-center justify-between mt-6">
                  
                  <span className="text-3xl font-black text-amber-400">
                    R$ {product.price}
                  </span>

                  <button
                    onClick={() => addToCart(product)}
                    className="bg-amber-500 hover:bg-amber-600 px-5 py-3 rounded-xl font-bold transition"
                  >
                    Adicionar
                  </button>

                </div>
              </div>
            </div>

          ))}
        </div>
      </section>

      {/* CARRINHO */}

      <div className="fixed right-5 bottom-5 bg-zinc-950 border border-zinc-800 w-80 rounded-3xl p-5">
        
        <h3 className="text-2xl font-bold mb-5">
          Carrinho ({cart.length})
        </h3>

        <div className="space-y-3 max-h-60 overflow-auto">
          
          {cart.map((item, index) => (
            
            <div
  key={index}
  className="flex items-center justify-between bg-zinc-900 p-3 rounded-xl gap-3"
>
              
              <div>
  <p className="font-semibold">
    {item.name}
  </p>

  <span className="text-amber-400">
    R$ {item.price}
  </span>
</div>

<button
  onClick={() =>
    setCart(cart.filter((_, i) => i !== index))
  }
  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm"
>
  X
</button>

            </div>

          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          
          <span className="text-zinc-400">
            Total
          </span>

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