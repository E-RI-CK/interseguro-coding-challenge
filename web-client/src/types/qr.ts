export interface MatrixStatistics {
  max: number
  min: number
  average: number
  sum: number
  is_diagonal: boolean
}

export interface MatrixResponse {
  matrix: number[][]
  statistics: MatrixStatistics
}

export interface QRResponse {
  q: MatrixResponse
  r: MatrixResponse
}