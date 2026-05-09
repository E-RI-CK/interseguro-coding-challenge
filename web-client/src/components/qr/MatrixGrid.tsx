import { Input } from "@/components/ui/input";

interface Props {
  matrix: number[][]
  setMatrix: (matrix: number[][]) => void
}

export function MatrixGrid({ matrix, setMatrix }: Props) {
  const updateCell = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const copy = matrix.map((row) => [...row])

    copy[rowIndex][colIndex] = Number(value)

    setMatrix(copy)
  }

  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${matrix[0].length}, minmax(0,1fr))`,
      }}
    >
      {matrix.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <Input
            key={`${rowIndex}-${colIndex}`}
            type="number"
            value={value}
            onChange={(e) =>
              updateCell(rowIndex, colIndex, e.target.value)
            }
            className="text-center"
          />
        ))
      )}
    </div>
  )
}