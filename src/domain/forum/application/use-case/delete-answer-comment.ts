import { NotAllowedError } from "../../../../core/erros/erros/not-allowed-error";
import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
import { Either, left, right } from "../../../../core/types/either";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository"




interface DeleteAnswerCommentRequestUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentResponseUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError  
, {}>

export class DeleteAnswerCommentUseCase {

  constructor(private AnswerCommentsRepository: AnswerCommentsRepository) { }

  async execute({
    authorId,
    answerCommentId
  }: DeleteAnswerCommentRequestUseCaseRequest): Promise<DeleteAnswerCommentResponseUseCaseResponse> {
    const answercomment = await this.AnswerCommentsRepository.findById(answerCommentId)

    if (!answercomment) {
      return left(new ResourceNotFoundError())
    }

    if (answercomment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.AnswerCommentsRepository.delete(answercomment)

    return right({})
  }
}

