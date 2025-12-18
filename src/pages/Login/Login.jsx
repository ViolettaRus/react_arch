import { useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { 
  Container, 
  Paper, 
  Title, 
  TextInput, 
  PasswordInput, 
  Button, 
  Stack, 
  Alert,
  Text
} from '@mantine/core'
import { authModel } from '@features/auth'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // Получаем путь для редиректа из query параметра или из location state
  const fromParam = searchParams.get('from')
  const from = fromParam || location.state?.from?.pathname || '/dashboard'

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const result = authModel.login(formData.email, formData.password)
    
    if (result.success) {
      setError('')
      navigate(from, { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <Container size="sm" py="xl">
      <Paper p="xl" radius="md" withBorder>
        <Stack gap="md">
          <Title order={2} ta="center">Вход в систему</Title>
          
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              {error && (
                <Alert color="red" title="Ошибка">
                  {error}
                </Alert>
              )}
              
              <TextInput
                label="Email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                type="email"
                error={error && !formData.email ? 'Обязательное поле' : null}
              />
              
              <PasswordInput
                label="Пароль"
                placeholder="Введите пароль"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
                error={error && !formData.password ? 'Обязательное поле' : null}
              />
              
              <Button type="submit" fullWidth>
                Войти
              </Button>
            </Stack>
          </form>
          
          <Button 
            variant="subtle" 
            fullWidth 
            onClick={() => navigate('/')}
          >
            На главную
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}
