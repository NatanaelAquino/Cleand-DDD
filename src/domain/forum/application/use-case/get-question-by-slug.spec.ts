import { InMemoryQuestionAttachmentsRepository } from './../../../../../test/repositories/in-memory-question-attachments-repository';
import { expect } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repositories'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from '../../../../../test/factories/make-question'


let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository;

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('get question by slug', () => {

  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentsRepository
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('create an question', async () => {

    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })
    inMemoryQuestionsRepository.create(newQuestion)
    const result = await sut.execute({
      slug: 'example-question',
    })


  
    expect(result.value).toMatchObject({
     question: expect.objectContaining({
        title: newQuestion.title,
      }),
    })


  })
})

