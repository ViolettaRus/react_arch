# Архитектура проекта

Проект организован по методологии **Feature-Sliced Design (FSD)** с использованием **Mantine UI** в качестве дизайн-системы.

## Структура проекта

```
src/
├── app/                    # Инициализация приложения (фундамент)
│   ├── App.jsx            # Главный компонент приложения
│   ├── providers/         # Провайдеры (Mantine, Context и т.д.)
│   ├── router/            # Конфигурация роутинга
│   └── styles/            # Глобальные стили приложения
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
    └── lib/               # Утилиты, хелперы, данные
        └── data/          # Статические данные
```

## Принципы архитектуры Feature-Sliced Design

### Слои (от верхнего к нижнему)

1. **app/** - Фундамент приложения
   - Инициализация приложения
   - Провайдеры (Mantine, Context)
   - Роутинг
   - Глобальные стили

2. **pages/** - Страницы приложения
   - Композиция виджетов и фич
   - Маршруты приложения

3. **widgets/** - Сложные составные компоненты
   - Комбинация фич и сущностей
   - Переиспользуемые блоки интерфейса

4. **features/** - Бизнес-логика и фичи
   - Действия пользователя
   - Бизнес-процессы

5. **entities/** - Бизнес-сущности
   - Модели данных
   - Логика работы с сущностями

6. **shared/** - Переиспользуемый код
   - UI компоненты
   - Утилиты
   - Хуки
   - API функции
   - Статические данные

### Правила импортов (FSD)

- **Слои могут импортировать только из слоев ниже себя**
- **Нельзя импортировать из слоев выше**
- **Нельзя создавать циклические зависимости**

Примеры:
- `pages` может импортировать из `widgets`, `features`, `entities`, `shared`
- `widgets` может импортировать из `features`, `entities`, `shared`
- `features` может импортировать из `entities`, `shared`
- `entities` может импортировать только из `shared`
- `shared` не может импортировать из других слоев

## Абсолютные импорты

Настроены алиасы в `vite.config.js`:
- `@app` → `src/app`
- `@pages` → `src/pages`
- `@widgets` → `src/widgets`
- `@features` → `src/features`
- `@entities` → `src/entities`
- `@shared` → `src/shared`

## Дизайн-система

Используется **Mantine UI** для всех UI компонентов:
- Кнопки, формы, карточки
- Уведомления и алерты
- Загрузчики
- И многое другое

## Основные компоненты

### App (app/App.jsx)
- Главный компонент приложения
- Композиция виджетов

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
// Из app
import App from '@app/App'
import { router } from '@app/router'
import '@app/styles/index.css'

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

## Что НЕ должно быть в корне src

Согласно FSD, в корне `src/` не должно быть:
- ❌ `components/` - использовать `shared/ui/`
- ❌ `hooks/` - использовать `shared/hooks/`
- ❌ `routes/` - использовать `app/router/`
- ❌ `styles/` - использовать `app/styles/`
- ❌ `data/` - использовать `shared/lib/data/`

Все должно быть организовано по слоям FSD.
