import { expect } from 'vitest'

import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-momery-questions-repositories'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments-repositories'
import { QuestionCommentUseCase } from './comment-on-question'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: QuestionCommentUseCase

describe('Comment on question', () => {

  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new QuestionCommentUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository
    )
  })

  it('Should be able to comment on a question', async () => {

    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'Comentário teste'
    })

    expect(inMemoryQuestionCommentRepository.items[0]?.content).toEqual('Comentário teste')
  })


})

