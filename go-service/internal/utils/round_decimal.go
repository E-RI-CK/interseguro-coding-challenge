package utils

import "math"

func RoundDecimal(value float64, precision int) float64 {
	// Normalize tiny values to zero
	if math.Abs(value) < 1e-10 {
		return 0
	}

	pow := math.Pow(10, float64(precision))

	return math.Round(value*pow) / pow
}
