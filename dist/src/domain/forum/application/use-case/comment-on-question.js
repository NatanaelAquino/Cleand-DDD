"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionCommentUseCase = void 0;
const question_comment_1 = require("../../enterprise/entities/question-comment");
const either_1 = require("../../../../core/types/either");
const resource_not_found_error_1 = require("../../../../core/erros/erros/resource-not-found-error");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
class QuestionCommentUseCase {
    constructor(QuestionsRepository, QuestionCommentsRepository) {
        this.QuestionsRepository = QuestionsRepository;
        this.QuestionCommentsRepository = QuestionCommentsRepository;
    }
    async execute({ authorId, questionId, content }) {
        const question = await this.QuestionsRepository.findById(questionId);
        if (!question) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const questionComment = question_comment_1.QuestionComment.create({
            authorId: new unique_entity_id_1.UniqueEntityID(authorId),
            questionId: new unique_entity_id_1.UniqueEntityID(questionId),
            content,
        });
        await this.QuestionCommentsRepository.create(questionComment);
        return (0, either_1.right)({
            questionComment
        });
    }
}
exports.QuestionCommentUseCase = QuestionCommentUseCase;
//# sourceMappingURL=comment-on-question.js.map