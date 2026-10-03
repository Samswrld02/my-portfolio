-- +goose Up
UPDATE projects SET repo_url = 'https://github.com/Samswrld02/my-portfolio' WHERE title = 'Portfolio platform';

-- +goose Down
UPDATE projects SET repo_url = '' WHERE title = 'Portfolio platform';
