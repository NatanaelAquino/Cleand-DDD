import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import type { Answer } from "@/domain/forum/enterprise/entities/Answer";



export class InMemoryAnswersRepository implements AnswersRepository {
    public items: Answer[] = []

    async create(answer: Answer) {
        this.items.push(answer)
    }
    async findById(id: string): Promise<Answer | null> {
        const Answer = this.items.find(Answer => Answer.id.toString() === id)
        return Answer || null
    }
    async delete(answer: Answer): Promise<void> {
        const answerIndex = this.items.findIndex(Answer => Answer.id === Answer.id)
        this.items.splice(answerIndex, 1)
    }
    async save(Answer: Answer): Promise<void> {
        const answerIndex = this.items.findIndex(Answer => Answer.id === Answer.id)
        this.items[answerIndex] = Answer
    }
    async findMyByQuestionId(questionId: string, {page}: PaginationParams): Promise<Answer[]> {
          const answers =
            this.items.filter(item => item.questionId.toString() ==questionId )
            .splice((page - 1) * 20, page * 20)
                
        return answers
    }
}