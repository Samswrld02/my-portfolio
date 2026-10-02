# Build Go API + migrate tool
FROM golang:1.26-alpine AS build
WORKDIR /src
COPY Backend/ ./
RUN go mod download
RUN go build -o /out/server .
RUN go build -o /out/migrate ./cmd/migrate

# Small runtime image
FROM alpine:3.21
WORKDIR /app
RUN apk add --no-cache ca-certificates
COPY --from=build /out/server /out/migrate ./
COPY Backend/migrations ./migrations
COPY deploy/backend-entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]
