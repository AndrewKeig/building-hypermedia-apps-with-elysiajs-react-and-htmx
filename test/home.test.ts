import { Home } from '../src/components/home'
import { Layout } from '../src/components/layout'
import { app } from '../src/index'
import { describe, expect, it } from 'bun:test'

describe('Home', () => {
  it('should render home page', async () => {
    const title = 'These are not the droids you are looking for'
    const expected = Layout({ title, children: Home({ title }) })
    const response = await app
      .handle(new Request('http://localhost'))
      .then((res) => res.text())

    expect(response).toBe(expected.toString())
  })
})
