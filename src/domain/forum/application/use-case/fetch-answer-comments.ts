import { right, type Either } from "@/core/types/either"
import type { AnswerComment } from "../../enterprise/entities/Answer-comment"
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository"

interface FetRecentAnswerAnswerRequest {
  answerId: string
  page: number
}
type FetRecentAnswerCommentResponse = Either<null, {
  questionAnswers: AnswerComment[]
}>

export class FetRecentAnswerCommentUseCase {

  constructor(
    private QuestionAnswersRepository: AnswerCommentsRepository
  ) { }
  async execute({ page, answerId }: FetRecentAnswerAnswerRequest): Promise<FetRecentAnswerCommentResponse> {

    const questionAnswers = await this.QuestionAnswersRepository.findMyByQuestionId(answerId, { page })

    return right({
      questionAnswers
    })
  }
}

