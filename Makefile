.PHONY: migrate-up migrate-down tidy

tidy:
	cd Backend && go mod tidy

migrate-up:
	cd Backend && go run ./cmd/migrate up

migrate-down:
	cd Backend && go run ./cmd/migrate down
