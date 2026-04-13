<<<<<<< HEAD
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
=======
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
>>>>>>> 453d5ff9b4fbd657cd723705b7e4c8a3c2c1b656

    return {}
  }


}

