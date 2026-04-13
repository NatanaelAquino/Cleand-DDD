import { expect } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-momery-questions-repositories'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Edit an question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID("1"),
    }, new UniqueEntityID("question-1"))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: '1',
      questionId: "question-1",
      title: 'nova edit',
      content: 'NOVA EDIT',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
        title: 'nova edit',
        content: 'NOVA EDIT',
      })
  })

  it('Should not be able to Edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID("2"),
    }, new UniqueEntityID("question-1"))

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        authorId: '3',
        questionId: "question-1",
        title: 'nova edit',
        content: 'NOVA EDIT',
      })
    }).rejects.toBeInstanceOf(Error)

  })
})

