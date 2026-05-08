function StoreInfo() {
  const address =
    "Avenida Engenheiro Teixeira Soares, 125 - Regina Coeli, Cambuquira - MG"

  const mapsUrl =
  "https://maps.app.goo.gl/NFP9pDAfsAELGEuN9"

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
          <span className="text-green-400 font-bold">
            Aberto de quarta a segunda
          </span>

          <h3 className="text-3xl font-black mt-3 mb-5">
            Horário de funcionamento
          </h3>

          <div className="space-y-3 text-zinc-300">
            <p>Quarta: 10:00 às 00:00</p>
            <p>Quinta: 10:00 às 00:00</p>
            <p>Sexta: 11:00 às 01:00</p>
            <p>Sábado: 11:00 às 01:00</p>
            <p>Domingo: 11:00 às 01:00</p>
            <p>Segunda: 10:00 às 00:00</p>
            <p className="text-red-400 font-bold">Terça: Fechado</p>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
          <span className="text-amber-400 font-bold">
            Localização
          </span>

          <h3 className="text-3xl font-black mt-3 mb-5">
            Retire no endereço
          </h3>

          <p className="text-zinc-300 mb-6">
            {address}
          </p>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-4 rounded-2xl transition"
          >
            Abrir no Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}

export default StoreInfo