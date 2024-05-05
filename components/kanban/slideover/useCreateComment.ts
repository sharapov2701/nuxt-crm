import { v4 as uuid } from 'uuid'
import { useMutation } from '@tanstack/vue-query'

export function useCreateComment({ refetch }: { refetch: () => void }) {
  const store = useDealSlideStore()
  const config = useRuntimeConfig()
  const comment = ref<string>()

  const { mutate } = useMutation({
    mutationKey: ['add comments', comment.value],
    mutationFn: () =>
      DB.createDocument(config.public.dbId, config.public.collectionComments, uuid(), {
        text: comment.value,
        deal: store.card?.id
      }),
    onSuccess: () => {
      refetch()
      comment.value = ''
    }
  })

  const writeComment = () => {
    if (!comment.value) return
    mutate()
  }

  return {
    writeComment,
    comment
  }
}
