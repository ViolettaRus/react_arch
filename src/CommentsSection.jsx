import { useOptimistic, useActionState, useState, useRef, useEffect } from 'react';
import { addCommentAction } from './actions';

export default function CommentsSection({ initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const formRef = useRef(null);

  const [state, formAction, isPending] = useActionState(addCommentAction, {
    error: null,
    success: false
  });

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => {
      return [...state, { ...newComment, isOptimistic: true }];
    }
  );

  // Синхронизируем комментарии при успешном добавлении
  useEffect(() => {
    if (state.success && state.comment) {
      // Добавляем реальный комментарий (заменяя оптимистичный)
      setComments(prev => {
        // Удаляем временные оптимистичные комментарии и добавляем реальный
        const withoutOptimistic = prev.filter(c => !c.isOptimistic);
        return [...withoutOptimistic, state.comment];
      });
      // Очищаем форму
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [state.success, state.comment]);

  // Обработчик отправки формы
  async function handleSubmit(formData) {
    const text = formData.get('comment');
    
    if (!text || text.trim().length === 0) {
      return;
    }

    // Создаем оптимистичный комментарий
    const optimisticComment = {
      id: `temp-${Date.now()}`,
      text: text.trim(),
      timestamp: new Date().toISOString(),
      isOptimistic: true
    };

    // Добавляем оптимистично
    addOptimisticComment(optimisticComment);

    // Выполняем действие
    await formAction(formData);

    // Если ошибка, useOptimistic автоматически откатит оптимистичное обновление
    // к предыдущему состоянию (comments)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Комментарии</h2>
      
      {/* Список комментариев */}
      <div style={{ marginBottom: '20px' }}>
        {optimisticComments.length === 0 ? (
          <p style={{ color: '#666' }}>Пока нет комментариев. Будьте первым!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {optimisticComments.map((comment) => (
              <li
                key={comment.id}
                style={{
                  marginBottom: '15px',
                  padding: '15px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  opacity: comment.isOptimistic ? 0.7 : 1
                }}
              >
                <div style={{ marginBottom: '5px' }}>
                  {comment.text}
                </div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  {new Date(comment.timestamp).toLocaleString('ru-RU')}
                  {comment.isOptimistic && (
                    <span style={{ marginLeft: '10px', color: '#ffa500' }}>
                      Отправка...
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Форма добавления комментария */}
      <form ref={formRef} action={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            name="comment"
            placeholder="Введите ваш комментарий..."
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
            disabled={isPending}
          />
        </div>
        
        {state.error && (
          <div
            style={{
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: '#fee',
              color: '#c33',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: '10px 20px',
            backgroundColor: isPending ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isPending ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          {isPending ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
    </div>
  );
}

