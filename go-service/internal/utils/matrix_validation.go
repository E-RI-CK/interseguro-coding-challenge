package utils

import "go-service/internal/dto"

func ValidateMatrix(matrix [][]float64) dto.MatrixValidationResponse {
	rows := len(matrix)
	if rows == 0 {
		return dto.MatrixValidationResponse{
			Success: false,
			Message: "The matrix is empty",
		}
	}

	cols := len(matrix[0])
	if cols == 0 {
		return dto.MatrixValidationResponse{
			Success: false,
			Message: "The matrix has no columns",
		}
	}

	for _, row := range matrix {
		if len(row) != cols {
			return dto.MatrixValidationResponse{
				Success: false,
				Message: "Each row must have the same length",
			}
		}
	}

	if rows < cols {
		return dto.MatrixValidationResponse{
			Success: false,
			Message: "The number of rows (m) must be greater than or equal to the number of columns (n)",
		}
	}

	return dto.MatrixValidationResponse{
		Success: true,
		Message: "The matrix is valid for QR",
	}
}
