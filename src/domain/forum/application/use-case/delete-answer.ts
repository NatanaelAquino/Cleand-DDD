import { left, right, type Either } from "@/core/types/either";
import type { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";
import { NotAllowedError } from "./erros/not-allowed-error";

interface DeleteAnswerRequestUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerResponseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerUseCase {

  constructor(private AnswersRepository: AnswersRepository) { }

  async execute({
    authorId,
    answerId
  }: DeleteAnswerRequestUseCaseRequest): Promise<DeleteAnswerResponseUseCaseResponse> {
    const answer = await this.AnswersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.AnswersRepository.delete(answer)
    return right({})
  }
}

