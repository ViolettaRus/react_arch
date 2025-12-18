import { Paper, Title, Text, Stack, Group } from '@mantine/core'
import { authModel } from '@features/auth'

export default function Profile() {
  const user = authModel.getCurrentUser()
  const name = user.name || 'User'
  const email = user.email || 'user@example.com'

  return (
    <Paper p="xl" radius="md" withBorder>
      <Stack gap="md">
        <Title order={2}>Profile</Title>
        <Group>
          <Text fw={500}>Имя:</Text>
          <Text>{name}</Text>
        </Group>
        <Group>
          <Text fw={500}>Email:</Text>
          <Text>{email}</Text>
        </Group>
      </Stack>
    </Paper>
  )
}
