import { QRDto } from "../domain/dtos/statistics/qr.dto";
import { MatrixResponse, MatrixStatistics } from "../domain/interfaces/matrix-response.interface";


export class StatisticsService {

    public async generateStatistics(qrDto: QRDto): Promise<MatrixResponse> {

        const qStatistics = this.calculateStatistics(qrDto.q);

        const rStatistics = this.calculateStatistics(qrDto.r);

        return {
            q: {
                matrix: qrDto.q,
                statistics: qStatistics,
            },
            r: {
                matrix: qrDto.r,
                statistics: rStatistics,
            },
        };
    };

    private isDiagonal(matrix: number[][]): boolean {

        for (let i = 0; i < matrix.length; i++) {

            for (let j = 0; j < matrix[i].length; j++) {

                if (i !== j && matrix[i][j] !== 0) {
                    return false;
                }
            }
        }

        return true;
    };

    private calculateStatistics(matrix: number[][]): MatrixStatistics {

        const values = matrix.flat();

        const sum = values.reduce((acc, value) => acc + value, 0);

        const average = sum / values.length;

        const max = Math.max(...values);

        const min = Math.min(...values);

        return {
            max,
            min,
            average,
            sum,
            is_diagonal: this.isDiagonal(matrix),
        };
    }

}