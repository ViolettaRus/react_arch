import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Container, 
  Paper, 
  Title, 
  Text, 
  Image, 
  Group, 
  Stack, 
  Badge, 
  Button,
  Grid,
  Loader,
  Center,
  Alert
} from '@mantine/core'
import { rickAndMortyApi } from '@shared/api'
import { characterModel } from '@entities/character'

function CharacterDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true)
        const data = await rickAndMortyApi.characters.getById(id)
        setCharacter(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching character:', err)
        setError(err.message || 'Произошла ошибка при загрузке данных')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCharacter()
    }
  }, [id])

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Center py="xl">
          <Loader size="lg" />
        </Center>
      </Container>
    )
  }

  if (error || !character) {
    return (
      <Container size="xl" py="xl">
        <Stack gap="md">
          <Alert color="red" title="Ошибка">
            {error || 'Персонаж не найден'}
          </Alert>
          <Button onClick={() => navigate('/characters')}>
            Вернуться к списку персонажей
          </Button>
        </Stack>
      </Container>
    )
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Button variant="subtle" onClick={() => navigate(-1)}>
          ← Назад
        </Button>
        
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Image
              src={character.image}
              alt={character.name}
              radius="md"
            />
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="lg">
              <Title order={1}>{character.name}</Title>
              
              <Paper p="md" withBorder radius="md">
                <Title order={3} mb="md">Информация</Title>
                <Stack gap="sm">
                  <Group>
                    <Text fw={500}>Статус:</Text>
                    <Badge color={characterModel.getStatusColor(character.status)}>
                      {character.status}
                    </Badge>
                  </Group>
                  
                  <Group>
                    <Text fw={500}>Вид:</Text>
                    <Text>{character.species}</Text>
                  </Group>
                  
                  <Group>
                    <Text fw={500}>Тип:</Text>
                    <Text>{character.type || 'Не указан'}</Text>
                  </Group>
                  
                  <Group>
                    <Text fw={500}>Пол:</Text>
                    <Text>{character.gender}</Text>
                  </Group>
                  
                  <Group>
                    <Text fw={500}>Происхождение:</Text>
                    <Text>{character.origin?.name || 'Неизвестно'}</Text>
                  </Group>
                  
                  <Group>
                    <Text fw={500}>Местоположение:</Text>
                    <Text>{character.location?.name || 'Неизвестно'}</Text>
                  </Group>
                  
                  <Group>
                    <Text fw={500}>Дата создания:</Text>
                    <Text>{characterModel.formatDate(character.created)}</Text>
                  </Group>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  )
}

export default CharacterDetail
