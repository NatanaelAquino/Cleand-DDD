"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionComment = void 0;
const entity_1 = require("../../../../core/entities/entity");
class QuestionComment extends entity_1.Entity {
    get content() {
        return this.props.content;
    }
    get authorId() {
        return this.props.authorId;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get questionId() {
        return this.props.questionId;
    }
    get exerpt() {
        return this.props.content.substring(0, 120).trimEnd().concat('...');
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    set content(content) {
        this.props.content = content;
        this.touch();
    }
    static create(props, id) {
        const questionComment = new QuestionComment({
            ...props,
            updatedAt: props.updatedAt ?? new Date(),
        }, id);
        return questionComment;
    }
}
exports.QuestionComment = QuestionComment;
//# sourceMappingURL=question-comment.js.map