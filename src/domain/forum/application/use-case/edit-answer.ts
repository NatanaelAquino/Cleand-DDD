import { left, right, type Either } from "@/core/types/either";
import type { Answer } from "../../enterprise/entities/Answer";
import type { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";
import { NotAllowedError } from "./erros/not-allowed-error";

interface EditAnswerRequestUseCaseRequest {
  authorId: string
  AnswerId: string
  content: string
}

type EditAnswerResponseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,
  {
    Answer: Answer
  }
>
export class EditAnswerUseCase {

  constructor(private AnswerRepository: AnswersRepository) { }

  async execute({
    authorId,
    AnswerId,
    content
  }: EditAnswerRequestUseCaseRequest): Promise<EditAnswerResponseUseCaseResponse> {
    const Answer = await this.AnswerRepository.findById(AnswerId)

    if (!Answer) {
      return left(new ResourceNotFoundError())
    }

    if (Answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    Answer.content = content

    await this.AnswerRepository.save(Answer)

    return right({
      Answer
    })
  }


}

