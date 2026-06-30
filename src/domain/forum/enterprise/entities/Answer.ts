import { AnswerCreatedEvent } from './../../events/answer-created-event';

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
export class Answer extends AggregateRoot<AnswerProps> {
  get content() {
    return this.props.content;
  }

  get questionId() {
    return this.props.questionId;
  }

  get authorId() {
    return this.props.authorId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get attachments() {
    return this.props.attachments;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get exerpt() {
    return this.props.content.substring(0, 120).trimEnd().concat("...");
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }
  set questionId(questionId: UniqueEntityID) {
    this.props.questionId = questionId;
    this.touch();
  }
  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments;
    this.touch();
  }
  static create(
    props: Optional<AnswerProps, "createdAt" | "attachments">,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer(
      {
        ...props,
        attachments: props.attachments ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    const isNewAnswer = !id
    if(isNewAnswer) answer.addDomainEvent(new AnswerCreatedEvent(answer))

    return answer;
  }
}
