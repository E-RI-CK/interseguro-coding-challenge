
export async function login(username: string) {

  const response = await fetch(
    `${import.meta.env.VITE_GO_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}