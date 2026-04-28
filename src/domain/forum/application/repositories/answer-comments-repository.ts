import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { AnswerComment } from "../../enterprise/entities/Answer-comment";

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  findMyByQuestionId(questionId: string, params: PaginationParams): Promise<AnswerComment []>
}

