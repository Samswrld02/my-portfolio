package controllers

import (
	"net/http"

	"github.com/Samswrld02/portfolio_sam/auth"
	"github.com/labstack/echo/v4"
)

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Login(c echo.Context) error {
	var body loginRequest
	if err := c.Bind(&body); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid body"})
	}
	if body.Username == "" || body.Password == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "username and password required"})
	}
	if !auth.CheckCredentials(body.Username, body.Password) {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid credentials"})
	}
	if err := auth.SetSessionCookie(c, body.Username); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, map[string]string{"username": body.Username})
}

func Logout(c echo.Context) error {
	auth.ClearSessionCookie(c)
	return c.JSON(http.StatusOK, map[string]string{"ok": "true"})
}

func Me(c echo.Context) error {
	username, err := auth.UsernameFromRequest(c)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "unauthorized"})
	}
	return c.JSON(http.StatusOK, map[string]string{"username": username})
}
