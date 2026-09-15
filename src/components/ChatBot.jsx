import { useEffect, useRef, useState } from 'react'
import { getBotReply, quickQuestions } from '../data/faqBot'
import Spark from './Spark'
import Logo from './Logo'

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Bonjour 👋 Je suis l'assistant de l'Association Étincelle. Posez-moi une question ou choisissez un sujet ci-dessous.",
    },
  ])
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = (text) => {
    const value = (text || '').trim()
    if (!value) return
    const next = [...messages, { from: 'user', text: value }]
    setMessages(next)
    setInput('')
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: getBotReply(value) }])
    }, 450)
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant"}
        className="fixed bottom-5 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-ink text-gold-300 shadow-ink-card ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:scale-105 md:bottom-7 md:left-7"
      >
        {open ? (
          <i className="fa-solid fa-xmark text-xl" />
        ) : (
          <>
            <i className="fa-solid fa-comment-dots text-2xl" />
            <Spark className="absolute -right-1 -top-1 h-3.5 w-3.5 text-gold-400 animate-twinkle" />
          </>
        )}
      </button>

      <div
        className={`fixed bottom-24 left-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-ink-card transition-all duration-500 md:bottom-28 md:left-7 ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        style={{ height: '28rem' }}
        aria-hidden={!open}
      >
        <div className="grain relative flex items-center gap-3 bg-ink-grad px-5 py-4 text-porcelain">
          <Logo onDark className="h-8 w-auto" tileClass="rounded-full bg-porcelain p-1.5" />
          <span>
            <span className="block font-display font-semibold leading-tight">Assistant Étincelle</span>
            <span className="block text-[11px] text-porcelain/60">Répond en quelques secondes</span>
          </span>
          <Spark className="ml-auto h-4 w-4 text-gold-300/70 animate-twinkle" />
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-porcelain px-4 py-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${
                  m.from === 'user'
                    ? 'rounded-br-sm bg-brand-grad text-white'
                    : 'rounded-bl-sm border border-ink/8 bg-white text-ink/85'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-ink/8 bg-white px-3 py-2">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="rounded-full bg-ivory px-2.5 py-1 text-[11px] font-semibold text-ink/70 transition hover:bg-wine-600 hover:text-white"
            >
              {q}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="flex items-center gap-2 border-t border-ink/8 bg-white p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 rounded-xl border border-ink/12 px-4 py-2.5 text-sm focus:border-wine-600 focus:outline-none focus:ring-2 focus:ring-wine-600/20"
          />
          <button type="submit" className="btn-primary !px-4 !py-2.5" aria-label="Envoyer">
            <i className="fa-solid fa-paper-plane" />
          </button>
        </form>
      </div>
    </>
  )
}
