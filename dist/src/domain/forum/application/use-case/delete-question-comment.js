"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteQuestionCommentUseCase = void 0;
const not_allowed_error_1 = require("../../../../core/erros/erros/not-allowed-error");
const resource_not_found_error_1 = require("../../../../core/erros/erros/resource-not-found-error");
const either_1 = require("../../../../core/types/either");
class DeleteQuestionCommentUseCase {
    constructor(QuestionCommentsRepository) {
        this.QuestionCommentsRepository = QuestionCommentsRepository;
    }
    async execute({ authorId, questionCommentId }) {
        const questioncomment = await this.QuestionCommentsRepository.findById(questionCommentId);
        if (!questioncomment) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (questioncomment.authorId.toString() !== authorId) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        await this.QuestionCommentsRepository.delete(questioncomment);
        return (0, either_1.right)({});
    }
}
exports.DeleteQuestionCommentUseCase = DeleteQuestionCommentUseCase;
//# sourceMappingURL=delete-question-comment.js.map