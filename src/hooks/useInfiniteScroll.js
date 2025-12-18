import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Hook for infinite scroll functionality
 * @param {Function} fetchFunction - Function that fetches data for a given page
 * @param {number} initialPage - Starting page number (default: 1)
 */
export function useInfiniteScroll(fetchFunction, initialPage = 1) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(initialPage)
  const observerTarget = useRef(null)
  const isLoadingRef = useRef(false)
  const initialLoadDoneRef = useRef(false)
  const fetchFunctionRef = useRef(fetchFunction)

  // Обновляем ref при изменении функции
  useEffect(() => {
    fetchFunctionRef.current = fetchFunction
  }, [fetchFunction])

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMore) return

    isLoadingRef.current = true
    setLoading(true)
    setError(null)

    try {
      const currentPage = page
      const response = await fetchFunctionRef.current(currentPage)
      
      if (response.results && response.results.length > 0) {
        setItems(prev => [...prev, ...response.results])
        setPage(prev => prev + 1)
        
        // Check if there are more pages
        const hasNextPage = response.info && response.info.next !== null
        setHasMore(hasNextPage)
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.error('Error loading data:', err)
      setError(err.message || 'Произошла ошибка при загрузке данных')
      setHasMore(false)
    } finally {
      setLoading(false)
      isLoadingRef.current = false
    }
  }, [page, hasMore])

  // Initial load - только один раз при монтировании
  useEffect(() => {
    if (!initialLoadDoneRef.current) {
      initialLoadDoneRef.current = true
      loadMore()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !isLoadingRef.current) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [hasMore, loading, loadMore])

  const reset = useCallback(() => {
    setItems([])
    setPage(initialPage)
    setHasMore(true)
    setError(null)
    setLoading(false)
    isLoadingRef.current = false
    initialLoadDoneRef.current = false
  }, [initialPage])

  const reload = useCallback(() => {
    reset()
    // Используем setTimeout, чтобы reset успел выполниться
    setTimeout(() => {
      initialLoadDoneRef.current = false
      loadMore()
    }, 100)
  }, [reset, loadMore])

  return {
    items,
    loading,
    error,
    hasMore,
    observerTarget,
    reset,
    reload
  }
}
