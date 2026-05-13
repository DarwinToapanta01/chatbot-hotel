const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function sendMessage(
  message: string,
  sessionId?: string | null,
  token?: string | null
): Promise<{ reply: string; sessionId: string }> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Si hay token, enviarlo para que el chatbot pueda crear reservas
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/api/chatbot/message`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message, sessionId }),
  });

  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status}`);
  }

  return response.json();
}