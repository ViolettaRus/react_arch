import { useState, useEffect } from 'react'
import { Paper, Title, Text, Stack, Alert, Button, Loader, Center, Group } from '@mantine/core'

// Демо-данные на случай, если API недоступен
const demoUserData = {
  name: 'Leanne Graham',
  email: 'Sincere@april.biz',
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  address: {
    city: 'Gwenborough',
    street: 'Kulas Light'
  }
}

export default function Stats() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDemo, setIsDemo] = useState(false)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      setUser(data)
      setIsDemo(false)
      setLoading(false)
    } catch (err) {
      console.error('Error loading stats:', err)
      
      let errorMessage = 'Произошла ошибка при загрузке данных'
      
      if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
        errorMessage = 'Не удалось подключиться к серверу. Показаны демо-данные.'
        setUser(demoUserData)
        setIsDemo(true)
      } else {
        errorMessage = err.message || errorMessage
      }
      
      setError(errorMessage)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if (loading && !user) {
    return (
      <Paper p="xl" radius="md" withBorder>
        <Stack gap="md">
          <Title order={2}>Stats</Title>
          <Center py="xl">
            <Loader size="lg" />
          </Center>
        </Stack>
      </Paper>
    )
  }

  return (
    <Paper p="xl" radius="md" withBorder>
      <Stack gap="md">
        <Title order={2}>Stats</Title>
        
        {error && (
          <Alert 
            color={isDemo ? 'yellow' : 'red'} 
            title={isDemo ? 'Предупреждение' : 'Ошибка'}
          >
            <Stack gap="sm">
              <Text>{error}</Text>
              <Button 
                onClick={loadData}
                disabled={loading}
                size="sm"
              >
                {loading ? 'Загрузка...' : 'Попробовать снова'}
              </Button>
            </Stack>
          </Alert>
        )}
        
        <Stack gap="sm">
          <Group>
            <Text fw={500}>User:</Text>
            <Text>{user?.name || 'Не указано'}</Text>
          </Group>
          <Group>
            <Text fw={500}>Email:</Text>
            <Text>{user?.email || 'Не указано'}</Text>
          </Group>
          {user?.phone && (
            <Group>
              <Text fw={500}>Phone:</Text>
              <Text>{user.phone}</Text>
            </Group>
          )}
          {user?.website && (
            <Group>
              <Text fw={500}>Website:</Text>
              <Text>{user.website}</Text>
            </Group>
          )}
          {user?.address && (
            <Group>
              <Text fw={500}>Address:</Text>
              <Text>{user.address.city}, {user.address.street}</Text>
            </Group>
          )}
          {isDemo && (
            <Alert color="yellow" title="Информация">
              Показаны демонстрационные данные из-за недоступности API
            </Alert>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}
