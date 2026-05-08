function StoreInfo() {
  const address =
    "Engenheiro Teixeira Soares, 125 - Regina Coeli, Cambuquira - MG"

  const mapsUrl =
    "https://maps.app.goo.gl/NFP9pDAfsAELGEuN9"

  function getCurrentStatus() {
    const now = new Date()

    const day = now.getDay()
    const hour = now.getHours()

    if (day === 2) {
      return {
        open: false,
        text: "Fechado hoje",
      }
    }

    if (
      day === 3 ||
      day === 4 ||
      day === 1
    ) {
      if (
        hour >= 10 &&
        hour < 24
      ) {
        return {
          open: true,
          text: "Aberto agora",
        }
      }
    }

    if (
      day === 5 ||
      day === 6 ||
      day === 0
    ) {
      if (
        hour >= 11 ||
        hour < 1
      ) {
        return {
          open: true,
          text: "Aberto agora",
        }
      }
    }

    return {
      open: false,
      text: "Fechado agora",
    }
  }

  const status =
    getCurrentStatus()

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-3 h-3 rounded-full ${
                status.open
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            />

            <span
              className={`font-bold ${
                status.open
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {status.text}
            </span>
          </div>

          <h2 className="text-4xl font-black mb-8">
            Horário de funcionamento
          </h2>

          <div className="space-y-4 text-zinc-300">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span>Quarta</span>
              <span>
                10:00 às 00:00
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span>Quinta</span>
              <span>
                10:00 às 00:00
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span>Sexta</span>
              <span>
                11:00 às 01:00
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span>Sábado</span>
              <span>
                11:00 às 01:00
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span>Domingo</span>
              <span>
                11:00 às 01:00
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span>Segunda</span>
              <span>
                10:00 às 00:00
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Terça</span>

              <span className="text-red-400 font-bold">
                Fechado
              </span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <span className="text-amber-400 font-bold">
              Localização
            </span>

            <h2 className="text-4xl font-black mt-4 mb-6">
              Retire no endereço
            </h2>

            <p className="text-zinc-300 text-lg leading-relaxed">
              {address}
            </p>

            <div className="mt-8">
              <iframe
                title="maps"
                src="https://www.google.com/maps?q=Engenheiro+Teixeira+Soares+125+Cambuquira+MG&output=embed"
                className="w-full h-[250px] rounded-2xl border border-zinc-800"
                loading="lazy"
              />
            </div>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-black font-black px-8 py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            Abrir no Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}

export default StoreInfo