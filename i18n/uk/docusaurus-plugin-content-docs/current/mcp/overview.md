---
sidebar_position: 1
title: MCP-сервер
description: Підключіть AI Генії, як-от Claude, Cursor та VS Code Copilot, для керування fibe.gg через Model Context Protocol.
---

# MCP-сервер

fibe.gg включає вбудований сервер [Model Context Protocol (MCP)](https://modelcontextprotocol.io/). Будь-який MCP-сумісний AI Геній або клієнт може підключитися до MCP-сервера та керувати всією платформою за допомогою природної мови.

## Швидкий старт

### 1. Створіть API-ключ

Створіть API-ключ з областю `mcp:access` **плюс** усі області ресурсів, які ви хочете надати Генію:

Перейдіть до **Профіль → API-ключі** у веб-інтерфейсі або скористайтеся API:

```bash
POST /api/keys
{
  "api_key": {
    "label": "MCP Genie Key",
    "scopes": [
      "mcp:access",
      "marquees:read", "marquees:write",
      "playspecs:read", "playspecs:write",
      "playgrounds:read", "playgrounds:write",
      "props:read", "props:write",
      "repos:write",
      "launch:write",
      "import_templates:read", "import_templates:write"
    ]
  }
}
```

### 2. Налаштуйте ваш AI-клієнт

Додайте наступне до конфігурації вашого MCP-клієнта:

```json
{
  "mcpServers": {
    "playgrounds-dev": {
      "url": "https://fibe.gg/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY_TOKEN"
      }
    }
  }
}
```

### 3. Почніть користуватися

Попросіть вашого AI Генія виконати такі дії:

> "Покажи мої marquees та які з них активні"

> "Створи playspec з Rails-додатком, PostgreSQL та Redis"

> "Запусти playground з мого playspec web-stack на marquee 1"

Геній використає відповідні MCP-інструменти для виконання вашого запиту.

## Ендпоінт

| Метод | Шлях | Опис |
|-------|------|------|
| `POST` | `/mcp` | Відправити JSON-RPC 2.0 повідомлення |
| `GET` | `/mcp/sse` | SSE-потік (застарілий транспорт) |
| `DELETE` | `/mcp` | Завершити сесію |

Сервер підтримує як транспорт **Streamable HTTP** (рекомендований), так і застарілий транспорт **SSE**.

## Автентифікація

- **Метод:** Bearer-токен у заголовку `Authorization`
- **Обов'язкова область:** `mcp:access` на API-ключі
- **Області для інструментів:** Кожен інструмент додатково перевіряє області, специфічні для ресурсу (наприклад, `playgrounds:write`)

Усі стандартні правила [автентифікації API](/api/overview) застосовуються. API-ключ без `mcp:access` буде відхилено з помилкою `403 Forbidden`.

## Доступні інструменти

### Marquees (Docker-хости)

| Інструмент | Необхідна область | Опис |
|------------|-------------------|------|
| `list_marquees` | `marquees:read` | Перелік усіх marquees |
| `get_marquee` | `marquees:read` | Отримати деталі marquee |
| `create_marquee` | `marquees:write` | Створити новий marquee |
| `delete_marquee` ⚠️ | `marquees:delete` | Видалити marquee |
| `test_marquee_connection` | `marquees:read` | Перевірити SSH/Docker-з'єднання |

### Playspecs (шаблони середовищ)

| Інструмент | Необхідна область | Опис |
|------------|-------------------|------|
| `list_playspecs` | `playspecs:read` | Перелік усіх playspecs |
| `get_playspec` | `playspecs:read` | Отримати playspec із сервісами та файлами |
| `create_playspec` | `playspecs:write` | Створити з Docker Compose YAML |
| `delete_playspec` ⚠️ | `playspecs:delete` | Видалити playspec |
| `validate_compose` | `playspecs:read` | Валідувати Docker Compose YAML |

### Playgrounds (запущені середовища)

| Інструмент | Необхідна область | Опис |
|------------|-------------------|------|
| `list_playgrounds` | `playgrounds:read` | Перелік усіх playgrounds |
| `get_playground` | `playgrounds:read` | Отримати деталі playground |
| `create_playground` | `playgrounds:write` | Створити та розгорнути playground |
| `destroy_playground` ⚠️ | `playgrounds:delete` | Зупинити контейнери |
| `get_playground_status` | `playgrounds:read` | Отримати статус розгортання |
| `get_playground_logs` | `playgrounds:read` | Отримати логи контейнера сервісу |
| `get_playground_debug` | `playgrounds:read` | Отримати діагностичну інформацію |
| `recreate_playground` ⚠️ | `playgrounds:write` | Перерозгорнути з нуля |
| `extend_playground` | `playgrounds:write` | Продовжити TTL |

### Props (GitHub-репозиторії)

| Інструмент | Необхідна область | Опис |
|------------|-------------------|------|
| `list_props` | `props:read` | Перелік підключених репозиторіїв |
| `get_prop` | `props:read` | Отримати деталі репозиторію |
| `get_prop_branches` | `props:read` | Перелік гілок |
| `create_prop` | `props:write` | Підключити GitHub-репозиторій |

### Запуск

| Інструмент | Необхідна область | Опис |
|------------|-------------------|------|
| `launch_playspec` | `launch:write` | **Одним кроком:** Docker Compose YAML → розгорнуте середовище |

### Шаблони

| Інструмент | Необхідна область | Опис |
|------------|-------------------|------|
| `launch_template` | `import_templates:read`, `launch:write` | **Одним кроком:** ID ImportTemplate + змінні → скомпільоване розгорнуте середовище |
| `list_templates` | `import_templates:read` | Перелік ваших шаблонів |
| `get_template` | `import_templates:read` | Отримати деталі шаблону та версії |
| `search_templates` | `import_templates:read` | Пошук шаблонів за назвою, категорією та фільтрами |
| `list_template_categories` | `import_templates:read` | Перелік доступних категорій шаблонів |
| `create_template` | `import_templates:write` | Створити новий шаблон з початковою версією |
| `update_template` | `import_templates:write` | Оновити метадані шаблону (назва, опис, категорія) |
| `delete_template` ⚠️ | `import_templates:write` | Видалити шаблон та всі його версії |
| `list_template_versions` | `import_templates:read` | Перелік версій шаблону |
| `create_template_version` | `import_templates:write` | Додати нову версію до шаблону |
| `toggle_template_version_public` | `import_templates:write` | Перемкнути публічну/приватну видимість версії |
| `delete_template_version` ⚠️ | `import_templates:write` | Видалити конкретну версію |
| `upload_template_image` | `import_templates:write` | Завантажити обкладинку для шаблону |
| `fork_template` | `import_templates:write` | Форкнути публічний шаблон у ваш обліковий запис |

### Дані Генія (артефакти, відгуки, бурмотіння)

| Інструмент | Необхідна область | Опис |
|------------|-------------------|------|
| `list_artefacts` | `genies:read` | Перелік артефактів з опціональними фільтрами |
| `get_artefact` | `genies:read` | Отримати деталі артефакту |
| `upload_artefact` | `genies:write` | Завантажити файл як артефакт |
| `download_artefact` | `genies:read` | Завантажити файл артефакту |
| `list_feedbacks` | `genies:read` | Перелік відгуків з опціональними фільтрами |
| `get_feedback` | `genies:read` | Отримати деталі відгуку |
| `create_feedback` | `genies:write` | Створити новий запис відгуку |
| `update_feedback` | `genies:write` | Оновити зміст відгуку |
| `delete_feedback` | `genies:delete` | Видалити запис відгуку |
| `list_agent_mutters` | `genies:read` | Перелік бурмотінь Генія з опціональними фільтрами |
| `get_agent_mutter` | `genies:read` | Отримати деталі бурмотіння |
| `create_agent_mutter` | `genies:write` | Створити нове бурмотіння |

**Розширена фільтрація:** Інструменти `list_artefacts`, `list_feedbacks` та `list_agent_mutters` підтримують:

| Параметр | Опис |
|----------|------|
| `query` | Текстовий пошук за назвою/вмістом |
| `playground_id` | Фільтр за робочим середовищем |
| `sort` | Поле сортування (наприклад, `created_at`, `updated_at`) |
| `sort_direction` | `asc` або `desc` |
| `limit` | Максимальна кількість результатів |

### Webhooks

| Інструмент | Необхідна область | Опис |
|------------|-------------------|------|
| `list_webhook_endpoints` | `webhooks:read` | Перелік усіх webhook-ендпоінтів |
| `create_webhook_endpoint` | `webhooks:write` | Створити новий ендпоінт |
| `update_webhook_endpoint` | `webhooks:write` | Оновити ендпоінт |
| `delete_webhook_endpoint` | `webhooks:delete` | Видалити ендпоінт |
| `list_webhook_deliveries` | `webhooks:read` | Перегляд історії доставки |
| `test_webhook_endpoint` | `webhooks:write` | Надіслати тестову подію |

:::info Деструктивні інструменти
Інструменти, позначені ⚠️, мають `destructiveHint: true`. Коректні AI-клієнти запитають підтвердження перед їх виконанням.
:::

## Доступні ресурси

Ресурси надають контекстну інформацію, яку AI Генії можуть читати:

| Ресурс | URI | Опис |
|--------|-----|------|
| Профіль гравця | `playgrounds://player/profile` | Інформація про ваш обліковий запис |
| Квоти гравця | `playgrounds://player/quotas` | Квоти ресурсів та поточне використання |
| Області API | `playgrounds://api/scopes` | Доступні та поточні області ключа |

## Безпека

- Усі запити вимагають дійсного Bearer-токена з областю `mcp:access`
- Кожен інструмент перевіряє області, специфічні для ресурсу (так само як REST API)
- Правила власності дотримуються — ви можете керувати лише своїми ресурсами
- Деструктивні інструменти позначені `destructiveHint: true`
- Інструменти лише для читання позначені `readOnlyHint: true`

## Тестування за допомогою MCP Inspector

Ви можете протестувати MCP-сервер локально за допомогою [MCP Inspector](https://github.com/anthropics/anthropic-cookbook/tree/main/misc/mcp_inspector):

```bash
npx @anthropic-ai/mcp-inspector
```

Налаштуйте з URL вашого екземпляра (наприклад, `https://fibe.gg/mcp`) та Bearer-токеном.
