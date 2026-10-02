package routing

import (
	"github.com/Samswrld02/portfolio_sam/controllers"
	"github.com/Samswrld02/portfolio_sam/repository"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Router struct {
	Server   *echo.Echo
	projects repository.ProjectRepository
}

func NewRouter(projects repository.ProjectRepository) *Router {
	e := echo.New()
	e.HideBanner = true
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	r := &Router{Server: e, projects: projects}
	r.setRoutes()
	return r
}

func (r *Router) setRoutes() {
	api := r.Server.Group("/api")
	api.GET("/health", controllers.Health)

	pc := controllers.NewProjectController(r.projects)
	projects := api.Group("/projects")
	projects.GET("", pc.Read)
	projects.GET("/:id", pc.Show)
}

func (r *Router) Start(address string) error {
	return r.Server.Start(address)
}
