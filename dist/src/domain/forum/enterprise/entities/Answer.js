"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
const answer_created_event_1 = require("./../../events/answer-created-event");
const answer_attachment_list_1 = require("./answer-attachment-list");
const aggregate_root_1 = require("../../../../core/entities/aggregate-root");
class Answer extends aggregate_root_1.AggregateRoot {
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
    touch() {
        this.props.updatedAt = new Date();
    }
    set content(content) {
        this.props.content = content;
        this.touch();
    }
    set questionId(questionId) {
        this.props.questionId = questionId;
        this.touch();
    }
    set attachments(attachments) {
        this.props.attachments = attachments;
        this.touch();
    }
    static create(props, id) {
        const answer = new Answer({
            ...props,
            attachments: props.attachments ?? new answer_attachment_list_1.AnswerAttachmentList(),
            createdAt: props.createdAt ?? new Date(),
        }, id);
        const isNewAnswer = !id;
        if (isNewAnswer)
            answer.addDomainEvent(new answer_created_event_1.AnswerCreatedEvent(answer));
        return answer;
    }
}
exports.Answer = Answer;
//# sourceMappingURL=Answer.js.map