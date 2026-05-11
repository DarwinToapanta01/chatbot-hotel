// src/services/chatbot.ts

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

/**
 * Envía un mensaje al backend y retorna la respuesta y sessionId.
 * Pertenece a la Capa de Presentación: solo transporta datos,
 * sin lógica de negocio.
 */
export async function sendMessage(
  message: string,
  sessionId?: string | null
): Promise<{ reply: string; sessionId: string }> {
  const response = await fetch(`${API_URL}/api/chatbot/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status}`);
  }

  return response.json();
}
