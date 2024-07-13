# Проект Чат с Поддержкой

Этот проект представляет собой пример простого чата с поддержкой, разработанный с использованием React и Socket.io.

## Описание

Чат поддержки позволяет пользователям отправлять сообщения и получать ответы от поддерживающего агента в реальном времени. Приложение поддерживает переключение темной и светлой темы.

## Функциональность

- Отправка и прием сообщений в реальном времени через Socket.io.
- Поддержка переключения между светлой и темной темами.
- Возможность отправки текстовых сообщений.
- Простой механизм анимации при отправке сообщений.

## Технологии

- **React**: Использован для построения пользовательского интерфейса и управления состоянием приложения.
- **Socket.io**: Для реализации двусторонней связи между клиентом (пользователь) и сервером (поддерживающий агент) в реальном времени.
- **CSS**: Простые стили для оформления интерфейса.

## Установка и Запуск

1. Клонируем репозиторий

   ```
   git clone <repository>
   ```

1. Установка зависимостей для клиентской части:

   ```
   cd client
   npm install
   ```

2. Запуск клиентской части:

   ```
   export NODE_OPTIONS=--openssl-legacy-provider
   npm start
   ```
3. Запуск серверной части:
   ```
   cd server
   npm install
   node server.js
   ```

Приложение будет доступно по адресу `http://localhost:3000`.
