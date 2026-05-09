package dto

type MatrixStatistics struct {
	Max        float64 `json:"max"`
	Min        float64 `json:"min"`
	Average    float64 `json:"average"`
	Sum        float64 `json:"sum"`
	IsDiagonal bool    `json:"is_diagonal"`
}

type MatrixData struct {
	Matrix     [][]float64      `json:"matrix"`
	Statistics MatrixStatistics `json:"statistics"`
}

type MatrixResponse struct {
	Q MatrixData `json:"q"`
	R MatrixData `json:"r"`
}
