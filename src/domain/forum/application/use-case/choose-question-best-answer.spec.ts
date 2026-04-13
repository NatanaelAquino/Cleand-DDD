import { expect } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-momery-answers-repositories'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-momery-questions-repositories'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose question best answer', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryAnswersRepository, inMemoryQuestionRepository)
  })

  it('Should be able to choose the question best answer', async () => {

    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id
    })
    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })
    expect(inMemoryQuestionRepository.items[0]?.bestAnswerId).toEqual(answer.id)

  })

  it('Should not be able to choose another user question best answer', async () => {

    const question = makeQuestion(
      {
        authorId: new UniqueEntityID('1')
      }
    )
    const answer = makeAnswer({
      questionId: question.id
    })
    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswersRepository.create(answer)


    expect(async () => {
      return await sut.execute({
        answerId: answer.id.toString(),
        authorId: '2',
      })
    }).rejects.toBeInstanceOf(Error)

  })
})

