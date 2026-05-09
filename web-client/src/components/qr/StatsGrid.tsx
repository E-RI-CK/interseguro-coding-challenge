import {
    Sigma,
    TrendingDown,
    TrendingUp,
    FileBarChart,
} from "lucide-react"

import { StatsCard } from "./StatsCard"

type Matrix = 'Q' | 'R';

interface Props {
    stats?: {
        max: number;
        min: number;
        average: number;
        sum: number;
        is_diagonal: boolean;
    },
    matrix: Matrix;
}

export function StatsGrid({ stats, matrix }: Props) {
    if (!stats) return null

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatsCard
                title={`${matrix}-Max`}
                value={stats.max}
                icon={TrendingUp}
            />

            <StatsCard
                title={`${matrix}-Min`}
                value={stats.min}
                icon={TrendingDown}
            />

            <StatsCard
                title={`${matrix}-Average`}
                value={stats.average}
                icon={Sigma}
            />

            <StatsCard
                title={`${matrix}-Sum`}
                value={stats.sum}
                icon={FileBarChart}
            />

            {/* <StatsCard
                title={`${matrix}-Is Diagonal`}
                value={stats.is_diagonal}
                icon={FileBarChart}
            /> */}
        </div>
    )
}