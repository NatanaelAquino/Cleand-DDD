import type { QuestionCommentsRepository } from './../repositories/question-comments-repository';
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { ResourceNotFoundError } from './erros/resource-not-found-error';
import { left, right, type Either } from '@/core/types/either';

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

