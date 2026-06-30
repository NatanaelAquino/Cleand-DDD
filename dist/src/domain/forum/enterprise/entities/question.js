"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const question_attachment_list_1 = require("./question-attachment-list");
const slug_1 = require("./value-objects/slug");
const dayjs_1 = __importDefault(require("dayjs"));
const question_best_answer_chosen_event_1 = require("../../events/question-best-answer-chosen-event");
const aggregate_root_1 = require("../../../../core/entities/aggregate-root");
class Question extends aggregate_root_1.AggregateRoot {
    get title() {
        return this.props.title;
    }
    set title(title) {
        this.props.title = title;
        this.touch();
    }
    get content() {
        return this.props.content;
    }
    set content(content) {
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
    get bestAnswerId() {
        return this.props.bestAnswerId;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get isNew() {
        return (0, dayjs_1.default)().diff(this.props.createdAt, "days") <= 3;
    }
    get exerpt() {
        return this.props.content.substring(0, 120).trimEnd().concat("...");
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    set Attachment(Attachments) {
        this.props.Attachments = Attachments;
        this.touch();
    }
    set bestAnswerId(bestAnswerId) {
        if (bestAnswerId === undefined) {
            return;
        }
        if (this.props.bestAnswerId === undefined || !bestAnswerId.equals(this.props.bestAnswerId)) {
            this.addDomainEvent(new question_best_answer_chosen_event_1.QuestionBestAnswerChosenEvent(this, bestAnswerId));
        }
        this.props.bestAnswerId = bestAnswerId;
        this.touch();
    }
    static create(props, id) {
        const question = new Question({
            ...props,
            slug: props.slug ?? slug_1.Slug.create(props.title),
            Attachments: props.Attachments ?? new question_attachment_list_1.QuestionAttachmentList(),
            createdAt: props.createdAt ?? new Date(),
        }, id);
        return question;
    }
}
exports.Question = Question;
//# sourceMappingURL=question.js.map