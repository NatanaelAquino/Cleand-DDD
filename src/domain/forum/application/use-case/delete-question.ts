import { left, right, type Either } from "@/core/types/either";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";
import { NotAllowedError } from "./erros/not-allowed-error";

interface DeleteQuestionRequestUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionResponseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteQuestionUseCase {

  constructor(private QuestionsRepository: QuestionsRepository) { }

  async execute({
    authorId,
    questionId
  }: DeleteQuestionRequestUseCaseRequest): Promise<DeleteQuestionResponseUseCaseResponse> {
    const question = await this.QuestionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.QuestionsRepository.delete(question)

    return right({})
  }


}

