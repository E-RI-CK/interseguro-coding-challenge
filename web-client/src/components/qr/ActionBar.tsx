import { Button } from "@/components/ui/button"

interface Props {
  onCalculate: () => void
  onRandomize: () => void
  onClear: () => void
  loading: boolean
}

export function ActionBar({
  onCalculate,
  onRandomize,
  onClear,
  loading,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={onCalculate} disabled={loading}>
        {loading ? "Calculating..." : "Calculate QR"}
      </Button>

      <Button variant="outline" onClick={onRandomize}>
        Randomize
      </Button>

      <Button variant="destructive" onClick={onClear}>
        Clear
      </Button>
    </div>
  )
}