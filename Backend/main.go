package main

import (
	"log"
	"os"

	"github.com/Samswrld02/portfolio_sam/db"
	"github.com/Samswrld02/portfolio_sam/repository"
	"github.com/Samswrld02/portfolio_sam/routing"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	gdb, err := db.Open()
	if err != nil {
		log.Fatalf("db: %v", err)
	}

	projects := repository.NewGormProjectRepository(gdb)
	router := routing.NewRouter(projects)

	port := os.Getenv("GO_PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("echo listening on :%s", port)
	if err := router.Start(":" + port); err != nil {
		log.Fatalf("server: %v", err)
	}
}
