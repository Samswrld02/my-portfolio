package models

import "time"

type Project struct {
	ID          uint       `gorm:"primaryKey" json:"id"`
	Title       string     `gorm:"size:255;not null" json:"title"`
	Description string     `gorm:"type:text" json:"description"`
	RepoURL     string     `gorm:"size:512;column:repo_url" json:"repoUrl"`
	Tags        string     `gorm:"size:512" json:"tags"` // comma-separated for simplicity
	CreatedAt   time.Time  `json:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt"`
	DeletedAt   *time.Time `gorm:"index" json:"-"`
}
