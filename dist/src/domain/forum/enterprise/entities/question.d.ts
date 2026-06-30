import { QuestionAttachmentList } from "./question-attachment-list";
import { Slug } from "./value-objects/slug";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { AggregateRoot } from "../../../../core/entities/aggregate-root";
import { Optional } from "../../../../core/types/optional";
export interface QuestionProps {
    title: string;
    content: string;
    authorId: UniqueEntityID;
    slug: Slug;
    Attachments?: QuestionAttachmentList;
    bestAnswerId?: UniqueEntityID | undefined;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class Question extends AggregateRoot<QuestionProps> {
    get title(): string;
    set title(title: string);
    get content(): string;
    set content(content: string);
    get authorId(): UniqueEntityID;
    get slug(): Slug;
    get attachments(): QuestionAttachmentList | undefined;
    get bestAnswerId(): UniqueEntityID | undefined;
    get createdAt(): Date;
    get updatedAt(): Date | undefined;
    get isNew(): boolean;
    get exerpt(): string;
    private touch;
    set Attachment(Attachments: QuestionAttachmentList);
    set bestAnswerId(bestAnswerId: UniqueEntityID | undefined);
    static create(props: Optional<QuestionProps, "createdAt" | "slug" | "Attachments">, id?: UniqueEntityID): Question;
}
