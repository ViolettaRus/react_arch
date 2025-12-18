import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Title, Group, Button, Stack, Alert, Text, Loader, Center } from '@mantine/core'
import { useInfiniteScroll } from '@shared/hooks'
import { rickAndMortyApi } from '@shared/api'
import { CharacterGrid } from '@widgets/character-grid'
import { authModel } from '@features/auth'

function Characters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortOrder = searchParams.get('sort') || 'ASC'

  const fetchCharacters = useCallback(async (page) => {
    return await rickAndMortyApi.characters.getAll(page)
  }, [])

  const { items, loading, error, hasMore, observerTarget, reload } = useInfiniteScroll(
    fetchCharacters,
    1
  )

  const sortedCharacters = [...items].sort((a, b) => {
    const dateA = new Date(a.created)
    const dateB = new Date(b.created)
    return sortOrder === 'ASC' ? dateA - dateB : dateB - dateA
  })

  const handleSortChange = (order) => {
    setSearchParams({ sort: order })
  }

  if (error && items.length === 0) {
    return (
      <Container size="xl" py="xl">
        <Stack gap="md">
          <Alert color="red" title="Ошибка загрузки">
            {error}
          </Alert>
          <Button onClick={reload}>Попробовать снова</Button>
        </Stack>
      </Container>
    )
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={1}>Персонажи</Title>
          <Group>
            <Text size="sm">Сортировка:</Text>
            <Button
              variant={sortOrder === 'ASC' ? 'filled' : 'light'}
              onClick={() => handleSortChange('ASC')}
              size="sm"
            >
              По дате создания ↑
            </Button>
            <Button
              variant={sortOrder === 'DESC' ? 'filled' : 'light'}
              onClick={() => handleSortChange('DESC')}
              size="sm"
            >
              По дате создания ↓
            </Button>
          </Group>
        </Group>

        {error && items.length > 0 && (
          <Alert color="yellow" title="Предупреждение">
            {error}
          </Alert>
        )}

        <CharacterGrid characters={sortedCharacters} />

        {loading && (
          <Center py="xl">
            <Loader size="lg" />
          </Center>
        )}

        {!hasMore && items.length > 0 && (
          <Text c="dimmed" ta="center" py="xl">
            Все персонажи загружены
          </Text>
        )}

        <div ref={observerTarget} style={{ height: '20px' }} />
      </Stack>
    </Container>
  )
}

export default Characters
