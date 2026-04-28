import { Question } from './../../enterprise/entities/question';
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { left, right, type Either } from '@/core/types/either';
import { ResourceNotFoundError } from './erros/resource-not-found-error';
import { NotAllowedError } from './erros/not-allowed-error';


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

