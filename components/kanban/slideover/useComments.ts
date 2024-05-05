import { useQuery } from '@tanstack/vue-query'

export function useComments() {
  const store = useDealSlideStore()
  const cardId = store.card?.id || ''

  return useQuery({
    queryKey: ['deal', cardId],
    queryFn: () => DB.getDocument(import.meta.env.DB_ID, import.meta.env.COLLECTION_DEALS, cardId)
  })
}
