// Модель аутентификации
export const authModel = {
  // Валидные пользователи (в реальном приложении это было бы на сервере)
  validUsers: [
    { email: 'admin@example.com', password: 'admin123', name: 'Admin' },
    { email: 'user@example.com', password: 'user123', name: 'User' },
    { email: 'test@test.com', password: 'test', name: 'Test User' }
  ],

  login(email, password) {
    const user = this.validUsers.find(
      u => u.email === email && u.password === password
    )
    
    if (user) {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', user.email)
      localStorage.setItem('userName', user.name)
      return { success: true, user }
    }
    
    return { success: false, error: 'Неверный email или пароль!' }
  },

  logout() {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
  },

  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true'
  },

  getCurrentUser() {
    return {
      email: localStorage.getItem('userEmail'),
      name: localStorage.getItem('userName')
    }
  }
}

