import { AnswerAttachmentList } from "./answer-attachment-list";
import { AggregateRoot } from '../../../../core/entities/aggregate-root';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { Optional } from '../../../../core/types/optional';
export interface AnswerProps {
    content: string;
    questionId: UniqueEntityID;
    authorId: UniqueEntityID;
    attachments: AnswerAttachmentList;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class Answer extends AggregateRoot<AnswerProps> {
    get content(): string;
    get questionId(): UniqueEntityID;
    get authorId(): UniqueEntityID;
    get createdAt(): Date;
    get attachments(): AnswerAttachmentList;
    get updatedAt(): Date | undefined;
    get exerpt(): string;
    private touch;
    set content(content: string);
    set questionId(questionId: UniqueEntityID);
    set attachments(attachments: AnswerAttachmentList);
    static create(props: Optional<AnswerProps, "createdAt" | "attachments">, id?: UniqueEntityID): Answer;
}
