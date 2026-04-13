import type { Answer } from "../../enterprise/entities/Answer";
import type { AnswersRepository } from "../repositories/answers-repository";

interface EditAnswerRequestUseCaseRequest {
  authorId: string
  AnswerId: string
  content: string
}

interface EditAnswerResponseUseCaseResponse {
  Answer: Answer
}

export class EditAnswerUseCase {

  constructor(private AnswerRepository: AnswersRepository) { }

  async execute({
    authorId,
    AnswerId,
    content
  }: EditAnswerRequestUseCaseRequest): Promise<EditAnswerResponseUseCaseResponse> {
    const Answer = await this.AnswerRepository.findById(AnswerId)

    if (!Answer) {
      throw new Error('Answer not found')
    }

    if (Answer.authorId.toString() !== authorId) {
      throw new Error('You are not the author of this Answer')
    }

    Answer.content = content 

    await this.AnswerRepository.save(Answer)

    return {
      Answer 
    }
  }


}

