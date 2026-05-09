package services

import (
	"errors"
	"go-service/internal/dto"
	"go-service/internal/utils"

	"gonum.org/v1/gonum/mat"
)

func MatrixService(matrix [][]float64) (dto.QRResponse, error) {

	//Matrix validation
	validation := utils.ValidateMatrix(matrix)

	if !validation.Success {
		return dto.QRResponse{}, errors.New(validation.Message)
	}

	rows := len(matrix)
	cols := len(matrix[0])

	//Convert [][]float64 to []float64
	data := make([]float64, 0)

	for _, row := range matrix {
		data = append(data, row...)
	}

	//Create dense matrix
	A := mat.NewDense(rows, cols, data)

	//QR decomposition
	var qr mat.QR
	qr.Factorize(A)

	//Extract Q
	var q mat.Dense
	qr.QTo(&q)

	//Extract R
	var r mat.Dense
	qr.RTo(&r)

	//Match manual Gram-Schmidt sign convention
	normalizeSigns(&q, &r)

	return dto.QRResponse{
		Q: utils.DenseToArray(&q),
		R: utils.DenseToArray(&r),
	}, nil

}

func normalizeSigns(q, r *mat.Dense) {
	qRows, qCols := q.Dims()
	_, rCols := r.Dims()

	for col := 0; col < qCols; col++ {

		//Find first non-zero value in column
		for row := 0; row < qRows; row++ {

			value := q.At(row, col)

			if value != 0 {

				//If first non-zero is negative
				if value < 0 {

					//Multiply Q column by -1
					for i := 0; i < qRows; i++ {
						q.Set(i, col, -q.At(i, col))
					}

					//Multiply corresponding R row by -1
					for j := 0; j < rCols; j++ {
						r.Set(col, j, -r.At(col, j))
					}
				}

				break
			}
		}
	}
}
