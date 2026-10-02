package controllers

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/Samswrld02/portfolio_sam/dto"
	"github.com/Samswrld02/portfolio_sam/models"
	"github.com/Samswrld02/portfolio_sam/repository"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type ProjectController struct {
	projects repository.ProjectRepository
}

func NewProjectController(projects repository.ProjectRepository) *ProjectController {
	return &ProjectController{projects: projects}
}

func (p *ProjectController) Read(c echo.Context) error {
	list, err := p.projects.FindAll()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	out := make([]dto.ProjectResponse, 0, len(list))
	for _, item := range list {
		out = append(out, toResponse(item))
	}
	return c.JSON(http.StatusOK, out)
}

func (p *ProjectController) Show(c echo.Context) error {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid id"})
	}

	project, err := p.projects.FindByID(uint(id))
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "project not found"})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, toResponse(*project))
}

func toResponse(p models.Project) dto.ProjectResponse {
	tags := []string{}
	if p.Tags != "" {
		for _, t := range strings.Split(p.Tags, ",") {
			t = strings.TrimSpace(t)
			if t != "" {
				tags = append(tags, t)
			}
		}
	}
	return dto.ProjectResponse{
		ID:          p.ID,
		Title:       p.Title,
		Description: p.Description,
		RepoURL:     p.RepoURL,
		Tags:        tags,
	}
}
