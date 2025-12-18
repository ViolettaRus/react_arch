import { Component } from 'react'
import { Button, Container, Title, Text, Paper, Code } from '@mantine/core'
import './ErrorBoundary.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container size="md" py="xl">
          <Paper p="xl" radius="md" withBorder>
            <Title order={2} mb="md">Что-то пошло не так</Title>
            <Text c="dimmed" mb="lg">
              Произошла ошибка при загрузке содержимого.
            </Text>
            {this.state.error && (
              <details style={{ marginBottom: '1rem' }}>
                <Text component="summary" style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                  Подробности ошибки
                </Text>
                <Code block>{this.state.error.toString()}</Code>
                {this.state.errorInfo && (
                  <Code block mt="xs">{this.state.errorInfo.componentStack}</Code>
                )}
              </details>
            )}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button onClick={this.handleReset}>Попробовать снова</Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
              >
                Вернуться на главную
              </Button>
            </div>
          </Paper>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary



