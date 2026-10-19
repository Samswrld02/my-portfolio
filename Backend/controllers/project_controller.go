package controllers

import (
	"errors"
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
	id, err := parseID(c)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid id"})
	}

	project, err := p.projects.FindByID(id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "project not found"})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, toResponse(*project))
}

func (p *ProjectController) Create(c echo.Context) error {
	var body dto.ProjectWriteRequest
	if err := c.Bind(&body); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid body"})
	}
	if err := validateWrite(body); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	project := &models.Project{
		Title:       strings.TrimSpace(body.Title),
		Description: strings.TrimSpace(body.Description),
		RepoURL:     strings.TrimSpace(body.RepoURL),
		Tags:        joinTags(body.Tags),
	}
	if err := p.projects.Create(project); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusCreated, toResponse(*project))
}

func (p *ProjectController) Update(c echo.Context) error {
	id, err := parseID(c)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid id"})
	}

	var body dto.ProjectWriteRequest
	if err := c.Bind(&body); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid body"})
	}
	if err := validateWrite(body); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	project, err := p.projects.FindByID(id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "project not found"})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	project.Title = strings.TrimSpace(body.Title)
	project.Description = strings.TrimSpace(body.Description)
	project.RepoURL = strings.TrimSpace(body.RepoURL)
	project.Tags = joinTags(body.Tags)

	if err := p.projects.Update(project); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, toResponse(*project))
}

func (p *ProjectController) Delete(c echo.Context) error {
	id, err := parseID(c)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid id"})
	}

	if _, err := p.projects.FindByID(id); err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "project not found"})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	if err := p.projects.Delete(id); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.NoContent(http.StatusNoContent)
}

func parseID(c echo.Context) (uint, error) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	return uint(id), err
}

func validateWrite(body dto.ProjectWriteRequest) error {
	if strings.TrimSpace(body.Title) == "" {
		return errors.New("title is required")
	}
	if strings.TrimSpace(body.RepoURL) == "" {
		return errors.New("repoUrl is required")
	}
	return nil
}

func joinTags(tags []string) string {
	cleaned := make([]string, 0, len(tags))
	for _, t := range tags {
		t = strings.TrimSpace(t)
		if t != "" {
			cleaned = append(cleaned, t)
		}
	}
	return strings.Join(cleaned, ",")
}

func splitTags(raw string) []string {
	tags := []string{}
	if raw == "" {
		return tags
	}
	for _, t := range strings.Split(raw, ",") {
		t = strings.TrimSpace(t)
		if t != "" {
			tags = append(tags, t)
		}
	}
	return tags
}

func toResponse(p models.Project) dto.ProjectResponse {
	return dto.ProjectResponse{
		ID:          p.ID,
		Title:       p.Title,
		Description: p.Description,
		RepoURL:     p.RepoURL,
		Tags:        splitTags(p.Tags),
	}
}
