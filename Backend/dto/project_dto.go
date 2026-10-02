package dto

// ProjectResponse is the public JSON shape for the Next frontend.
type ProjectResponse struct {
	ID          uint     `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	RepoURL     string   `json:"repoUrl"`
	Tags        []string `json:"tags"`
}
