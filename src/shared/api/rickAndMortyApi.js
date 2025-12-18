const API_BASE_URL = 'https://rickandmortyapi.com/api'

export const rickAndMortyApi = {
  characters: {
    getAll: (page = 1) => 
      fetch(`${API_BASE_URL}/character?page=${page}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
          return res.json()
        }),
    
    getById: (id) =>
      fetch(`${API_BASE_URL}/character/${id}`)
        .then(res => {
          if (!res.ok) {
            if (res.status === 404) throw new Error('Персонаж не найден')
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        }),
  },
  
  locations: {
    getAll: (page = 1) =>
      fetch(`${API_BASE_URL}/location?page=${page}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
          return res.json()
        }),
  },
  
  episodes: {
    getAll: (page = 1) =>
      fetch(`${API_BASE_URL}/episode?page=${page}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
          return res.json()
        }),
  },
}


