import { Input } from "@/components/ui/input";

interface Props {
  matrix: string[][]
  setMatrix: (matrix: string[][]) => void
}

export function MatrixGrid({ matrix, setMatrix }: Props) {

  const updateCell = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {

    // Allow negatives and decimals
    if (!/^[-]?\d*\.?\d*$/.test(value)) {
      return
    }

    const copy = matrix.map((row) => [...row])

    copy[rowIndex][colIndex] = value

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
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) =>
              updateCell(
                rowIndex,
                colIndex,
                e.target.value
              )
            }
            className="text-center"
          />
        ))
      )}
    </div>
  )
}