import type { QuestionCommentsRepository } from './../repositories/question-comments-repository';
import type { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { Either, left, right } from "../../../../core/types/either";
import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

interface QuestionCommentRequestUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type QuestionCommentResponseUseCaseResponse = Either<ResourceNotFoundError, {
  questionComment: QuestionComment
}>

export class QuestionCommentUseCase {

  constructor(
    private QuestionsRepository: QuestionsRepository,
    private QuestionCommentsRepository: QuestionCommentsRepository

  ) { }

  async execute({
    authorId,
    questionId,
    content
  }: QuestionCommentRequestUseCaseRequest): Promise<QuestionCommentResponseUseCaseResponse> {

    const question = await this.QuestionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.QuestionCommentsRepository.create(questionComment)

    return right({
      questionComment
    })
  }


}

