function Hero() {
  return (
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
  )
}

export default Hero