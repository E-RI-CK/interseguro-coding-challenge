package routes

import (
	"go-service/internal/controllers"

	"github.com/gofiber/fiber/v3"
)

func Setup(app *fiber.App) {
	api := app.Group("/api")

	api.Post("/qr", controllers.MatrixController)
}
