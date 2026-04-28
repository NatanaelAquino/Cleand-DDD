import { Entity } from "@/core/entities/entity"
import type { UniqueEntityID } from "@/core/entities/unique-entity-id"
import type { Optional } from "@/core/types/optional"

export interface QuestionCommetnProps {
    authorId: UniqueEntityID
    questionId: UniqueEntityID
    content: string
    updatedAt: Date
}
export class QuestionComment extends Entity<QuestionCommetnProps> {
    get content() {
        return this.props.content
    }

    get authorId() {
        return this.props.authorId
    }

    get updatedAt() {
        return this.props.updatedAt
    }
    get questionId() {
        return this.props.questionId
    }

    get exerpt() {
        return this.props.content.substring(0, 120).trimEnd().concat('...')
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }

    static create(props: Optional<QuestionCommetnProps, 'updatedAt'>, id?: UniqueEntityID) {
        const questionComment = new QuestionComment({
            ...props,
            updatedAt: props.updatedAt ?? new Date(),
        }, id)
        return questionComment
    }

}

