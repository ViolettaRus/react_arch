# Архитектура проекта

Проект реорганизован по методологии **Feature-Sliced Design (FSD)** с использованием **Mantine UI** в качестве дизайн-системы.

## Структура проекта

```
src/
├── app/                    # Инициализация приложения
│   ├── providers/         # Провайдеры (Mantine, Context и т.д.)
│   └── router/            # Конфигурация роутинга
│
├── pages/                  # Страницы приложения
│   ├── Home/
│   ├── Login/
│   ├── Dashboard/
│   ├── Characters/
│   ├── CharacterDetail/
│   ├── Locations/
│   └── Episodes/
│
├── widgets/                # Сложные составные компоненты
│   ├── character-grid/    # Виджет сетки персонажей
│   └── comments-section/  # Виджет секции комментариев
│
├── features/              # Бизнес-логика и фичи
│   └── auth/              # Аутентификация
│
├── entities/              # Бизнес-сущности
│   ├── character/         # Сущность персонажа
│   ├── location/          # Сущность локации
│   └── episode/           # Сущность эпизода
│
└── shared/                # Переиспользуемый код
    ├── ui/                # UI компоненты (ErrorBoundary, ProtectedRoute)
    ├── api/               # API функции
    ├── hooks/             # Переиспользуемые хуки
    └── lib/               # Утилиты и хелперы
```

## Принципы архитектуры

### 1. Feature-Sliced Design

- **app/** - точка входа, провайдеры, роутинг
- **pages/** - страницы приложения
- **widgets/** - сложные составные компоненты
- **features/** - бизнес-логика и фичи
- **entities/** - бизнес-сущности
- **shared/** - переиспользуемый код

### 2. Абсолютные импорты

Настроены алиасы в `vite.config.js`:
- `@app` → `src/app`
- `@pages` → `src/pages`
- `@widgets` → `src/widgets`
- `@features` → `src/features`
- `@entities` → `src/entities`
- `@shared` → `src/shared`

### 3. Дизайн-система

Используется **Mantine UI** для всех UI компонентов:
- Кнопки, формы, карточки
- Уведомления и алерты
- Загрузчики
- И многое другое

## Основные компоненты

### Shared UI
- `ErrorBoundary` - обработка ошибок React
- `ProtectedRoute` - защита маршрутов

### Features
- `auth` - модель аутентификации с методами login/logout

### Entities
- `character` - модель персонажа с утилитами

### Widgets
- `CharacterGrid` - сетка карточек персонажей
- `CommentsSection` - секция комментариев с оптимистичными обновлениями

## Технологии

- **React 19** - UI библиотека
- **React Router v7** - роутинг
- **Vite** - сборщик
- **Mantine UI** - дизайн-система

## Запуск проекта

```bash
npm install
npm run dev
```

## Структура импортов

Примеры использования абсолютных импортов:

```javascript
// Из shared
import { useInfiniteScroll } from '@shared/hooks'
import { rickAndMortyApi } from '@shared/api'
import { ErrorBoundary } from '@shared/ui'

// Из features
import { authModel } from '@features/auth'

// Из entities
import { characterModel } from '@entities/character'

// Из widgets
import { CharacterGrid } from '@widgets/character-grid'

// Из pages
import Home from '@pages/Home/Home'
```

