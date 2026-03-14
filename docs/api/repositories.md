---
sidebar_position: 8
title: Repositories
description: API reference for creating GitHub repositories and pushing files via the GitHub App integration.
---

# Repositories API

Create GitHub repositories and push code on behalf of your account via the connected GitHub App installation.

:::note Prerequisite
All endpoints require the GitHub App to be installed on your account. If the app is not installed, requests return a `422` error with code `GITHUB_APP_REQUIRED`.
:::

## Endpoints

| Method | Path | Scope | Description |
|--------|------|-------|-------------|
| `POST` | `/api/repos` | `repos:write` | Create a new GitHub repository |
| `POST` | `/api/repos/push` | `repos:write` | Push files to an existing repository |
| `POST` | `/api/repos/create_and_push` | `repos:write` | Create a repository and push files in one call |

---

### Create Repository

```bash
POST /api/repos
```

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | string | ✅ | — | Repository name |
| `description` | string | | — | Repository description |
| `private` | boolean | | `true` | Whether the repo is private |
| `auto_init` | boolean | | `false` | Initialize with a README |

**Response (201):**

```json
{
  "repo": {
    "full_name": "octocat/hello-world",
    "html_url": "https://github.com/octocat/hello-world",
    "clone_url": "https://github.com/octocat/hello-world.git",
    "ssh_url": "git@github.com:octocat/hello-world.git",
    "private": true,
    "default_branch": "main"
  }
}
```

**Example:**

```bash
curl -X POST https://my.playgrounds.dev/api/repos \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "my-rails-app", "description": "A new Rails app", "private": true}'
```

---

### Push Files

```bash
POST /api/repos/push
```

Push one or more files to an existing repository in a single atomic commit.

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `repo` | string | ✅ | — | Repository full name (e.g., `octocat/hello-world`) |
| `files` | array | ✅ | — | Array of `{ path, content }` objects |
| `message` | string | ✅ | — | Commit message |
| `branch` | string | | default branch | Target branch |

**Response (200):**

```json
{
  "commit_sha": "abc123...",
  "tree_sha": "def456...",
  "files_pushed": 3
}
```

**Example:**

```bash
curl -X POST https://my.playgrounds.dev/api/repos/push \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "repo": "octocat/my-rails-app",
    "message": "Add initial structure",
    "files": [
      { "path": "Gemfile", "content": "source \"https://rubygems.org\"\ngem \"rails\"" },
      { "path": "README.md", "content": "# My Rails App" }
    ]
  }'
```

---

### Create & Push

```bash
POST /api/repos/create_and_push
```

Creates a repository and pushes files in a single API call — useful for bootstrapping new projects.

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | string | ✅ | — | Repository name |
| `description` | string | | — | Repository description |
| `private` | boolean | | `true` | Whether the repo is private |
| `files` | array | ✅ | — | Array of `{ path, content }` objects |
| `message` | string | | `"Initial commit"` | Commit message |

**Response (201):**

```json
{
  "repo": {
    "full_name": "octocat/my-rails-app",
    "html_url": "https://github.com/octocat/my-rails-app",
    "clone_url": "https://github.com/octocat/my-rails-app.git",
    "ssh_url": "git@github.com:octocat/my-rails-app.git",
    "private": true,
    "default_branch": "main"
  },
  "commit": {
    "commit_sha": "abc123...",
    "tree_sha": "def456...",
    "files_pushed": 3
  }
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Missing or invalid API key |
| `FORBIDDEN` | 403 | API key missing `repos:write` scope |
| `GITHUB_APP_REQUIRED` | 422 | GitHub App not installed on your account |
| `VALIDATION_FAILED` | 422 | Invalid or missing parameters |
| `RESOURCE_NOT_FOUND` | 404 | Repository not found (push) |
