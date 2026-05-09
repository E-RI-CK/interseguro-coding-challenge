
export async function calculateQR(matrix: number[][], token: string) {
    const response = await fetch(`${import.meta.env.VITE_GO_API_URL}/qr`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            matrix,
        }),
    });



    return response;
}