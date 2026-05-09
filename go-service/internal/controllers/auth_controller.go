package controllers

import (
	"go-service/internal/dto"
	"go-service/internal/utils"

	"github.com/gofiber/fiber/v3"
)

func Login(c fiber.Ctx) error {

	var body dto.LoginDto

	if err := c.Bind().Body(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "invalid body",
		})
	}

	if body.Username == "" {
		return c.Status(400).JSON(fiber.Map{
			"error": "username is required",
		})
	}

	token, err := utils.GenerateJWT(body.Username)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "cannot generate token",
		})
	}

	return c.JSON(fiber.Map{
		"token": token,
	})
}
