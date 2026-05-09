import { Badge } from "../ui/badge";

interface Props {
  title: string;
  matrix?: number[][];
  isDiagonal: boolean | undefined;
}

export function ResultPanel({ title, matrix, isDiagonal }: Props) {
  return (
    <div className="space-y-3">
      <div className="inline-flex gap-x-2 items-center">
        <h3 className="font-medium">{title}</h3>
        {
          (typeof isDiagonal !== 'undefined')
          && (
            (isDiagonal)
              ?
              <Badge>Diagonal</Badge>
              :
              <Badge variant={"destructive"}>Non-diagonal</Badge>
          )
        }
      </div>
      <div className="bg-muted rounded-lg p-4 overflow-auto">
        {!matrix ? (
          <p className="text-sm text-muted-foreground">
            No results
          </p>
        ) : (
          <div className="inline-block border-l-2 border-r-2 border-foreground px-3 py-2">
            <div className="flex flex-col gap-2">
              {matrix.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex gap-3 justify-center"
                >
                  {row.map((value, colIndex) => (
                    <div
                      key={colIndex}
                      className="min-w-17.5 text-center font-mono text-sm"
                    >
                      {Number(value).toFixed(2)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}