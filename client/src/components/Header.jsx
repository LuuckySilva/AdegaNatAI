function Header({
  setShowAdmin,
  showAdmin,
  setIsCartOpen,
}) {
  return (
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
  )
}

export default Header