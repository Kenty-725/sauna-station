export async function verifyEmail(email?: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/confirm/resend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(email ? { email } : {}),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw error || { error: "確認メールの再送に失敗しました" };
  }
  return res.json();
}
