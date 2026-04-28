import { expect } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments-repositories'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from '../../../../../test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository

let sut: DeleteQuestionCommentUseCase

describe('delete QuestionComment', () => {

  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('delete an question comment', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(questionComment)

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString()
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)

  })

  it('should not delete a question comment if the author is not the owner', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(questionComment)

    await expect(() =>
      sut.execute({
        authorId: 'different-author-id',
        questionCommentId: questionComment.id.toString()
      })
    ).rejects.toThrow()

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1)
 

  })
})


