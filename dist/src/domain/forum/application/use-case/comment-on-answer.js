"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerCommentUseCase = void 0;
const Answer_comment_1 = require("../../enterprise/entities/Answer-comment");
const either_1 = require("../../../../core/types/either");
const resource_not_found_error_1 = require("../../../../core/erros/erros/resource-not-found-error");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
class AnswerCommentUseCase {
    constructor(AnswersRepository, AnswerCommentsRepository) {
        this.AnswersRepository = AnswersRepository;
        this.AnswerCommentsRepository = AnswerCommentsRepository;
    }
    async execute({ authorId, answerId, content }) {
        const answer = await this.AnswersRepository.findById(answerId);
        if (!answer) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const answerComment = Answer_comment_1.AnswerComment.create({
            authorId: new unique_entity_id_1.UniqueEntityID(authorId),
            answerId: new unique_entity_id_1.UniqueEntityID(answerId),
            content,
        });
        await this.AnswerCommentsRepository.create(answerComment);
        return (0, either_1.right)({
            answerComment
        });
    }
}
exports.AnswerCommentUseCase = AnswerCommentUseCase;
//# sourceMappingURL=comment-on-answer.js.map