// Имитация POST запроса для добавления комментария
export async function addCommentAction(prevState, formData) {
  const text = formData.get('comment');
  
  // Валидация
  if (!text || text.trim().length === 0) {
    return {
      error: 'Комментарий не может быть пустым',
      success: false
    };
  }

  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Имитация случайной ошибки (10% вероятность)
  if (Math.random() < 0.1) {
    return {
      error: 'Ошибка при отправке комментария. Попробуйте еще раз.',
      success: false
    };
  }

  // Успешное добавление
  return {
    error: null,
    success: true,
    comment: {
      id: Date.now().toString(),
      text: text.trim(),
      timestamp: new Date().toISOString()
    }
  };
}

