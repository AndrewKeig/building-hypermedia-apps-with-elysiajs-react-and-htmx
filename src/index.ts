import { Elysia, t } from 'elysia'
import { html } from '@elysiajs/html'
import { Index } from './api'

export const app = new Elysia()
  .use(html())
  .get("/", Index)
  .listen(3000)

export type App = typeof app
