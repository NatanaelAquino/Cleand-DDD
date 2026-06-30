import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Optional } from "../../../../core/types/optional";
export interface QuestionCommetnProps {
    authorId: UniqueEntityID;
    questionId: UniqueEntityID;
    content: string;
    updatedAt: Date;
}
export declare class QuestionComment extends Entity<QuestionCommetnProps> {
    get content(): string;
    get authorId(): UniqueEntityID;
    get updatedAt(): Date;
    get questionId(): UniqueEntityID;
    get exerpt(): string;
    private touch;
    set content(content: string);
    static create(props: Optional<QuestionCommetnProps, 'updatedAt'>, id?: UniqueEntityID): QuestionComment;
}
