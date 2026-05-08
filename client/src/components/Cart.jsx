function Cart({
  cart,
  total,
  customerName,
  setCustomerName,
  phone,
  setPhone,
  address,
  setAddress,
  paymentMethod,
  setPaymentMethod,
  isAdult,
  setIsAdult,
  addToCart,
  setCart,
  sendWhatsApp,
  isCartOpen,
  setIsCartOpen,
}) {
  return (
    <>
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
          ${
            isCartOpen
              ? "translate-y-0"
              : "translate-y-full md:translate-y-0"
          }
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
            type="tel"
            placeholder="Telefone do cliente"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="text"
            placeholder="Endereço completo"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          >
            <option value="">Forma de pagamento</option>
            <option value="Pix">Pix</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <label className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={isAdult}
              onChange={(e) => setIsAdult(e.target.checked)}
              className="mt-1"
            />

            <span>
              Confirmo que o cliente tem 18 anos ou mais.
            </span>
          </label>
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
                            ? {
                                ...product,
                                quantity: product.quantity - 1,
                              }
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
                    setCart(
                      cart.filter((product) => product.id !== item.id)
                    )
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
    </>
  )
}

export default Cart