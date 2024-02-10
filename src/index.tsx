import { Elysia, t } from 'elysia'
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { Search } from './api/search'
import { Index } from './api'
import { searchValidation } from './validation/search'

export const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get("/", Index)
  .get('/search', Search, { ...searchValidation })
  .listen(3000)

export type App = typeof app
