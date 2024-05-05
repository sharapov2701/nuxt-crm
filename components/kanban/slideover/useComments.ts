import { useQuery } from '@tanstack/vue-query'

export function useComments() {
  const store = useDealSlideStore()
  const config = useRuntimeConfig()
  const cardId = store.card?.id || ''

  return useQuery({
    queryKey: ['deal', cardId],
    queryFn: () => DB.getDocument(config.public.dbId, config.public.collectionDeals, cardId)
  })
}
