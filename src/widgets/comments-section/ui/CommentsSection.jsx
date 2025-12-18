import { useOptimistic, useActionState, useState } from 'react'
import { 
  Paper, 
  TextInput, 
  Button, 
  Stack, 
  Text, 
  Group, 
  Alert,
  Loader,
  Center
} from '@mantine/core'
import { addCommentAction } from '../model/commentActions'

export const CommentsSection = ({ initialComments = [] }) => {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    initialComments,
    (state, newComment) => [...state, newComment]
  )

  const [state, formAction, isPending] = useActionState(addCommentAction, {
    error: null,
    success: false
  })

  const [formData, setFormData] = useState({ comment: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const formDataToSend = new FormData()
    formDataToSend.append('comment', formData.comment)

    // Оптимистичное обновление
    const optimisticComment = {
      id: `temp-${Date.now()}`,
      text: formData.comment,
      timestamp: new Date().toISOString()
    }
    addOptimisticComment(optimisticComment)

    // Очищаем форму
    setFormData({ comment: '' })

    // Отправляем форму
    await formAction(formDataToSend)

    // Если успешно, форма уже очищена
    // Если ошибка, комментарий будет удален из optimistic state автоматически
  }

  return (
    <Paper p="xl" radius="md" withBorder style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Stack gap="lg">
        <Text size="xl" fw={700}>Комментарии</Text>

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              placeholder="Напишите комментарий..."
              value={formData.comment}
              onChange={(e) => setFormData({ comment: e.target.value })}
              disabled={isPending}
              required
            />
            
            {state.error && (
              <Alert color="red" title="Ошибка">
                {state.error}
              </Alert>
            )}
            
            {state.success && (
              <Alert color="green" title="Успешно">
                Комментарий добавлен!
              </Alert>
            )}

            <Button 
              type="submit" 
              loading={isPending}
              disabled={!formData.comment.trim()}
            >
              Отправить
            </Button>
          </Stack>
        </form>

        <Stack gap="md" mt="xl">
          {optimisticComments.length === 0 ? (
            <Text c="dimmed" ta="center" py="xl">
              Пока нет комментариев. Будьте первым!
            </Text>
          ) : (
            optimisticComments.map((comment) => (
              <Paper key={comment.id} p="md" withBorder radius="md">
                <Stack gap="xs">
                  <Text>{comment.text}</Text>
                  <Text size="xs" c="dimmed">
                    {new Date(comment.timestamp).toLocaleString('ru-RU')}
                  </Text>
                </Stack>
              </Paper>
            ))
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

