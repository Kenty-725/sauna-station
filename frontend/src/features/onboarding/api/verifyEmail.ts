export async function verifyEmail(email: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/confirm/resend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw error || { error: "メール再送に失敗しました" };
  }
  return res.json();
}
