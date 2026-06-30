import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Entity } from "../../../../core/entities/entity";
import { Optional } from "../../../../core/types/optional";
export interface AnswerCommentProps {
    authorId: UniqueEntityID;
    answerId: UniqueEntityID;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class AnswerComment extends Entity<AnswerCommentProps> {
    get content(): string;
    get answerId(): UniqueEntityID;
    get authorId(): UniqueEntityID;
    get createdAt(): Date | undefined;
    get updatedAt(): Date | undefined;
    get exerpt(): string;
    private touch;
    set content(content: string);
    static create(props: Optional<AnswerCommentProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID): AnswerComment;
}
