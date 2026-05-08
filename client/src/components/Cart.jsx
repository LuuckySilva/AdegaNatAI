function Cart({
  cart,
  setCart,
  addToCart,
  isCartOpen,
  setIsCartOpen,
  products,
  setProducts,
}) {
  const API_URL = "http://localhost:3000"

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  function handleRemoveOne(itemId) {
    setCart(
      cart
        .map((product) =>
          product.id === itemId
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0)
    )
  }

  function handleRemoveItem(itemId) {
    setCart(cart.filter((product) => product.id !== itemId))
  }

  function handleEnter(event) {
    if (event.key === "Enter" && event.target.tagName !== "TEXTAREA") {
      event.preventDefault()
      sendWhatsApp()
    }
  }

  async function sendWhatsApp() {
    const customerName = document.getElementById("customerName").value
    const customerPhone = document.getElementById("customerPhone").value
    const customerAddress = document.getElementById("customerAddress").value
    const paymentMethod = document.getElementById("paymentMethod").value
    const deliveryFee = 0
    const observation = document.getElementById("observation").value
    const isAdult = document.getElementById("isAdult").checked

    if (!customerName || !customerPhone || !customerAddress || !paymentMethod) {
      alert("Preencha todos os dados.")
      return
    }

    if (!isAdult) {
      alert("Confirme a maioridade.")
      return
    }

    if (cart.length === 0) {
      alert("Adicione pelo menos 1 produto ao carrinho.")
      return
    }

    const finalTotal = total + deliveryFee

    const orderPayload = {
      customerName,
      customerPhone,
      address: customerAddress,
      paymentMethod,
      deliveryTax: deliveryFee,
      notes: observation,
      products: cart,
      total: finalTotal,
    }

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      })

      if (!response.ok) {
        throw new Error("Erro ao salvar pedido.")
      }

      const savedOrder = await response.json()

      const itemsMessage = cart
        .map(
          (item) =>
            `• ${item.name} (${item.quantity}x) - R$ ${
              item.price * item.quantity
            }`
        )
        .join("\n")

      const message = `
🛒 NOVO PEDIDO - ADEGA NAT AI

📦 Pedido Nº: ${savedOrder.number}

👤 Cliente:
${customerName}

📞 Telefone:
${customerPhone}

📍 Endereço:
${customerAddress}

💳 Pagamento:
${paymentMethod}

🚚 Taxa de entrega:
A verificar conforme localidade

📝 Observação:
${observation || "Sem observação"}

📋 Itens:
${itemsMessage}

💰 Total:
R$ ${finalTotal}
`

    setProducts(
  products.map((product) => {
    const cartItem = cart.find((item) => item.id === product.id)

    if (!cartItem) return product

    return {
      ...product,
      stock: Math.max(0, product.stock - cartItem.quantity),
    }
  })
)
      const phone = "5535984128081"

      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
      )

      setCart([])
      setIsCartOpen(false)
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error)
      alert("Erro ao finalizar pedido. Verifique se o backend está rodando.")
    }
  }

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-5 right-5 z-50 bg-amber-500 hover:bg-amber-600 text-black font-black px-6 py-4 rounded-2xl shadow-2xl"
      >
        🛒 Carrinho ({cart.length})
      </button>

      <div
        className={`fixed right-0 bottom-0 md:top-0 z-[999] bg-zinc-950 border border-zinc-800 h-[95vh] md:h-screen w-full sm:w-[420px] rounded-t-3xl md:rounded-none transition-transform duration-300 flex flex-col ${
          isCartOpen
            ? "translate-x-0 translate-y-0"
            : "translate-y-full md:translate-y-0 md:translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-3xl font-black">
            Carrinho ({cart.length})
          </h2>

          <button
            onClick={() => setIsCartOpen(false)}
            className="bg-zinc-800 hover:bg-zinc-700 w-12 h-12 rounded-full font-bold"
          >
            X
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {cart.length === 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center text-zinc-400">
                Nenhum produto no carrinho.
              </div>
            )}

            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-lg">{item.name}</h4>

                    <span className="text-amber-400">
                      R$ {item.price * item.quantity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRemoveOne(item.id)}
                      className="bg-zinc-700 hover:bg-zinc-600 w-8 h-8 rounded-lg"
                    >
                      -
                    </button>

                    <span className="font-bold">{item.quantity}</span>

                    <button
                      onClick={() => addToCart(item)}
                      className="bg-amber-500 hover:bg-amber-600 text-black w-8 h-8 rounded-lg font-bold"
                    >
                      +
                    </button>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-red-500 hover:bg-red-600 w-8 h-8 rounded-lg"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <input
              id="customerName"
              type="text"
              placeholder="Nome do cliente"
              onKeyDown={handleEnter}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4"
            />

            <input
              id="customerPhone"
              type="text"
              placeholder="Telefone"
              onKeyDown={handleEnter}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4"
            />

            <input
              id="customerAddress"
              type="text"
              placeholder="Endereço completo"
              onKeyDown={handleEnter}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4"
            />

            <select
              id="paymentMethod"
              onKeyDown={handleEnter}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4"
            >
              <option value="">Forma de pagamento</option>
              <option>Dinheiro</option>
              <option>Pix</option>
              <option>Cartão</option>
            </select>

            <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-zinc-300">
  <span className="block text-sm text-zinc-500 mb-1">
    Taxa de entrega
  </span>

  <strong className="text-white">
    A verificar conforme localidade
  </strong>
</div>
            <textarea
              id="observation"
              placeholder="Observações"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 min-h-[120px]"
            />

            <label className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4">
              <input id="isAdult" type="checkbox" />

              <span className="text-sm text-zinc-300">
                Confirmo que o cliente possui 18 anos ou mais.
              </span>
            </label>
          </div>
        </div>

        <div className="border-t border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-zinc-400">Total</span>

            <span className="text-4xl font-black text-amber-400">
              R$ {total}
            </span>
          </div>

          <button
            onClick={sendWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-black py-5 rounded-2xl text-lg"
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart