import { expect } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-momery-answers-repositories'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('delete answer', () => {

  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('delete an answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID("1"),
    }, new UniqueEntityID("AnswernewAnswer-1"))

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      authorId: '1',
      AnswerId: "1",
    })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)


  })

  it('Should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID("2"),
    }, new UniqueEntityID("1"))

    await inMemoryAnswerRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: '3',
        AnswerId: "1",
      })
    }).rejects.toBeInstanceOf(Error)

  })
})

