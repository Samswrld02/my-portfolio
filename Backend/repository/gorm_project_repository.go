package repository

import (
	"github.com/Samswrld02/portfolio_sam/models"
	"gorm.io/gorm"
)

type gormProjectRepository struct {
	db *gorm.DB
}

func NewGormProjectRepository(db *gorm.DB) ProjectRepository {
	return &gormProjectRepository{db: db}
}

func (r *gormProjectRepository) FindAll() ([]models.Project, error) {
	var projects []models.Project
	err := r.db.Order("id asc").Find(&projects).Error
	return projects, err
}

func (r *gormProjectRepository) FindByID(id uint) (*models.Project, error) {
	var project models.Project
	if err := r.db.First(&project, id).Error; err != nil {
		return nil, err
	}
	return &project, nil
}

func (r *gormProjectRepository) Create(project *models.Project) error {
	return r.db.Create(project).Error
}

func (r *gormProjectRepository) Update(project *models.Project) error {
	return r.db.Save(project).Error
}

func (r *gormProjectRepository) Delete(id uint) error {
	return r.db.Delete(&models.Project{}, id).Error
}
