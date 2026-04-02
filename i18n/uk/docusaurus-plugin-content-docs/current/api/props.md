---
sidebar_position: 3
title: Props
description: API-довідник для керування Prop — підключеними GitHub-репозиторіями.
---

# Props API

Керування [Prop](/core-concepts/prop) — підключеними GitHub-репозиторіями, що надають вихідний код для ваших середовищ.

## Ендпоінти

| Метод | Шлях | Скоуп | Опис |
|-------|------|-------|------|
| `GET` | `/api/props` | `props:read` | Список всіх Prop |
| `GET` | `/api/props/with_docker_compose` | `props:read` | Prop з виявленим Compose-файлом |
| `GET` | `/api/props/:id` | `props:read` | Отримати один Prop |
| `POST` | `/api/props` | `props:write` | Створити новий Prop |
| `POST` | `/api/props/attach` | `props:write` | Підключити репозиторій через GitHub App |
| `PATCH` | `/api/props/:id` | `props:write` | Оновити Prop |
| `DELETE` | `/api/props/:id` | `props:delete` | Видалити Prop |
| `POST` | `/api/props/:id/sync` | `props:write` | Запустити синхронізацію (оновити гілки та Compose-файл) |
| `GET` | `/api/props/:id/branches` | `props:read` | Список гілок |
| `GET` | `/api/props/:id/env_defaults` | `props:read` | Отримати змінні за замовчуванням з `.env.example` |

---

### Список Prop

```bash
GET /api/props
```

**Відповідь:**

```json
[
  {
    "id": 1,
    "name": "my-app",
    "github_url": "https://github.com/org/my-app",
    "private": false,
    "default_branch": "main",
    "status": "active",
    "last_synced_at": "2025-01-20T14:00:00Z",
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-20T14:00:00Z"
  }
]
```

---

### Підключити через GitHub App

```bash
POST /api/props/attach
```

Підключає репозиторій, виявлений через інтеграцію GitHub App. Якщо Prop вже існує, він ділиться з гравцем, що запитує.

**Тіло запиту:**

```json
{
  "repo_full_name": "org/my-app"
}
```

---

### Створити Prop

```bash
POST /api/props
```

**Тіло запиту:**

```json
{
  "prop": {
    "name": "my-app",
    "github_url": "https://github.com/org/my-app",
    "default_branch": "main",
    "private": true,
    "credentials": "ghp_your_personal_access_token"
  }
}
```

:::note Приватні репозиторії
Приватні репозиторії вимагають або Personal Access Token у полі `credentials`, або активну інсталяцію GitHub App.
:::

---

### Список гілок

```bash
GET /api/props/:id/branches?query=feat&limit=20
```

**Параметри:**

| Параметр | Тип | За замовчуванням | Опис |
|----------|-----|-----------------|------|
| `query` | string | — | Фільтр гілок за назвою (нечутливий до регістру підрядок) |
| `limit` | integer | `20` | Максимальна кількість гілок (максимум: 50) |

**Відповідь:**

```json
{
  "branches": [
    { "name": "main", "default": true },
    { "name": "feature/auth", "default": false },
    { "name": "feature/api", "default": false }
  ]
}
```

---

### Отримати змінні за замовчуванням {#get-env-defaults}

```bash
GET /api/props/:id/env_defaults?branch=main&env_file_path=.env.example
```

Повертає розпарсені пари ключ-значення з файлу `.env.example` на вказаній гілці.

**Параметри:**

| Параметр | Тип | Обовʼязковий | Опис |
|----------|-----|-------------|------|
| `branch` | string | Так | Гілка для зчитування env-файлу |
| `env_file_path` | string | Ні | Нестандартний шлях до env-файлу (за замовчуванням: `.env.example`) |

**Відповідь:**

```json
{
  "defaults": {
    "DATABASE_URL": "postgres://localhost/dev",
    "RAILS_ENV": "development",
    "SECRET_KEY_BASE": "$$secret(64)"
  },
  "sensitive_keys": ["SECRET_KEY_BASE", "DATABASE_URL"]
}
```

---

### Синхронізувати Prop

```bash
POST /api/props/:id/sync
```

Запускає асинхронну синхронізацію — оновлює індекс гілок та Docker Compose файл з GitHub.

```json
{
  "message": "Sync scheduled"
}
```
