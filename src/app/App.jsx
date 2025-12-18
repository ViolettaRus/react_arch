import { CommentsSection } from '@widgets/comments-section'

// Начальные комментарии
const initialComments = [
  {
    id: '1',
    text: 'Отличный пример использования хуков React!',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '2',
    text: 'useOptimistic и useActionState - это очень полезные хуки.',
    timestamp: new Date(Date.now() - 1800000).toISOString()
  }
];

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', padding: '20px' }}>
      <CommentsSection initialComments={initialComments} />
    </div>
  );
}

export default App;

