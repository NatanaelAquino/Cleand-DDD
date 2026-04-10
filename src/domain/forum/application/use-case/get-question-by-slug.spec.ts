import { expect } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-momery-questions-repositories'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from '../../../../../test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('get question by slug', () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('create an question', async () => {

    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })
    inMemoryQuestionsRepository.create(newQuestion)
    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.slug.value).toEqual('example-question')


  })
})

