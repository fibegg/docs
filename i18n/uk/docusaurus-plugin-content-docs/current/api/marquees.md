---
sidebar_position: 2
title: Marquees
description: API-довідник для керування Marquee — віддаленими Docker-хостами.
---

# Marquees API

Керування [Marquee](/core-concepts/marquee) — віддаленими Docker-хостами, на яких працюють ваші Playground.

## Ендпоінти

| Метод | Шлях | Скоуп | Опис |
|-------|------|-------|------|
| `GET` | `/api/marquees` | `marquees:read` | Список всіх Marquee |
| `GET` | `/api/marquees/:id` | `marquees:read` | Отримати один Marquee |
| `POST` | `/api/marquees` | `marquees:write` | Створити новий Marquee |
| `PATCH` | `/api/marquees/:id` | `marquees:write` | Оновити Marquee |
| `DELETE` | `/api/marquees/:id` | `marquees:delete` | Видалити Marquee |
| `POST` | `/api/marquees/:id/generate_ssh_key` | `marquees:manage` | Згенерувати SSH-ключ |
| `POST` | `/api/marquees/:id/test_connection` | `marquees:read` | Перевірити SSH та Docker зʼєднання |

---

### Список Marquee

```bash
GET /api/marquees
```

**Відповідь:**

```json
[
  {
    "id": 1,
    "name": "Production Host",
    "status": "active",
    "host": "192.168.1.100",
    "port": 22,
    "user": "deploy",
    "tutorial": false,
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-15T10:30:00Z"
  }
]
```

---

### Отримати Marquee

```bash
GET /api/marquees/:id
```

Повертає детальний вигляд, включаючи SSH-публічний ключ, домени та ACME email.

**Відповідь:**

```json
{
  "id": 1,
  "name": "Production Host",
  "status": "active",
  "host": "192.168.1.100",
  "port": 22,
  "user": "deploy",
  "tutorial": false,
  "ssh_public_key": "ssh-ed25519 AAAA...",
  "domains": ["dev.example.com", "staging.example.com"],
  "acme_email": "admin@example.com",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

---

### Створити Marquee

```bash
POST /api/marquees
```

**Тіло запиту:**

```json
{
  "marquee": {
    "name": "My Server",
    "host": "192.168.1.100",
    "port": 22,
    "user": "deploy",
    "ssh_private_key": "-----BEGIN OPENSSH PRIVATE KEY-----\n...",
    "domains_input": "dev.example.com, staging.example.com",
    "acme_email": "admin@example.com",
    "status": "active"
  }
}
```

---

### Оновити Marquee

```bash
PATCH /api/marquees/:id
```

Тіло аналогічне Create. Tutorial Marquee мають обмежені поля (тільки `name`, `domains_input` та `status`).

---

### Видалити Marquee

```bash
DELETE /api/marquees/:id
```

Повертає `204 No Content` при успіху. Помилка `409 Conflict`, якщо Marquee має активні Playground або є tutorial Marquee.

---

### Згенерувати SSH-ключ

```bash
POST /api/marquees/:id/generate_ssh_key
```

Генерує нову пару ключів ed25519. Повертає публічний ключ:

```json
{
  "public_key": "ssh-ed25519 AAAA... marquee-1@fibe.gg"
}
```

---

### Тест зʼєднання

```bash
POST /api/marquees/:id/test_connection
```

Перевіряє SSH-зʼєднання, доступність Docker та доступ до директорій:

```json
{
  "success": true,
  "checks": {
    "ssh": { "success": true, "message": "SSH connection successful" },
    "docker": { "success": true, "message": "Docker available", "details": { "version": "24.0.7" } },
    "directories": { "success": true, "message": "Directory access verified" }
  }
}
```
