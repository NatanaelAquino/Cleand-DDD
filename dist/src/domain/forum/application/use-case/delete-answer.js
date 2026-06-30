"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAnswerUseCase = void 0;
const not_allowed_error_1 = require("../../../../core/erros/erros/not-allowed-error");
const resource_not_found_error_1 = require("../../../../core/erros/erros/resource-not-found-error");
const either_1 = require("../../../../core/types/either");
class DeleteAnswerUseCase {
    constructor(AnswersRepository) {
        this.AnswersRepository = AnswersRepository;
    }
    async execute({ authorId, answerId }) {
        const answer = await this.AnswersRepository.findById(answerId);
        if (!answer) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (answer.authorId.toString() !== authorId) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        await this.AnswersRepository.delete(answer);
        return (0, either_1.right)({});
    }
}
exports.DeleteAnswerUseCase = DeleteAnswerUseCase;
//# sourceMappingURL=delete-answer.js.map