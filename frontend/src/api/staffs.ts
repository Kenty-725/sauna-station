export async function createStaff(data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/staffs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ staff: data }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  return res.json();
}
