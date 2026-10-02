package repository

import "github.com/Samswrld02/portfolio_sam/models"

// ProjectRepository is the swappable contract controllers depend on.
type ProjectRepository interface {
	FindAll() ([]models.Project, error)
	FindByID(id uint) (*models.Project, error)
	Create(project *models.Project) error
	Update(project *models.Project) error
	Delete(id uint) error
}
