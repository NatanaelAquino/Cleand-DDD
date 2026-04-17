import { expect } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-momery-answers-repositories'
import { FetRecentQuestionsAnserUseCase } from './fetch-question-answer'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetRecentQuestionsAnserUseCase

describe('Fetch recent questions Answers', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetRecentQuestionsAnserUseCase(inMemoryAnswersRepository)
  })

  it('Should be able to fetch questions answer', async () => {

    await inMemoryAnswersRepository.create(makeAnswer(
      { questionId: new UniqueEntityID('1') }
    ))
    await inMemoryAnswersRepository.create(makeAnswer(
      { questionId: new UniqueEntityID('1') }
    ))
    await inMemoryAnswersRepository.create(makeAnswer(
      { questionId: new UniqueEntityID('1') }
    ))

    const { answer } = await sut.execute({
      page: 1,
      questionId: '1'
    })

    expect(answer).toHaveLength(3)

  })

  it('Should be able to fetch paginated  questions answer', async () => {

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(makeAnswer(
        { questionId: new UniqueEntityID('1') }
      ))
    }

    const { answer } = await sut.execute({
      page: 2,
      questionId: "1"
    })

    expect(answer).toHaveLength(2)

  })

  
})

