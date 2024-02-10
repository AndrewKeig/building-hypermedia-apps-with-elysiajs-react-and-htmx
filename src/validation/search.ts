import { t } from 'elysia'

export const searchValidation = {
  query: t.Object({
    search: t.String({ minLength: 2, maxLength: 10 })
  }),
}
