import { Entity } from "@/core/entities/entity"
import type { UniqueEntityID } from "@/core/entities/unique-entity-id"
import type { Optional } from "@/core/types/optional"

export interface AnswerCommentProps {
   authorId: UniqueEntityID
   answerId: UniqueEntityID
   content: string
   createdAt?: Date
   updatedAt?: Date
}
export class AnswerComment extends Entity<AnswerCommentProps> {
    get content() {
        return this.props.content
    }
    get answerId() {
        return this.props.answerId
    }

    get authorId() {
        return this.props.authorId
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }
    
    get exerpt(){
        return this.props.content.substring(0, 120).trimEnd().concat('...')
    }

    private touch(){
        this.props.updatedAt = new Date()
    }

    set content(content: string){
        this.props.content = content
        this.touch()
    }
    
    static create(props: Optional<AnswerCommentProps, 'createdAt' | 'updatedAt' >, id?: UniqueEntityID) {
    const answerComment = new AnswerComment({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }, id)
    return answerComment
  }

}

