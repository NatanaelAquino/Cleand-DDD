import type { QuestionsRepository } from "../repositories/questions-repository";

interface DeleteQuestionRequestUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionResponseUseCaseResponse {}

export class DeleteQuestionUseCase {

  constructor(private QuestionsRepository: QuestionsRepository) { }

  async execute({
    authorId,
    questionId
  }: DeleteQuestionRequestUseCaseRequest): Promise<DeleteQuestionResponseUseCaseResponse> {
    const question = await this.QuestionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('You are not the author of this question')
    }

    await this.QuestionsRepository.delete(question)

    return {}
  }


}

