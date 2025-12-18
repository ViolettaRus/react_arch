import { useCallback } from 'react'
import { Container, Title, Stack, Alert, Text, Loader, Center, Card, Group, Badge } from '@mantine/core'
import { useInfiniteScroll } from '@shared/hooks'
import { rickAndMortyApi } from '@shared/api'

function Locations() {
  const fetchLocations = useCallback(async (page) => {
    return await rickAndMortyApi.locations.getAll(page)
  }, [])

  const { items, loading, error, hasMore, observerTarget, reload } = useInfiniteScroll(
    fetchLocations,
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
        <Title order={1}>Локации</Title>

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
          {items.map((location) => (
            <Card key={location.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="xs">
                <Title order={4}>{location.name}</Title>
                <Badge variant="light" color="blue">
                  {location.type}
                </Badge>
                <Text size="sm" c="dimmed">
                  {location.dimension || 'Неизвестное измерение'}
                </Text>
                <Text size="sm" c="dimmed">
                  Жителей: {location.residents?.length || 0}
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
            Все локации загружены
          </Text>
        )}

        <div ref={observerTarget} style={{ height: '20px' }} />
      </Stack>
    </Container>
  )
}

export default Locations
