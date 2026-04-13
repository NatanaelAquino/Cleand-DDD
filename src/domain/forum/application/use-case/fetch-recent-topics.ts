import type { Question } from "../../enterprise/entities/question"
import type { QuestionsRepository } from "../repositories/questions-repository"

interface FetRecentQuestionsRequest {
  page: number
}
interface FetRecentQuestionsResponse {
  question: Question[]
}

export class FetRecentQuestionsUseCase {

  constructor(
    private questionsRepository: QuestionsRepository
  ) { }
  async execute({ page }: FetRecentQuestionsRequest): Promise<FetRecentQuestionsResponse> {

    const question = await this.questionsRepository.findManyRecent({page})

    return {
      question
    }
  }
}

