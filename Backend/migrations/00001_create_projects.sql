-- +goose Up
CREATE TABLE projects (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  repo_url VARCHAR(512) NOT NULL DEFAULT '',
  tags VARCHAR(512) NOT NULL DEFAULT '',
  created_at DATETIME(3) NULL,
  updated_at DATETIME(3) NULL,
  deleted_at DATETIME(3) NULL,
  INDEX idx_projects_deleted_at (deleted_at)
);

-- +goose Down
DROP TABLE IF EXISTS projects;
