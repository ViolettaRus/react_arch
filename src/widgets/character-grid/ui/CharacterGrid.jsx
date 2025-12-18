import { Link } from 'react-router-dom'
import { Card, Image, Text, Badge, Group, Stack } from '@mantine/core'
import { characterModel } from '@entities/character'

export const CharacterGrid = ({ characters }) => {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
      gap: '1.5rem',
      padding: '1rem 0'
    }}>
      {characters.map((character) => (
        <Link
          key={character.id}
          to={`/characters/${character.id}`}
          style={{ textDecoration: 'none' }}
        >
          <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
            <Card.Section>
              <Image
                src={character.image}
                alt={character.name}
                height={200}
                fit="cover"
              />
            </Card.Section>

            <Stack gap="xs" mt="md">
              <Text fw={500} size="lg" lineClamp={1}>
                {character.name}
              </Text>
              
              <Group gap="xs">
                <Badge 
                  color={characterModel.getStatusColor(character.status)}
                  variant="light"
                >
                  {character.status}
                </Badge>
              </Group>
              
              <Text size="sm" c="dimmed">
                {character.species} • {character.gender}
              </Text>
            </Stack>
          </Card>
        </Link>
      ))}
    </div>
  )
}



