import { useState } from 'react'
import { Paper, Title, TextInput, Button, Stack, Alert } from '@mantine/core'
import { authModel } from '@features/auth'

export default function Settings() {
  const user = authModel.getCurrentUser()
  const [name, setName] = useState(user.name || 'User')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('userName', name)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <Paper p="xl" radius="md" withBorder>
      <Stack gap="md">
        <Title order={2}>Settings</Title>
        
        {success && (
          <Alert color="green" title="Успешно">
            Имя успешно изменено!
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Button type="submit">Сохранить изменения</Button>
          </Stack>
        </form>
      </Stack>
    </Paper>
  )
}
