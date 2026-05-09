package middleware

import (
	"errors"
	"os"
	"strings"

	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

func Protected() fiber.Handler {

	return func(c fiber.Ctx) error {

		authHeader := c.Get("Authorization")

		if authHeader == "" {
			return c.Status(401).JSON(fiber.Map{
				"error": "missing token",
			})
		}

		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)

		token, err := jwt.Parse(
			tokenString,
			func(token *jwt.Token) (interface{}, error) {
				return []byte(os.Getenv("JWT_SECRET")), nil
			},
		)

		if err != nil {

			if errors.Is(err, jwt.ErrTokenExpired) {

				return c.Status(401).JSON(fiber.Map{
					"error": "token expired",
				})
			}

			return c.Status(401).JSON(fiber.Map{
				"error": "invalid token",
			})
		}

		if !token.Valid {
			return c.Status(401).JSON(fiber.Map{
				"error": "invalid token",
			})
		}

		return c.Next()
	}
}
