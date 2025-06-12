
package main

import (
    "log"
    "os"
    "ticketing-system/internal/config"
    "ticketing-system/internal/database"
    "ticketing-system/internal/handlers"
    "ticketing-system/internal/middleware"
    "ticketing-system/internal/services"

    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
)

func main() {
    // Load environment variables
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found, using system environment variables")
    }

    // Initialize configuration
    cfg := config.New()

    // Initialize database
    db, err := database.New(cfg.DatabaseURL)
    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }

    // Initialize Redis
    redis := database.NewRedis(cfg.RedisURL)

    // Initialize services
    ticketService := services.NewTicketService(db, redis)
    emailService := services.NewEmailService(cfg)
    whatsappService := services.NewWhatsAppService(cfg)

    // Initialize handlers
    ticketHandler := handlers.NewTicketHandler(ticketService)
    webhookHandler := handlers.NewWebhookHandler(ticketService, emailService, whatsappService)

    // Setup router
    router := gin.Default()

    // Add middleware
    router.Use(middleware.CORS())
    router.Use(middleware.Logger())

    // Health check
    router.GET("/health", func(c *gin.Context) {
        c.JSON(200, gin.H{"status": "ok"})
    })

    // API routes
    api := router.Group("/api/v1")
    {
        // Ticket routes
        tickets := api.Group("/tickets")
        {
            tickets.GET("", ticketHandler.GetTickets)
            tickets.POST("", ticketHandler.CreateTicket)
            tickets.GET("/:id", ticketHandler.GetTicket)
            tickets.PUT("/:id", ticketHandler.UpdateTicket)
            tickets.DELETE("/:id", ticketHandler.DeleteTicket)
            tickets.POST("/:id/comments", ticketHandler.AddComment)
        }

        // Webhook routes for external integrations
        webhooks := api.Group("/webhooks")
        {
            webhooks.POST("/whatsapp", webhookHandler.WhatsAppWebhook)
            webhooks.POST("/email", webhookHandler.EmailWebhook)
            webhooks.POST("/call", webhookHandler.CallWebhook)
        }

        // Statistics routes
        api.GET("/stats", ticketHandler.GetStats)
    }

    // Start server
    port := os.Getenv("API_PORT")
    if port == "" {
        port = "8080"
    }

    log.Printf("Server starting on port %s", port)
    if err := router.Run(":" + port); err != nil {
        log.Fatalf("Failed to start server: %v", err)
    }
}
