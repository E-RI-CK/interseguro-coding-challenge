import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface Props {
  title: string
  value: string | number | boolean
  icon: LucideIcon
}

export function StatsCard({
  title,
  value,
  icon: Icon,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-xs uppercase text-muted-foreground">
              {title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {Number(value).toFixed(2)}
            </h2>
          </div>

          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  )
}