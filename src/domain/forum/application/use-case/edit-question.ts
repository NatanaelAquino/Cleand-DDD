import { title } from "process";
import type { QuestionsRepository } from "../repositories/questions-repository";

interface EditQuestionRequestUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionResponseUseCaseResponse {}

export class EditQuestionUseCase {

  constructor(private QuestionsRepository: QuestionsRepository) { }

  async execute({
    authorId,
    questionId,
    title,
    content
  }: EditQuestionRequestUseCaseRequest): Promise<EditQuestionResponseUseCaseResponse> {
    const question = await this.QuestionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('You are not the author of this question')
    }

    question.title  = title 

    question.content = content 

    await this.QuestionsRepository.save(question)

    return {}
  }


}

