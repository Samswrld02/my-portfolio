package auth

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
)

const CookieName = "portfolio_session"

var ErrInvalidSession = errors.New("invalid session")

func sessionSecret() string {
	return os.Getenv("SESSION_SECRET")
}

func AdminUsername() string {
	return os.Getenv("ADMIN_USERNAME")
}

func AdminPassword() string {
	return os.Getenv("ADMIN_PASSWORD")
}

func CheckCredentials(username, password string) bool {
	u := AdminUsername()
	p := AdminPassword()
	if u == "" || p == "" {
		return false
	}
	return username == u && password == p
}

func Sign(username string, expires time.Time) (string, error) {
	secret := sessionSecret()
	if secret == "" {
		return "", errors.New("SESSION_SECRET is not set")
	}
	payload := fmt.Sprintf("%s|%d", username, expires.Unix())
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write([]byte(payload))
	sig := hex.EncodeToString(mac.Sum(nil))
	raw := payload + "|" + sig
	return base64.RawURLEncoding.EncodeToString([]byte(raw)), nil
}

func Verify(token string) (string, error) {
	secret := sessionSecret()
	if secret == "" {
		return "", ErrInvalidSession
	}
	decoded, err := base64.RawURLEncoding.DecodeString(token)
	if err != nil {
		return "", ErrInvalidSession
	}
	parts := strings.Split(string(decoded), "|")
	if len(parts) != 3 {
		return "", ErrInvalidSession
	}
	username, expStr, sig := parts[0], parts[1], parts[2]
	exp, err := strconv.ParseInt(expStr, 10, 64)
	if err != nil {
		return "", ErrInvalidSession
	}
	if time.Now().Unix() > exp {
		return "", ErrInvalidSession
	}
	payload := username + "|" + expStr
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write([]byte(payload))
	expected := hex.EncodeToString(mac.Sum(nil))
	if !hmac.Equal([]byte(expected), []byte(sig)) {
		return "", ErrInvalidSession
	}
	return username, nil
}

func SetSessionCookie(c echo.Context, username string) error {
	expires := time.Now().Add(7 * 24 * time.Hour)
	token, err := Sign(username, expires)
	if err != nil {
		return err
	}
	c.SetCookie(&http.Cookie{
		Name:     CookieName,
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Expires:  expires,
		MaxAge:   int(7 * 24 * time.Hour / time.Second),
	})
	return nil
}

func ClearSessionCookie(c echo.Context) {
	c.SetCookie(&http.Cookie{
		Name:     CookieName,
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   -1,
		Expires:  time.Unix(0, 0),
	})
}

func UsernameFromRequest(c echo.Context) (string, error) {
	cookie, err := c.Cookie(CookieName)
	if err != nil || cookie.Value == "" {
		return "", ErrInvalidSession
	}
	return Verify(cookie.Value)
}
