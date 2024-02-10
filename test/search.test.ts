import { app } from '../src/index'
import { describe, expect, it } from 'bun:test'
import { CharacterList } from '../src/components/characterList'
import { people } from './fixtures/people'

describe('Search', () => {
  it('should perform a search', async () => {
    const expected = CharacterList({ count: people.count, results: people.results, query: 'luke' })
    const response = await app
      .handle(new Request('http://localhost/search?search=luke'))
      .then((res) => res.text())
    expect(response).toBe(expected.toString())
  })
})
