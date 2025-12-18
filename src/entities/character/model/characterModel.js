// Модель персонажа
export const characterModel = {
  // Типы статусов
  statusTypes: {
    ALIVE: 'Alive',
    DEAD: 'Dead',
    UNKNOWN: 'unknown'
  },

  // Получить цвет статуса
  getStatusColor(status) {
    const statusLower = status?.toLowerCase()
    switch (statusLower) {
      case 'alive':
        return 'green'
      case 'dead':
        return 'red'
      case 'unknown':
        return 'gray'
      default:
        return 'gray'
    }
  },

  // Форматировать дату
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('ru-RU')
  }
}

