package main

import (
	"go-service/internal/routes"

	"github.com/gofiber/fiber/v3"
)

func main() {
    app := fiber.New()

    app.Get("/", func(c fiber.Ctx) error {
        return c.SendString("Hello, World!")
    })
    routes.Setup(app)
    app.Listen(":3000")
}
