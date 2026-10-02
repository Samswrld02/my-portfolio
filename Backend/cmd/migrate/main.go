package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/pressly/goose/v3"
)

func main() {
	_ = godotenv.Load()

	user := os.Getenv("MYSQL_USER")
	pass := os.Getenv("MYSQL_PASSWORD")
	host := os.Getenv("DB_ADDRESS")
	name := os.Getenv("MYSQL_DATABASE")
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local&multiStatements=true", user, pass, host, name)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	if err := goose.SetDialect("mysql"); err != nil {
		log.Fatal(err)
	}

	dir := "migrations"
	if len(os.Args) > 2 {
		dir = os.Args[2]
	}
	command := "up"
	if len(os.Args) > 1 {
		command = os.Args[1]
	}

	if err := goose.Run(command, db, dir); err != nil {
		log.Fatalf("goose %s: %v", command, err)
	}
}
