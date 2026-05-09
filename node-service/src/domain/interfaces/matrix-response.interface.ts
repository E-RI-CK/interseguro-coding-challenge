export interface MatrixStatistics {
    max: number;
    min: number;
    average: number;
    sum: number;
    is_diagonal: boolean;
}

export interface MatrixData {
    matrix: number[][];
    statistics: MatrixStatistics;
}

export interface MatrixResponse {
    q: MatrixData;
    r: MatrixData;
}