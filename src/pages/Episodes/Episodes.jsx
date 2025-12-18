import { useCallback } from 'react'
import { Container, Title, Stack, Alert, Text, Loader, Center, Card, Badge, Button } from '@mantine/core'
import { useInfiniteScroll } from '@shared/hooks'
import { rickAndMortyApi } from '@shared/api'

function Episodes() {
  const fetchEpisodes = useCallback(async (page) => {
    return await rickAndMortyApi.episodes.getAll(page)
  }, [])

  const { items, loading, error, hasMore, observerTarget, reload } = useInfiniteScroll(
    fetchEpisodes,
    1
  )

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
        <Title order={1}>Эпизоды</Title>

        {error && items.length > 0 && (
          <Alert color="yellow" title="Предупреждение">
            {error}
          </Alert>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '1.5rem'
        }}>
          {items.map((episode) => (
            <Card key={episode.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="xs">
                <Title order={4}>{episode.name}</Title>
                <Badge variant="light" color="violet">
                  {episode.episode}
                </Badge>
                <Text size="sm" c="dimmed">
                  Дата выхода: {episode.air_date}
                </Text>
                <Text size="sm" c="dimmed">
                  Персонажей: {episode.characters?.length || 0}
                </Text>
              </Stack>
            </Card>
          ))}
        </div>

        {loading && (
          <Center py="xl">
            <Loader size="lg" />
          </Center>
        )}

        {!hasMore && items.length > 0 && (
          <Text c="dimmed" ta="center" py="xl">
            Все эпизоды загружены
          </Text>
        )}

        <div ref={observerTarget} style={{ height: '20px' }} />
      </Stack>
    </Container>
  )
}

export default Episodes
