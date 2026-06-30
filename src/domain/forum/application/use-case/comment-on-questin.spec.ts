import { expect } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repositories'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments-repositories'
import { QuestionCommentUseCase } from './comment-on-question'
import { InMemoryQuestionAttachmentsRepository } from '../../../../../test/repositories/in-memory-question-attachments-repository';

let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository;

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: QuestionCommentUseCase

describe('Comment on question', () => {

  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsRepository()
    inMemoryQuestionsAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentsRepository
    )
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

