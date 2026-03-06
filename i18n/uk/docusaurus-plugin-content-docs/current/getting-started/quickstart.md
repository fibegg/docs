---
sidebar_position: 1
title: Швидкий старт
---

# Швидкий старт

Запустіть своє перше середовище Playgrounds.dev менш ніж за хвилину.

## Передумови

- Обліковий запис Playgrounds.dev
- GitHub-репозиторій з `docker-compose.yml`

## Кроки

### 1. Створіть Playzone

Playzone — це ваш робочий простір. Він підключається до вашої GitHub-організації та керує вашими середовищами.

### 2. Додайте Playspec

Playspec визначає ваш стек — це конфігурація Docker Compose, яка описує ваші сервіси, бази даних та інші залежності.

### 3. Запустіть Playground

Натисніть **Запустити**, щоб розгорнути нове середовище. Ваші сервіси будуть доступні за унікальними субдоменами протягом секунд.

```yaml
# Приклад docker-compose.yml
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: password
```

## Що далі?

- Дізнайтеся про [Основні концепції](/uk/getting-started/concepts), щоб зрозуміти архітектуру платформи
