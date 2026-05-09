package services

import (
	"bytes"
	"encoding/json"
	"errors"
	"go-service/internal/dto"
	"go-service/internal/utils"
	"math"
	"net/http"
)

func MatrixService(matrix [][]float64) (dto.MatrixResponse, error) {

	// Matrix validation
	validation := utils.ValidateMatrix(matrix)

	if !validation.Success {
		return dto.MatrixResponse{}, errors.New(validation.Message)
	}

	q, r := gramSchmidt(matrix)

	qrResponse := dto.QRResponse{
		Q: q,
		R: r,
	}

	// Send to Node
	result, err := sendToNode(qrResponse)

	if err != nil {
		return dto.MatrixResponse{}, err
	}

	return result, nil
}

func gramSchmidt(a [][]float64) ([][]float64, [][]float64) {

	rows := len(a)
	cols := len(a[0])

	//Initialize Q and R
	q := make([][]float64, rows)
	for i := range q {
		q[i] = make([]float64, cols)
	}

	r := make([][]float64, cols)
	for i := range r {
		r[i] = make([]float64, cols)
	}

	//Process each column
	for j := 0; j < cols; j++ {

		//Copy current column of A into v
		v := make([]float64, rows)

		for i := 0; i < rows; i++ {
			v[i] = a[i][j]
		}

		//Subtract projections
		for k := 0; k < j; k++ {

			var dot float64

			for i := 0; i < rows; i++ {
				dot += q[i][k] * a[i][j]
			}

			r[k][j] = dot

			for i := 0; i < rows; i++ {
				v[i] -= dot * q[i][k]
			}
		}

		//Compute norm
		var norm float64

		for i := 0; i < rows; i++ {
			norm += v[i] * v[i]
		}

		norm = math.Sqrt(norm)

		r[j][j] = utils.RoundDecimal(norm, 4)

		//Normalize vector
		for i := 0; i < rows; i++ {
			q[i][j] = utils.RoundDecimal(v[i]/norm, 4)
		}
	}

	return q, r
}

func sendToNode(qr dto.QRResponse) (dto.MatrixResponse, error) {

	jsonData, err := json.Marshal(qr)

	if err != nil {
		return dto.MatrixResponse{}, err
	}

	resp, err := http.Post(
		"http://localhost:4000/api/statistics",
		"application/json",
		bytes.NewBuffer(jsonData),
	)

	if err != nil {
		return dto.MatrixResponse{}, err
	}

	defer resp.Body.Close()

	var result dto.MatrixResponse

	err = json.NewDecoder(resp.Body).Decode(&result)

	if err != nil {
		return dto.MatrixResponse{}, err
	}

	return result, nil
}
