package utils

import "gonum.org/v1/gonum/mat"

func DenseToArray(m *mat.Dense) [][]float64 {
	rows, cols := m.Dims()

	result := make([][]float64, rows)

	for i := 0; i < rows; i++ {
		result[i] = make([]float64, cols)

		for j := 0; j < cols; j++ {
			result[i][j] = RoundDecimal(m.At(i, j), 4)
		}
	}

	return result
}
