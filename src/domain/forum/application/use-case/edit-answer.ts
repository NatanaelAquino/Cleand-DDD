import { AnswerAttachmentList } from './../../enterprise/entities/answer-attachment-list';
import { Either, left, right } from "../../../../core/types/either";
import type { Answer } from "../../enterprise/entities/Answer";
import type { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
import { NotAllowedError } from "../../../../core/erros/erros/not-allowed-error";
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import { AnswerAttachmentsRepository } from '../repositories/answers-attachments-repository';

interface EditAnswerRequestUseCaseRequest {
  authorId: string
  AnswerId: string
  content: string
  AttachmentsIds: string[]
}

type EditAnswerResponseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,
  {
    Answer: Answer
  }
>
export class EditAnswerUseCase {

  constructor(

    private AnswerRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) { }

  async execute({
    authorId,
    AnswerId,
    content,
    AttachmentsIds
  }: EditAnswerRequestUseCaseRequest): Promise<EditAnswerResponseUseCaseResponse> {
    const Answer = await this.AnswerRepository.findById(AnswerId)

    if (!Answer) {
      return left(new ResourceNotFoundError())
    }

    if (Answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(AnswerId)

    const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments)

    const answerAttachment = AttachmentsIds?.map(attachmentId => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: Answer.id
      })
    })
    
    answerAttachmentList.update(answerAttachment)
    Answer.attachments = answerAttachmentList
    Answer.content = content

    await this.AnswerRepository.save(Answer)

    return right({
      Answer
    })
  }


}

