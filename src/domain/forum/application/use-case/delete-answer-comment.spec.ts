import { expect } from 'vitest'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answer-comments-repositories'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from '../../../../../test/factories/make-answer-comment'


let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository

let sut: DeleteAnswerCommentUseCase

describe('delete AnswerComment', () => {

  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('delete an answer comment', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString()
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)

  })

  it('should not delete a an answer comment if the author is not the owner', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await expect(() =>
      sut.execute({
        authorId: 'different-author-id',
        answerCommentId: answerComment.id.toString()
      })
    ).rejects.toThrow()

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(1)
 

  })
})


