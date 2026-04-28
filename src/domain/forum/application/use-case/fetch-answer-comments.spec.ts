import { expect } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answer-comments-repositories'

import { FetRecentAnswerCommentUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from '../../../../../test/factories/make-answer-comment'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository
let sut: FetRecentAnswerCommentUseCase

describe('Fetch recent answers AnswerComment', () => {

  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetRecentAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })

  it('Should be able to fetch answers comments', async () => {

    await inMemoryAnswerCommentRepository.create(makeAnswerComment(
      { answerId: new UniqueEntityID('1') }
    ))
    await inMemoryAnswerCommentRepository.create(makeAnswerComment(
      { answerId: new UniqueEntityID('1') }
    ))
    await inMemoryAnswerCommentRepository.create(makeAnswerComment(
      { answerId: new UniqueEntityID('1') }
    ))

    const { questionAnswers  } = await sut.execute({
      page: 1,
      answerId: '1'
    })

    expect(questionAnswers).toHaveLength(3)

  })

  it('Should be able to fetch paginated  answers comments ', async () => {

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(makeAnswerComment(
        { answerId: new UniqueEntityID('1') }
      ))
    }

    const { questionAnswers  } = await sut.execute({
      page: 2,
      answerId: "1"
    })

    expect(questionAnswers).toHaveLength(2)

  })

  
})

