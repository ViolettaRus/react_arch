import { useNavigate } from 'react-router-dom'
import { Container, Title, Text, Button, Stack, Group } from '@mantine/core'
import { authModel } from '@features/auth'

export default function Home() {
  const navigate = useNavigate()
  const isAuthenticated = authModel.isAuthenticated()

  return (
    <Container size="md" py="xl">
      <Stack gap="xl" align="center">
        <Title order={1}>Добро пожаловать в User Dashboard!</Title>
        <Text size="lg" c="dimmed" ta="center">
          Это главная страница приложения.
        </Text>
        
        {isAuthenticated ? (
          <Stack gap="md" w="100%" maw={400}>
            <Button 
              fullWidth 
              size="lg" 
              onClick={() => navigate('/dashboard')}
            >
              Перейти в Dashboard
            </Button>
            <Group grow>
              <Button 
                variant="light" 
                onClick={() => navigate('/characters')}
              >
                Персонажи
              </Button>
              <Button 
                variant="light" 
                onClick={() => navigate('/locations')}
              >
                Локации
              </Button>
              <Button 
                variant="light" 
                onClick={() => navigate('/episodes')}
              >
                Эпизоды
              </Button>
            </Group>
          </Stack>
        ) : (
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
          >
            Войти в систему
          </Button>
        )}
      </Stack>
    </Container>
  )
}
