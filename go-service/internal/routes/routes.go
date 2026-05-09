package routes

import (
	"go-service/internal/controllers"
	middleware "go-service/internal/middlewares"

	"github.com/gofiber/fiber/v3"
)

func Setup(app *fiber.App) {
	api := app.Group("/api")

	api.Post("/auth/login", controllers.Login)

	api.Post(
		"/qr",
		middleware.Protected(),
		controllers.MatrixController,
	)
}
