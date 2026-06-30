import { InMemoryAnswerAttachmentsRepository } from './../../../../../test/repositories/in-memory-answer-attachments-repository';
import { expect } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repositories'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repositories'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/erros/erros/not-allowed-error';
import { InMemoryQuestionAttachmentsRepository } from '../../../../../test/repositories/in-memory-question-attachments-repository';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository;

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose question best answer', () => {

  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryQuestionsAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    )
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentsRepository
    )
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
    
    const result = await sut.execute({
        answerId: answer.id.toString(),
        authorId: '2',
      })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

  })
})

