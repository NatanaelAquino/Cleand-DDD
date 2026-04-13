import type { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerRequestUseCaseRequest {
  authorId: string
  AnswerId: string
}

interface DeleteAnswerResponseUseCaseResponse {}

export class DeleteAnswerUseCase {

  constructor(private AnswersRepository: AnswersRepository) { }

  async execute({
    authorId,
    AnswerId
  }: DeleteAnswerRequestUseCaseRequest): Promise<DeleteAnswerResponseUseCaseResponse> {
    const Answer = await this.AnswersRepository.findById(AnswerId)
    if (!Answer) {
      throw new Error('Answer not found')
    }

    if (Answer.authorId.toString() !== authorId) {
      throw new Error('You are not the author of this Answer')
    }

    await this.AnswersRepository.delete(Answer)

    return {}
  }


}

