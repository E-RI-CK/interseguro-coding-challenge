package controllers

import (
	"go-service/internal/dto"
	"go-service/internal/services"

	"github.com/gofiber/fiber/v3"
)

func MatrixController(c fiber.Ctx) error {
	var body dto.MatrixRequest

	if err := c.Bind().Body(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "invalid body",
		})
	}

	result, err := services.MatrixService(body.Matrix)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(result)

}
