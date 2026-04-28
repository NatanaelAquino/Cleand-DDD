import { expect } from 'vitest'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments-repositories'
import { FetRecentQuestionsCommentUseCase } from './fetch-question-comments'
import { makeQuestionComment } from '../../../../../test/factories/make-question-comment'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository
let sut: FetRecentQuestionsCommentUseCase

describe('Fetch recent questions QuestionComment', () => {

  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetRecentQuestionsCommentUseCase(inMemoryQuestionCommentRepository)
  })

  it('Should be able to fetch questions comments', async () => {

    await inMemoryQuestionCommentRepository.create(makeQuestionComment(
      { questionId: new UniqueEntityID('1') }
    ))
    await inMemoryQuestionCommentRepository.create(makeQuestionComment(
      { questionId: new UniqueEntityID('1') }
    ))
    await inMemoryQuestionCommentRepository.create(makeQuestionComment(
      { questionId: new UniqueEntityID('1') }
    ))

    const { questionComments } = await sut.execute({
      page: 1,
      questionId: '1'
    })

    expect(questionComments).toHaveLength(3)

  })

  it('Should be able to fetch paginated  questions comments ', async () => {

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentRepository.create(makeQuestionComment(
        { questionId: new UniqueEntityID('1') }
      ))
    }

    const { questionComments } = await sut.execute({
      page: 2,
      questionId: "1"
    })

    expect(questionComments).toHaveLength(2)

  })

  
})

