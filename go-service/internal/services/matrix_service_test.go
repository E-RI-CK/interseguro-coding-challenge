package services

import (
	"math"
	"reflect"
	"testing"
)

func TestMatrixService_EmptyMatrix(t *testing.T) {

	matrix := [][]float64{}

	_, err := MatrixService(matrix)

	if err == nil {
		t.Errorf("expected error for empty matrix")
	}
}

func TestMatrixService_ValidMatrix(t *testing.T) {

	t.Setenv(
		"NODE_SERVICE_API_URL",
		"http://localhost:4000/api",
	)

	matrix := [][]float64{
		{1, 2},
		{3, 4},
	}

	_, err := MatrixService(matrix)

	if err != nil {
		t.Errorf("expected no error")
	}
}

// Test Q Matrix_1 output
func TestGramSchmidt_Q_3x3Matrix(t *testing.T) {

	matrix := [][]float64{
		{1, 1, 1},
		{0, 1, 1},
		{1, 0, -1},
	}

	expectedQResult := [][]float64{
		{0.71, 0.41, 0.58},
		{0.00, 0.82, -0.58},
		{0.71, -0.41, -0.58},
	}

	q, _ := gramSchmidt(matrix)

	for i := range q {
		for j := range q[i] {

			q[i][j] = math.Round(q[i][j]*100) / 100
		}
	}

	if !reflect.DeepEqual(expectedQResult, q) {

		t.Errorf(
			"expected %v but got %v",
			expectedQResult,
			q,
		)
	}
}

// Test Q Matrix_2 output
func TestGramSchmidt_QValidOutput_2(t *testing.T) {

	matrix := [][]float64{
		{-1, 3},
		{1, 5},
	}

	expectedQResult := [][]float64{
		{-0.71, 0.71},
		{0.71, 0.71},
	}

	q, _ := gramSchmidt(matrix)

	for i := range q {
		for j := range q[i] {

			q[i][j] = math.Round(q[i][j]*100) / 100
		}
	}

	if !reflect.DeepEqual(expectedQResult, q) {

		t.Errorf(
			"expected %v but got %v",
			expectedQResult,
			q,
		)
	}
}

// Test R Matrix_1 output
func TestGramSchmidt_RValidOutput_1(t *testing.T) {

	matrix := [][]float64{
		{1, 1, 1},
		{0, 1, 1},
		{1, 0, -1},
	}

	expectedQResult := [][]float64{
		{1.41, 0.71, 0.00},
		{0.00, 1.22, 1.63},
		{0.00, 0.00, 0.58},
	}

	_, r := gramSchmidt(matrix)

	for i := range r {
		for j := range r[i] {

			r[i][j] = math.Round(r[i][j]*100) / 100
		}
	}

	if !reflect.DeepEqual(expectedQResult, r) {

		t.Errorf(
			"expected %v but got %v",
			expectedQResult,
			r,
		)
	}
}

// Test R Matrix_2 output
func TestGramSchmidt_RValidOutput_2(t *testing.T) {

	matrix := [][]float64{
		{-1, 3},
		{1, 5},
	}

	expectedQResult := [][]float64{
		{1.41, 1.41},
		{0.00, 5.66},
	}

	_, r := gramSchmidt(matrix)

	for i := range r {
		for j := range r[i] {

			r[i][j] = math.Round(r[i][j]*100) / 100
		}
	}

	if !reflect.DeepEqual(expectedQResult, r) {

		t.Errorf(
			"expected %v but got %v",
			expectedQResult,
			r,
		)
	}
}
