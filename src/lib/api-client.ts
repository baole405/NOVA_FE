const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message || `API Error: ${response.statusText}`;
      console.log(`[API Error] ${endpoint}:`, errorMessage);
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    // Log network errors or other fetch failures
    if (error instanceof Error && !error.message.includes("API Error")) {
      console.log(`[Network Error] ${endpoint}:`, error.message);
    }
    throw error;
  }
}
