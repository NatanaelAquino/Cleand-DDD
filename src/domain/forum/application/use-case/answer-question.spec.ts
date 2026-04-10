import { expect } from 'vitest'
import { AnswerQuestionUseCase   } from './answer-question'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-momery-answers-repositories'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut:  AnswerQuestionUseCase

describe('create Question', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('create an question', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova pergunta',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0]?.id).toEqual(answer.id)  

  })
})

