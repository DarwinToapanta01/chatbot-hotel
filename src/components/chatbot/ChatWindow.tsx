// src/components/chatbot/ChatWindow.tsx
import { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../../services/chatbot';
import { useAuth } from '../../context/AuthContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_ACTIONS = [
  '¿Qué habitaciones tienen disponibles?',
  '¿Cuáles son sus precios?',
  'Quiero hacer una reserva',
  '¿Cuál es la política de cancelación?',
];

interface ChatWindowProps {
  onClose: () => void;
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const { token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: '¡Hola! Soy el asistente virtual del hotel. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null); // ← nuevo
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async (text?: string) => {
    const content = text ?? input.trim();
    if (!content || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Pasa el sessionId para mantener el contexto de conversación
      const { reply, sessionId: newSessionId } = await sendMessage(content, sessionId, token);

      // Guarda el sessionId la primera vez
      if (!sessionId) setSessionId(newSessionId);

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Lo siento, hubo un error al procesar tu mensaje. Intenta de nuevo.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });

  const showQuickActions = messages.length === 1;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '96px',
        right: '24px',
        width: '380px',
        height: '560px',
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,38,43,0.12), 0 2px 8px rgba(0,38,43,0.06)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 9999,
        fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
        animation: 'chatSlideUp 0.2s ease-out',
      }}
    >
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-4px); opacity: 1; }
        }
        .chat-dot { animation: dotBounce 1.2s ease-in-out infinite; }
        .chat-dot:nth-child(2) { animation-delay: 0.15s; }
        .chat-dot:nth-child(3) { animation-delay: 0.30s; }
        .chat-input:focus { outline: none; }
        .quick-btn:hover { background: #00262b; color: #ffffff; }
        .send-btn:hover:not(:disabled) { background: #0b363b; }
        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .close-btn:hover { background: rgba(255,255,255,0.15); }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: '#00262b',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#abffae',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            flexShrink: 0,
          }}
        >
          🏨
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '14px', letterSpacing: '0.014px' }}>
            Asistente del Hotel
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#abffae' }} />
            <span style={{ color: '#a1c2c6', fontSize: '12px' }}>En línea</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="close-btn"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#a1c2c6',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            fontSize: '18px',
            lineHeight: 1,
            transition: 'background 0.15s',
          }}
          aria-label="Cerrar chat"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: '#fafafa',
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '10px 14px',
                borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                background: msg.role === 'user' ? '#00262b' : '#ffffff',
                color: msg.role === 'user' ? '#ffffff' : '#00262b',
                fontSize: '14px',
                lineHeight: 1.5,
                letterSpacing: '0.014px',
                border: msg.role === 'assistant' ? '1px solid rgba(0,0,0,0.06)' : 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              {msg.content}
            </div>
            <span style={{ fontSize: '11px', color: '#a1c2c6', marginTop: '4px', paddingLeft: '2px', paddingRight: '2px' }}>
              {formatTime(msg.timestamp)}
            </span>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '12px 12px 12px 2px',
                padding: '12px 16px',
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <div className="chat-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#437278' }} />
              <div className="chat-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#437278' }} />
              <div className="chat-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#437278' }} />
            </div>
          </div>
        )}

        {showQuickActions && !isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
            <span style={{ fontSize: '12px', color: '#a1c2c6', letterSpacing: '0.017px' }}>
              Preguntas frecuentes:
            </span>
            {QUICK_ACTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="quick-btn"
                style={{
                  background: '#ffffff',
                  border: '1px solid #abffae',
                  borderRadius: '9999px',
                  padding: '7px 14px',
                  fontSize: '13px',
                  color: '#0b363b',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s, color 0.15s',
                  letterSpacing: '0.013px',
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: '12px 16px',
          background: '#ffffff',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <input
          ref={inputRef}
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje..."
          disabled={isLoading}
          style={{
            flex: 1,
            background: '#fafafa',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '9999px',
            padding: '9px 16px',
            fontSize: '14px',
            color: '#00262b',
            letterSpacing: '0.014px',
          }}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="send-btn"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#00262b',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.15s',
          }}
          aria-label="Enviar mensaje"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="#abffae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}