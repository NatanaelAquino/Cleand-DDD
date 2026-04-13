import { expect } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-momery-questions-repositories'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('delete Question', () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('delete an question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID("1"),
    }, new UniqueEntityID("question-1"))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: '1',
      questionId: "question-1",
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)


  })

  it('Should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID("2"),
    }, new UniqueEntityID("question-1"))

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        authorId: '3',
        questionId: "question-1",
      })
    }).rejects.toBeInstanceOf(Error)

  })
})

