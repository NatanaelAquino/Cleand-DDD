import { NotAllowedError } from "../../../../core/erros/erros/not-allowed-error";
import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
import { Either, left, right } from "../../../../core/types/either";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository"




interface DeleteQuestionCommentRequestUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentResponseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteQuestionCommentUseCase {

  constructor(private QuestionCommentsRepository: QuestionCommentsRepository) { }

  async execute({
    authorId,
    questionCommentId
  }: DeleteQuestionCommentRequestUseCaseRequest): Promise<DeleteQuestionCommentResponseUseCaseResponse> {
    const questioncomment = await this.QuestionCommentsRepository.findById(questionCommentId)

    if (!questioncomment) {
      return left(new ResourceNotFoundError())
    }

    if (questioncomment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.QuestionCommentsRepository.delete(questioncomment)

    return right({})
  }


}

