import { right, type Either } from "@/core/types/either"
import type { QuestionComment } from "../../enterprise/entities/question-comment"
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository"

interface FetRecentQuestionsAnswerRequest {
  questionId: string
  page: number
}
type FetRecentQuestionsCommentResponse = Either<null, {
  questionComments: QuestionComment[]
}>

export class FetRecentQuestionsCommentUseCase {

  constructor(
    private QuestionCommentsRepository: QuestionCommentsRepository
  ) { }
  async execute({ page, questionId}: FetRecentQuestionsAnswerRequest): Promise<FetRecentQuestionsCommentResponse> {

    const questionComments = await this.QuestionCommentsRepository.findMyByQuestionId(questionId ,{page})

    return right({
      questionComments
    })
  }
}

