package db

import (
	"fmt"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// Open returns a GORM connection. Schema is owned by goose migrations, not AutoMigrate.
func Open() (*gorm.DB, error) {
	user := os.Getenv("MYSQL_USER")
	pass := os.Getenv("MYSQL_PASSWORD")
	host := os.Getenv("DB_ADDRESS")
	name := os.Getenv("MYSQL_DATABASE")

	if user == "" || host == "" || name == "" {
		return nil, fmt.Errorf("missing MYSQL_USER, DB_ADDRESS, or MYSQL_DATABASE")
	}

	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", user, pass, host, name)
	return gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Warn),
	})
}
