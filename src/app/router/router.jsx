import { lazy, Suspense } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from '@shared/ui'
import { ProtectedRoute } from '@shared/ui'
import { protectedLoader } from '@shared/lib'
import { Container, Loader, Center } from '@mantine/core'

// Lazy loading для всех страниц
const Home = lazy(() => import('@pages/Home/Home'))
const Login = lazy(() => import('@pages/Login/Login'))
const Dashboard = lazy(() => import('@pages/Dashboard/Dashboard'))
const Profile = lazy(() => import('@pages/Dashboard/Profile/Profile'))
const Settings = lazy(() => import('@pages/Dashboard/Settings/Settings'))
const Stats = lazy(() => import('@pages/Dashboard/Stats/Stats'))
const Characters = lazy(() => import('@pages/Characters/Characters'))
const CharacterDetail = lazy(() => import('@pages/CharacterDetail/CharacterDetail'))
const Locations = lazy(() => import('@pages/Locations/Locations'))
const Episodes = lazy(() => import('@pages/Episodes/Episodes'))

// Компонент загрузки
const LoadingFallback = () => (
  <Container size="md" py="xl">
    <Center style={{ minHeight: '50vh' }}>
      <Loader size="lg" />
    </Center>
  </Container>
)

// Обёртка для страниц с ErrorBoundary и Suspense
const PageWrapper = ({ children }) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  </ErrorBoundary>
)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <PageWrapper>
            <Home />
          </PageWrapper>
        }
      />
      <Route
        path="/login"
        element={
          <PageWrapper>
            <Login />
          </PageWrapper>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <PageWrapper>
              <Dashboard />
            </PageWrapper>
          </ProtectedRoute>
        }
        loader={protectedLoader}
      >
        <Route index element={<Navigate to="/dashboard/profile" replace />} />
        <Route
          path="profile"
          element={
            <PageWrapper>
              <Profile />
            </PageWrapper>
          }
        />
        <Route
          path="settings"
          element={
            <PageWrapper>
              <Settings />
            </PageWrapper>
          }
        />
        <Route
          path="stats"
          element={
            <PageWrapper>
              <Stats />
            </PageWrapper>
          }
        />
      </Route>
      <Route
        path="/characters"
        element={
          <ProtectedRoute>
            <PageWrapper>
              <Characters />
            </PageWrapper>
          </ProtectedRoute>
        }
        loader={protectedLoader}
      />
      <Route
        path="/characters/:id"
        element={
          <ProtectedRoute>
            <PageWrapper>
              <CharacterDetail />
            </PageWrapper>
          </ProtectedRoute>
        }
        loader={protectedLoader}
      />
      <Route
        path="/locations"
        element={
          <ProtectedRoute>
            <PageWrapper>
              <Locations />
            </PageWrapper>
          </ProtectedRoute>
        }
        loader={protectedLoader}
      />
      <Route
        path="/episodes"
        element={
          <ProtectedRoute>
            <PageWrapper>
              <Episodes />
            </PageWrapper>
          </ProtectedRoute>
        }
        loader={protectedLoader}
      />
    </Route>
  )
)

export default router

