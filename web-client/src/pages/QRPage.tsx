import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { MatrixConfig } from "@/components/qr/MatrixConfig"
import { MatrixGrid } from "@/components/qr/MatrixGrid"
import { ResultPanel } from "@/components/qr/ResultPanel"
import { ActionBar } from "@/components/qr/ActionBar"
import { StatsGrid } from "@/components/qr/StatsGrid"

import { calculateQR } from "@/services/qr.service"
import type { QRResponse } from "@/types/qr"
import { toast } from "sonner"
import { Button } from '@/components/ui/button';
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"



function createMatrix(rows: number, cols: number) {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0)
    )
}

export default function QRPage() {

    const { theme, setTheme } = useTheme()

    const [rows, setRows] = useState(3)
    const [cols, setCols] = useState(3)

    const [matrix, setMatrix] = useState<number[][]>([
        [1, 1, 1],
        [0, 1, 1],
        [1, 0, -1]
    ])

    const [result, setResult] = useState<QRResponse | null>(null)

    const [loading, setLoading] = useState(false)

    const resizeMatrix = () => {
        setMatrix(createMatrix(rows, cols))
    }

    const randomize = () => {
        const random = matrix.map((row) =>
            row.map(() => Math.floor(Math.random() * 10))
        )

        setMatrix(random)
    }

    const clear = () => {
        setMatrix(createMatrix(rows, cols))
        setResult(null)
    }

    const handleCalculate = async () => {
        try {
            setLoading(true)

            const response = await calculateQR(matrix)
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            setResult(data)

        } catch (error: any) {
            const errorMessage = error.error || error.response?.data?.message || "Ocurrió un error inesperado";
            toast.error('Bad Request', { position: "top-right", description: errorMessage })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="mb-5 flex justify-end items-center">
                <Button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    {
                        theme === 'dark' && <Sun />
                    }
                    {
                        theme === 'light' && <Moon />
                    }
                </Button>
            </div>
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* LEFT */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Matrix Configuration</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <MatrixConfig
                                    rows={rows}
                                    cols={cols}
                                    setRows={setRows}
                                    setCols={setCols}
                                    onResize={resizeMatrix}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Matrix Entry</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <MatrixGrid
                                    matrix={matrix}
                                    setMatrix={setMatrix}
                                />
                            </CardContent>
                        </Card>

                        <ActionBar
                            onCalculate={handleCalculate}
                            onRandomize={randomize}
                            onClear={clear}
                            loading={loading}
                        />
                    </div>

                    {/* RIGHT */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Results</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <ResultPanel
                                title="Matrix Q (Orthogonal)"
                                matrix={result?.q.matrix}
                                isDiagonal={result?.q.statistics.is_diagonal}
                            />

                            <ResultPanel
                                title="Matrix R (Upper Triangular)"
                                matrix={result?.r.matrix}
                                isDiagonal={result?.r.statistics.is_diagonal}
                            />
                        </CardContent>
                    </Card>
                </div>

                <StatsGrid stats={result?.q.statistics} matrix={'Q'} />
                <StatsGrid stats={result?.r.statistics} matrix={'R'} />
            </div>
        </div>
    )
}