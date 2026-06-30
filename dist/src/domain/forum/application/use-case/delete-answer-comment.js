"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAnswerCommentUseCase = void 0;
const not_allowed_error_1 = require("../../../../core/erros/erros/not-allowed-error");
const resource_not_found_error_1 = require("../../../../core/erros/erros/resource-not-found-error");
const either_1 = require("../../../../core/types/either");
class DeleteAnswerCommentUseCase {
    constructor(AnswerCommentsRepository) {
        this.AnswerCommentsRepository = AnswerCommentsRepository;
    }
    async execute({ authorId, answerCommentId }) {
        const answercomment = await this.AnswerCommentsRepository.findById(answerCommentId);
        if (!answercomment) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (answercomment.authorId.toString() !== authorId) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        await this.AnswerCommentsRepository.delete(answercomment);
        return (0, either_1.right)({});
    }
}
exports.DeleteAnswerCommentUseCase = DeleteAnswerCommentUseCase;
//# sourceMappingURL=delete-answer-comment.js.map