package main

import (
	"go-service/internal/routes"
	"log"
	"os"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {

	if err := godotenv.Load(); err != nil {
		log.Println(".env file not found")
	}

	port := os.Getenv("PORT")

	if port == "" {
		port = "3000"
	}

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{os.Getenv("WEB_CLIENT_API_URL")},
		AllowHeaders: []string{"Origin", "Content-Type", "Accept"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
	}))

	app.Get("/", func(c fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	routes.Setup(app)

	app.Listen(":" + port)
}
