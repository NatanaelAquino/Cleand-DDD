import type { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import type { Question } from "@/domain/forum/enterprise/entities/question";



export class InMemoryQuestionsRepository implements QuestionsRepository {
    public items: Question[] = []

    async create(question: Question) {
        this.items.push(question)
    }
    async findBySlug(slug: string): Promise<Question | null> {
        const question = this.items.find(question => question.slug.value === slug)
        return question || null
    }
    async findById(id: string): Promise<Question | null> {
        const question = this.items.find(question => question.id.toString() === id)
        return question || null
    }
    async delete(question: Question): Promise<void> {
        const questionIndex = this.items.findIndex(question => question.id === question.id)
        this.items.splice(questionIndex, 1)
    }
}