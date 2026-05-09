export async function calculateQR(matrix: number[][]) {
    const response = await fetch(`${import.meta.env.VITE_GO_API_URL}/qr`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            matrix,
        }),
    });
    

    return response ;
}