import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  rows: number
  cols: number
  setRows: (value: number) => void
  setCols: (value: number) => void
  onResize: () => void
}

export function MatrixConfig({
  rows,
  cols,
  setRows,
  setCols,
  onResize,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">
          Rows
        </label>

        <Input
          type="number"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">
          Columns
        </label>

        <Input
          type="number"
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
        />
      </div>

      <Button className="mt-auto" onClick={onResize}>
        Resize
      </Button>
    </div>
  )
}