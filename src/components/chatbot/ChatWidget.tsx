// src/components/chatbot/ChatWidget.tsx
import { useState } from 'react';
import { ChatWindow } from './ChatWindow';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}

      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#00262b',
          border: '2px solid #abffae',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,38,43,0.20)',
          zIndex: 10000,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          fontFamily: "'Inter', sans-serif",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(0,38,43,0.28)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(0,38,43,0.20)';
        }}
      >
        <div
          style={{
            transition: 'transform 0.2s ease, opacity 0.15s ease',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            fontSize: '22px',
            lineHeight: 1,
          }}
        >
          {isOpen ? '✕' : '💬'}
        </div>

        {/* Badge de notificación (solo cuando está cerrado) */}
        {!isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#abffae',
              border: '2px solid #ffffff',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        )}
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50%       { transform: scale(1.25); opacity: 0.8; }
          }
        `}</style>
      </button>
    </>
  );
}
