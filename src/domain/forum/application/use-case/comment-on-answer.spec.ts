import { expect } from 'vitest'

import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-momery-answers-repositories'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answer-comments-repositories'
import { AnswerCommentUseCase } from './comment-on-answer';
import { makeAnswer } from '../../../../../test/factories/make-answer'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: AnswerCommentUseCase

describe('Comment on answer', () => {

  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new AnswerCommentUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository
    )
  })

  it('Should be able to comment on a answer', async () => {

    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'Comentário teste'
    })

    expect(inMemoryAnswerCommentRepository.items[0]?.content).toEqual('Comentário teste')
  })


})

