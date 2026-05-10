// src/services/chatbot.ts

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Envía un mensaje al backend y retorna la respuesta del chatbot.
 * Pertenece a la Capa de Presentación: solo transporta datos,
 * sin lógica de negocio.
 */
export async function sendMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  const response = await fetch(`${API_URL}/api/chatbot/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status}`);
  }

  const data = await response.json();
  return data.reply as string;
}
