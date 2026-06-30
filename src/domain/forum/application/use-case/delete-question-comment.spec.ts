import { NotAllowedError } from '@/core/erros/erros/not-allowed-error';
import { beforeEach, describe, expect, it } from 'vitest'
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

    const result = await sut.execute({
      authorId: 'different-author-id',
      questionCommentId: questionComment.id.toString()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})


