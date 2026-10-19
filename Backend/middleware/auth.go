package middleware

import (
	"net/http"

	"github.com/Samswrld02/portfolio_sam/auth"
	"github.com/labstack/echo/v4"
)

// RequireAuth rejects requests without a valid session cookie.
func RequireAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		username, err := auth.UsernameFromRequest(c)
		if err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "unauthorized"})
		}
		c.Set("username", username)
		return next(c)
	}
}
