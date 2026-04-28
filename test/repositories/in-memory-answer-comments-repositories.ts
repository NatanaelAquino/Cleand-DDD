import { AnswerComment } from './../../src/domain/forum/enterprise/entities/Answer-comment';
import type { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";


export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
    public items: AnswerComment[] = []

    async create(answercomment: AnswerComment) {
        this.items.push(answercomment)
    }
    async delete(answercomment: AnswerComment): Promise<void> {
        const answercommentIndex = this.items.findIndex(item => item.id === answercomment.id)
        this.items.splice(answercommentIndex, 1)
    }
    async findById(id: string): Promise<AnswerComment | null> {
        const answerComment = this.items.find(item => item.id.toString() === id)
        return answerComment ?? null
    }
    async findMyByQuestionId(answerId: string, options: { page: number }): Promise<AnswerComment[]> {
        const questionComments = this.items.filter(item => item.answerId.toString() === answerId)
        const startIndex = (options.page - 1) * 20
        const endIndex = options.page * 20
        return questionComments.slice(startIndex, endIndex)
    }

    }