import { InMemoryQuestionAttachmentsRepository } from './../../../../../test/repositories/in-memory-question-attachments-repository';
import { expect } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repositories'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionAttachment } from '../../../../../test/factories/make-question-attachment';




let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {

  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepository)
  })

  it('Edit an question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID("1"),
    }, new UniqueEntityID("question-1"))

    await inMemoryQuestionsRepository.create(newQuestion)

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: newQuestion.authorId.toValue(),
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
      AttachmentsIds: ['1', '3'],
    })

    const question = inMemoryQuestionsRepository.items[0]!

    expect(question).toMatchObject({
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
    })

    expect(question.attachments!.currentItems).toHaveLength(2)
    expect(question.attachments!.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ])

  })
})

