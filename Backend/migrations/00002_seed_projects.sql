-- +goose Up
INSERT INTO projects (title, description, repo_url, tags, created_at, updated_at) VALUES
(
  'Gredis',
  'In-memory Redis-style database over TCP. Built to understand concurrency, protocol design, and how stores behave under concurrent clients.',
  'https://github.com/Samswrld02/Go_redis_clone--Gredis',
  'Go,Redis,TCP,Concurrency',
  NOW(3), NOW(3)
),
(
  'Go mini-framework',
  'Laravel-inspired REST API framework in Go — routing, structure, and performance habits carried over from PHP into a systems language.',
  'https://github.com/Samswrld02/Go-mini-framework-RESTFUL-api',
  'Go,REST,Framework design',
  NOW(3), NOW(3)
),
(
  'Binsta',
  'Instagram-style clone on a custom PHP MVC stack with Twig, RedBean, and Docker — end-to-end product flow, not just a tutorial slice.',
  'https://github.com/Samswrld02/Binsta',
  'PHP,Twig,Docker,MVC',
  NOW(3), NOW(3)
),
(
  'Portfolio site',
  'This site: Next.js + Tailwind + Three.js front, Go Echo API with repository pattern, goose migrations, MariaDB, Docker, and Caddy as reverse proxy.',
  'https://github.com/Samswrld02/my-portfolio',
  'Next,Echo,GORM,Docker,Caddy',
  NOW(3), NOW(3)
);


-- +goose Down
DELETE FROM projects WHERE title IN ('Gredis', 'Go mini-framework', 'Binsta', 'Portfolio platform');
