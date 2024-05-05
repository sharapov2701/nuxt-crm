import { v4 as uuid } from 'uuid'
import { useMutation } from '@tanstack/vue-query'

import { COLLECTION_COMMENTS, DB_ID } from '~/app.constants'

export function useCreateComment({ refetch }: { refetch: () => void }) {
  const store = useDealSlideStore()
  const comment = ref<string>()

  const { mutate } = useMutation({
    mutationKey: ['add comments', comment.value],
    mutationFn: () =>
      DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuid(), {
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
