import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { Answer } from "@/domain/forum/enterprise/entities/Answer";

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  delete(Answer: Answer): Promise<void>
  save(Answer: Answer): Promise<void>
  findMyByQuestionId(questionId: string, params: PaginationParams): Promise<Answer []>
}

