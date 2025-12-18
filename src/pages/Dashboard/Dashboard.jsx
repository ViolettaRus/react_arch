import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Container, Title, Button, Tabs, Stack } from '@mantine/core'
import { authModel } from '@features/auth'

export default function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = authModel.getCurrentUser()

  const handleLogout = () => {
    authModel.logout()
    navigate('/login')
  }

  // Определяем активную вкладку на основе текущего пути
  const getActiveTab = () => {
    if (location.pathname.includes('/settings')) return 'settings'
    if (location.pathname.includes('/stats')) return 'stats'
    return 'profile'
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title order={1}>Dashboard</Title>
          <Button variant="outline" onClick={handleLogout}>
            Выйти
          </Button>
        </div>
        
        <Tabs value={getActiveTab()}>
          <Tabs.List>
            <Tabs.Tab value="profile" component={NavLink} to="/dashboard/profile">
              Profile
            </Tabs.Tab>
            <Tabs.Tab value="settings" component={NavLink} to="/dashboard/settings">
              Settings
            </Tabs.Tab>
            <Tabs.Tab value="stats" component={NavLink} to="/dashboard/stats">
              Stats
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        
        <Outlet />
      </Stack>
    </Container>
  )
}
