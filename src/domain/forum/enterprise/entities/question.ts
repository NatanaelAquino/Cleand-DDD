import { QuestionAttachmentList } from "./question-attachment-list";
import { Slug } from "./value-objects/slug";

import dayjs, { unix } from "dayjs";
import { QuestionBestAnswerChosenEvent } from "../../events/question-best-answer-chosen-event";
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
export class Question extends AggregateRoot<QuestionProps> {
  get title() {
    return this.props.title;
  }
  set title(title: string) {
    this.props.title = title;
    this.touch();
  }

  get content() {
    return this.props.content;
  }
  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  get authorId() {
    return this.props.authorId;
  }

  get slug() {
    return this.props.slug;
  }
  get attachments() {
    return this.props.Attachments;
  }
  get bestAnswerId(): UniqueEntityID | undefined {
    return this.props.bestAnswerId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get isNew(): boolean {
    return dayjs().diff(this.props.createdAt, "days") <= 3;
  }
  get exerpt() {
    return this.props.content.substring(0, 120).trimEnd().concat("...");
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set Attachment(Attachments: QuestionAttachmentList) {
    this.props.Attachments = Attachments;
    this.touch();
  }
  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
   if (bestAnswerId === undefined) {
      return
    }
    if (this.props.bestAnswerId === undefined || !bestAnswerId.equals(this.props.bestAnswerId)) {
      this.addDomainEvent(new QuestionBestAnswerChosenEvent(this, bestAnswerId))
    }

    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }
  static create(
    props: Optional<QuestionProps, "createdAt" | "slug" | "Attachments">,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.create(props.title),
        Attachments: props.Attachments ?? new QuestionAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return question;
  }
}
