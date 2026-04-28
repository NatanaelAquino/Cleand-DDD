import { expect } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-momery-answers-repositories'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('Edit an Answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID("1"),
    }, new UniqueEntityID("Answer-1"))

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: '1',
      AnswerId: "Answer-1",
      content: 'NOVA EDIT',
    })

    expect(inMemoryAnswersRepository.items[0]).toStrictEqual(result.Answer)
  })

  it('Should not be able to Edit a Answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID("2"),
    }, new UniqueEntityID("Answer-1"))

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: '3',
        AnswerId: "Answer-1",
        content: 'NOVA EDIT',
      })
    }).rejects.toBeInstanceOf(Error)

  })
})

