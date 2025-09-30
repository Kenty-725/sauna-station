export async function login(email: string, password: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/staff/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw err?.error || 'ログインに失敗しました';
  }
  return res.json();
}

export async function logout() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/staff/logout`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    throw 'ログアウトに失敗しました';
  }
  return res.json();
}
