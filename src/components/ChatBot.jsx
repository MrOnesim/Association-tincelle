import { useEffect, useRef, useState } from 'react'
import { getBotReply, quickQuestions } from '../data/faqBot'

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
        aria-label="Ouvrir le chat"
        className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:scale-110 transition flex items-center justify-center text-2xl"
      >
        <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-comment-dots'}`}></i>
      </button>

      {open && (
        <div className="fixed bottom-20 left-4 md:bottom-24 md:left-6 z-50 w-[calc(100vw-2rem)] max-w-sm h-[28rem] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
          <div className="bg-primary text-white px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              <p className="font-semibold leading-tight">Assistant Étincelle</p>
              <p className="text-[11px] text-white/80">Répond en quelques secondes</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 text-sm rounded-2xl leading-relaxed ${
                    m.from === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-white text-slate-700 border border-slate-100 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="px-3 py-2 border-t border-slate-100 flex flex-wrap gap-1.5 bg-white">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition"
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
            className="p-3 border-t border-slate-100 flex items-center gap-2 bg-white"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="btn-primary !px-4 !py-2.5" aria-label="Envoyer">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
