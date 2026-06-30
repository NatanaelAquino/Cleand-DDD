import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
import type { QuestionsRepository } from "../repositories/questions-repository";

import { Either, left, right } from "../../../../core/types/either";
import { NotAllowedError } from "../../../../core/erros/erros/not-allowed-error";


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

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.QuestionsRepository.delete(question)

    return right({})
  }


}

