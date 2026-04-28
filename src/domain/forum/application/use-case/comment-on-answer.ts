import type { AnswerCommentsRepository } from './../repositories/answer-comments-repository';
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { AnswersRepository } from "../repositories/answers-repository";
import { AnswerComment } from '../../enterprise/entities/Answer-comment';
import { left, type Either, right } from '@/core/types/either';
import { ResourceNotFoundError } from './erros/resource-not-found-error';

interface AnswerCommentRequestUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type AnswerCommentResponseUseCaseResponse = Either<ResourceNotFoundError, {
  answerComment: AnswerComment
}>

export class AnswerCommentUseCase {

  constructor(
    private AnswersRepository: AnswersRepository,
    private AnswerCommentsRepository: AnswerCommentsRepository

  ) { }

  async execute({
    authorId,
    answerId,
    content
  }: AnswerCommentRequestUseCaseRequest): Promise<AnswerCommentResponseUseCaseResponse> {

    const answer = await this.AnswersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.AnswerCommentsRepository.create(answerComment)

    return right({
      answerComment
    })
  }


}

