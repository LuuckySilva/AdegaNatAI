function Header({ setIsCartOpen }) {
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <button
          onClick={() => scrollToSection("inicio")}
          className="text-2xl sm:text-3xl font-black text-amber-400"
        >
          Adega Nat AI
        </button>

        <nav className="hidden lg:flex gap-8 text-zinc-300">
          <button onClick={() => scrollToSection("inicio")}>
            Início
          </button>

          <button onClick={() => scrollToSection("catalogo")}>
            Catálogo
          </button>

          <button onClick={() => scrollToSection("catalogo")}>
            Promoções
          </button>

          <button onClick={() => scrollToSection("localizacao")}>
            Localização
          </button>
        </nav>

        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 px-5 py-3 rounded-xl font-bold transition text-black"
        >
          Fazer Pedido
        </button>
      </div>
    </header>
  )
}

export default Header