import type { Answer } from "../../enterprise/entities/Answer"
import type { AnswersRepository } from "../repositories/answers-repository"

interface FetRecentQuestionsAnswerRequest {
  questionId: string
  page: number
}
interface FetRecentQuestionsAnserResponse {
  answer: Answer[]
}

export class FetRecentQuestionsAnserUseCase {

  constructor(
    private answerRespository: AnswersRepository
  ) { }
  async execute({ page, questionId}: FetRecentQuestionsAnswerRequest): Promise<FetRecentQuestionsAnserResponse> {

    const answer = await this.answerRespository.findMyByQuestionId(questionId ,{page})

    return {
      answer
    }
  }
}

