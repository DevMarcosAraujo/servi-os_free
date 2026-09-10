import ServiceSelector from './ServiceSelector'

const WHATSAPP_NUMBER = '5561998679482'
const WHATSAPP_MESSAGE = 'Olá! Vi o site e quero um orçamento sem compromisso.'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

function GoldPill({ children }) {
  return (
    <span className="inline-block rounded-full border border-[#C9A227] px-4 py-1 text-xs font-semibold tracking-widest text-[#E6C56E] uppercase">
      {children}
    </span>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0C1426] to-[#14213D] font-[Inter,sans-serif] text-white">
      {/* Decorative gold arcs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[360px] w-[360px] rounded-full border border-[#C9A227]/20 sm:h-[520px] sm:w-[520px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-48 h-[360px] w-[360px] rounded-full border border-[#E6C56E]/15 sm:h-[520px] sm:w-[520px]"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-14 text-center sm:px-6 sm:py-20">
        <GoldPill>Brasília · DF</GoldPill>

        <h1 className="mt-6 text-3xl font-black uppercase leading-tight tracking-tight sm:text-5xl">
          Automação,
          <br />
          Segurança e
          <br />
          Infraestrutura
        </h1>

        <p className="mt-4 max-w-md text-base text-[#DFE5F0] sm:text-lg">
          Soluções completas em TI, Redes, Telecom, Segurança e Automação —
          para sua casa ou empresa
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-full max-w-xs items-center justify-center rounded-full bg-gradient-to-r from-[#C9A227] to-[#E6C56E] px-8 py-4 text-base font-bold text-[#0C1426] shadow-lg shadow-black/30 transition active:scale-[0.98] sm:w-auto"
        >
          Falar no WhatsApp
        </a>

        <div className="mt-12 h-px w-32 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent sm:mt-16" />

        <div className="mt-12 w-full sm:mt-16">
          <ServiceSelector />
        </div>

        <p className="mt-14 text-sm text-[#DFE5F0]/70">
          Atendimento em toda Brasília e regiões administrativas do DF
        </p>
      </div>
    </div>
  )
}
