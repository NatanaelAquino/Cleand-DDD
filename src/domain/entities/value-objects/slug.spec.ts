import { test, expect } from 'vitest'
import { Slug } from './slug'

test('create a slug from text', () => {
  const slug = Slug.create('Hello World')
  expect(slug.value).toEqual('hello-world')
})