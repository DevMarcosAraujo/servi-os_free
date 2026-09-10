import { useMemo, useState } from 'react'
import { CATEGORIES } from './servicesData'

const WHATSAPP_NUMBER = '5561998679482'

function buildWhatsappMessage(selectedByCategory) {
  const lines = ['Olá! Tenho interesse nos seguintes serviços:', '']

  for (const cat of selectedByCategory) {
    lines.push(`${cat.icon} *${cat.title}*`)
    for (const service of cat.services) {
      lines.push(`• ${service}`)
    }
    lines.push('')
  }

  lines.push('Podem me passar um orçamento sem compromisso?')
  return lines.join('\n')
}

export default function ServiceSelector() {
  const [openCategory, setOpenCategory] = useState(null)
  const [selected, setSelected] = useState({}) // { [categoryId]: Set(serviceNames) }

  const totalSelected = useMemo(
    () =>
      Object.values(selected).reduce(
        (sum, set) => sum + (set ? set.size : 0),
        0,
      ),
    [selected],
  )

  function toggleCategory(id) {
    setOpenCategory((current) => (current === id ? null : id))
  }

  function toggleService(categoryId, service) {
    setSelected((prev) => {
      const current = new Set(prev[categoryId] ?? [])
      if (current.has(service)) {
        current.delete(service)
      } else {
        current.add(service)
      }
      return { ...prev, [categoryId]: current }
    })
  }

  function handleFinish() {
    const selectedByCategory = CATEGORIES.map((cat) => ({
      icon: cat.icon,
      title: cat.title,
      services: [...(selected[cat.id] ?? [])],
    })).filter((cat) => cat.services.length > 0)

    if (selectedByCategory.length === 0) return

    const message = buildWhatsappMessage(selectedByCategory)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-black text-white sm:text-3xl">
          Monte seu orçamento
        </h2>
        <p className="mt-2 text-sm text-[#DFE5F0]">
          Selecione os serviços que você precisa e envie direto pelo WhatsApp
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {CATEGORIES.map((cat) => {
          const isOpen = openCategory === cat.id
          const count = selected[cat.id]?.size ?? 0

          return (
            <div
              key={cat.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]"
            >
              <button
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left active:bg-white/5"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl">{cat.icon}</span>
                  <span className="font-bold text-white">{cat.title}</span>
                  {count > 0 && (
                    <span className="rounded-full bg-[#C9A227] px-2 py-0.5 text-xs font-bold text-[#0C1426]">
                      {count}
                    </span>
                  )}
                </span>
                <span
                  className={`text-[#E6C56E] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <div className="flex flex-col gap-1 border-t border-white/10 px-4 py-3">
                  {cat.services.map((service) => {
                    const checked = selected[cat.id]?.has(service) ?? false
                    return (
                      <label
                        key={service}
                        className="flex items-center gap-3 rounded-lg px-2 py-2.5 active:bg-white/5"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleService(cat.id, service)}
                          className="h-5 w-5 shrink-0 accent-[#C9A227]"
                        />
                        <span className="text-sm text-[#DFE5F0]">
                          {service}
                        </span>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Floating finish bar */}
      {totalSelected > 0 && (
        <div className="sticky bottom-4 z-20 mt-6 flex justify-center px-1">
          <button
            type="button"
            onClick={handleFinish}
            className="flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9A227] to-[#E6C56E] px-6 py-4 text-base font-bold text-[#0C1426] shadow-xl shadow-black/40 transition active:scale-[0.98]"
          >
            Enviar {totalSelected}{' '}
            {totalSelected === 1 ? 'serviço' : 'serviços'} pelo WhatsApp
          </button>
        </div>
      )}
    </section>
  )
}
