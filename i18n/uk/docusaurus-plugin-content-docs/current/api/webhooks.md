---
sidebar_position: 8
---

# Webhooks

Налаштуйте вихідні webhooks для отримання HTTP POST-повідомлень при виникненні подій у вашому обліковому записі Playgrounds.

## Огляд

Ендпоінти webhook отримують JSON-навантаження в реальному часі, підписані за допомогою HMAC-SHA256. Ви можете підписатися на конкретні типи подій та опціонально фільтрувати за ID сутностей для детального контролю.

Кожен ендпоінт має **секрет підпису**, який використовується для верифікації навантажень. Ви можете надати власний секрет при створенні або дозволити системі автоматично згенерувати безпечний випадковий. Секрет завжди видимий на сторінці деталей ендпоінта та через API.

## Керування Webhooks

### Створення ендпоінта

```bash
curl -X POST https://your-instance.com/api/webhook_endpoints \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "webhook_endpoint": {
      "url": "https://your-server.com/webhooks",
      "events": ["playground.created", "playground.status.changed"],
      "description": "CI/CD notifications"
    }
  }'
```

Опціонально вкажіть поле `"secret": "your-custom-secret"`. Якщо не вказано, буде автоматично згенеровано 64-символьний шістнадцятковий секрет.

**Відповідь:**

```json
{
  "id": 1,
  "url": "https://your-server.com/webhooks",
  "secret": "a1b2c3d4...64-char-hex...",
  "events": ["playground.created", "playground.status.changed"],
  "description": "CI/CD notifications",
  "enabled": true,
  "failure_count": 0,
  "created_at": "2026-03-18T09:00:00Z"
}
```

`secret` повертається при створенні. Ви також можете переглянути його в будь-який час через ендпоінт **show** або інтерфейс.

### Детальна фільтрація подій

Фільтруйте події за конкретними ID сутностей за допомогою `event_filters`:

```json
{
  "webhook_endpoint": {
    "url": "https://your-server.com/webhooks",
    "events": ["playground.created", "genie.updated"],
    "event_filters": {
      "playground.created": [1, 2, 3],
      "genie.updated": [10, 20]
    }
  }
}
```

- `"playground.created": [1, 2, 3]` → спрацьовує лише для Playground з ID 1, 2, 3
- `"genie.updated": []` або ключ відсутній → спрацьовує для ВСІХ Генії

Щоб підписатися на всі події, оберіть кожен тип події окремо (або використовуйте кнопку **Обрати все** в інтерфейсі).

### Список ендпоінтів

```bash
curl https://your-instance.com/api/webhook_endpoints \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Оновлення ендпоінта

```bash
curl -X PATCH https://your-instance.com/api/webhook_endpoints/1 \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"webhook_endpoint": {"enabled": false}}'
```

### Видалення ендпоінта

```bash
curl -X DELETE https://your-instance.com/api/webhook_endpoints/1 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Тестування ендпоінта

```bash
curl -X POST https://your-instance.com/api/webhook_endpoints/1/test \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Список доступних типів подій

```bash
curl https://your-instance.com/api/webhook_endpoints/event_types \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Перегляд історії доставки

```bash
curl https://your-instance.com/api/webhook_endpoints/1/deliveries \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Типи подій

| Сутність | Події |
|----------|-------|
| Playground | `playground.created`, `playground.updated`, `playground.destroyed`, `playground.status.changed`, `playground.error`, `playground.expired`, `playground.drift.detected` та інші |
| Marquee | `marquee.created`, `marquee.updated`, `marquee.destroyed` |
| Prop | `prop.created`, `prop.updated`, `prop.destroyed` |
| Playspec | `playspec.created`, `playspec.updated`, `playspec.destroyed` |
| Геній | `genie.created`, `genie.updated`, `genie.destroyed`, `genie.authenticated`, `genie.revoked` |
| Шаблон | `template.created`, `template.updated`, `template.destroyed` |
| Артефакт | `artefact.created`, `artefact.destroyed` |
| Відгук | `feedback.created`, `feedback.updated`, `feedback.destroyed` |
| Бурмотіння | `mutter.created`, `mutter.updated` |
| API-ключ | `api_key.created`, `api_key.destroyed` |
| Система | `webhook.test` |

Щоб підписатися на всі події, оберіть кожен тип події окремо. Використовуйте кнопки **Обрати все** / **Скасувати вибір** у формі інтерфейсу для зручності.

## Формат навантаження

```json
{
  "entity_type": "Playground",
  "entity_id": 42,
  "action": "created",
  "timestamp": "2026-03-18T08:00:00Z"
}
```

Події аудиту Playground включають розширені навантаження з `audit_log_id`, `playground_name`, `actor_type`, `actor_id` та `metadata`.

## Верифікація підпису

Кожен запит webhook містить заголовок `X-Webhook-Signature` з підписом HMAC-SHA256:

```
X-Webhook-Signature: sha256=abc123...
```

### Приклади верифікації

**Ruby:**
```ruby
expected = "sha256=" + OpenSSL::HMAC.hexdigest("SHA256", secret, request.body.read)
raise "Invalid signature" unless Rack::Utils.secure_compare(expected, request.headers["X-Webhook-Signature"])
```

**Node.js:**
```javascript
const crypto = require('crypto');
const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(body).digest('hex');
if (expected !== req.headers['x-webhook-signature']) throw new Error('Invalid signature');
```

**Python:**
```python
import hmac, hashlib
expected = "sha256=" + hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
assert hmac.compare_digest(expected, request.headers["X-Webhook-Signature"])
```

## Заголовки запиту

| Заголовок | Опис |
|-----------|------|
| `Content-Type` | `application/json` |
| `X-Webhook-Signature` | Підпис HMAC-SHA256 навантаження |
| `X-Webhook-Event` | Тип події (наприклад, `playground.created`) |
| `X-Webhook-Delivery` | Унікальний ID доставки |
| `User-Genie` | `Playgrounds-Webhook/1.0` |

## Автовимкнення

Ендпоінти автоматично вимикаються після **10 послідовних невдалих доставок** (відповіді не-2xx або мережеві помилки). Лічильник невдач скидається при кожній успішній доставці.

## Області API-ключа

Керування webhook вимагає наступних областей API-ключа:

| Область | Дозволи |
|---------|---------|
| `webhooks:read` | Перегляд ендпоінтів та історії доставки |
| `webhooks:write` | Створення, оновлення та тестування ендпоінтів |
| `webhooks:delete` | Видалення ендпоінтів |

## MCP-інструменти

Наступні MCP-інструменти доступні для керування webhook:

- **`list_webhook_endpoints`** — Перелік усіх ендпоінтів
- **`create_webhook_endpoint`** — Створення нового ендпоінта
- **`update_webhook_endpoint`** — Оновлення ендпоінта
- **`delete_webhook_endpoint`** — Видалення ендпоінта
- **`list_webhook_deliveries`** — Перегляд історії доставки
- **`test_webhook_endpoint`** — Надсилання тестової події
