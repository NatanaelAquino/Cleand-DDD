import { Question } from './../../enterprise/entities/question';
import type { QuestionsRepository } from "../repositories/questions-repository";

import type { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { Either, left, right } from '../../../../core/types/either';
import { ResourceNotFoundError } from '../../../../core/erros/erros/resource-not-found-error';
import { NotAllowedError } from '../../../../core/erros/erros/not-allowed-error';

interface EditQuestionRequestUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  AttachmentsIds?: string[]
}

type EditQuestionResponseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
  question: Question
}>

export class EditQuestionUseCase {

  constructor(
    private QuestionsRepository: QuestionsRepository,
    private QuestionAttachmentsRepository: QuestionAttachmentsRepository,

  ) { }

  async execute({
    authorId,
    questionId,
    title,
    content,
    AttachmentsIds
  }: EditQuestionRequestUseCaseRequest): Promise<EditQuestionResponseUseCaseResponse> {
    const question = await this.QuestionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments = await this.QuestionAttachmentsRepository.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

    const questionAttachment = AttachmentsIds?.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId:  new UniqueEntityID(attachmentId),
        questionId: question.id
      })
    })
    
    questionAttachmentList.update(questionAttachment ?? [])
    question.Attachment = questionAttachmentList

    question.title = title
    question.content = content
    question.Attachment = questionAttachmentList

    await this.QuestionsRepository.save(question)

    return right({
      question
    })
  }


}

