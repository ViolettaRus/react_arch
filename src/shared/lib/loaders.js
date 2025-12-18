import { redirect } from 'react-router-dom'

// Loader для защиты маршрута
export function protectedLoader({ request }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (!isAuthenticated) {
    const url = new URL(request.url)
    return redirect(`/login?from=${encodeURIComponent(url.pathname)}`)
  }
  return null
}


