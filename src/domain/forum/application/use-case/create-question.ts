import { QuestionAttachment } from './../../enterprise/entities/question-attachment';
import { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list';
import { Either,  right } from "../../../../core/types/either";
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

interface CreateQuestionRequestUseCaseRequest {
  authorId: string
  title: string
  content: string
  AttachmentIds: string[]
}

type CreateQuestionResponseUseCaseResponse = Either<null, {
  question: Question
}>

export class CreateQuestionUseCase {

  constructor(private QuestionsRepository: QuestionsRepository) { }

  async execute({
    authorId,
    title,
    content,
    AttachmentIds
  }: CreateQuestionRequestUseCaseRequest): Promise<CreateQuestionResponseUseCaseResponse> {

    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    const questionAttachment = AttachmentIds.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id
      })
    })

    question.Attachment = new QuestionAttachmentList(questionAttachment)

    await this.QuestionsRepository.create(question)

    return right({
      question
    })
  }


}

