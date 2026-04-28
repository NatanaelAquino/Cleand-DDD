import type { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";


export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
    public items: QuestionComment[] = []

    async create(questioncomment: QuestionComment) {
        this.items.push(questioncomment)
    }
    async delete(questioncomment: QuestionComment): Promise<void> {
        const questioncommentIndex = this.items.findIndex(item => item.id === questioncomment.id)
        this.items.splice(questioncommentIndex, 1)
    }
    async findById(questionCommentId: string): Promise<QuestionComment | null> {
        const questionComment = this.items.find(item => item.id.toString() === questionCommentId)
        return questionComment || null
    }
    async findMyByQuestionId(questionId: string, options: { page: number }): Promise<QuestionComment[]> {
        const questionComments = this.items.filter(item => item.questionId.toString() === questionId)
        const startIndex = (options.page - 1) * 20
        const endIndex = options.page * 20
        return questionComments.slice(startIndex, endIndex)
    }
}