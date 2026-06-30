"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteQuestionUseCase = void 0;
const resource_not_found_error_1 = require("../../../../core/erros/erros/resource-not-found-error");
const either_1 = require("../../../../core/types/either");
const not_allowed_error_1 = require("../../../../core/erros/erros/not-allowed-error");
class DeleteQuestionUseCase {
    constructor(QuestionsRepository) {
        this.QuestionsRepository = QuestionsRepository;
    }
    async execute({ authorId, questionId }) {
        const question = await this.QuestionsRepository.findById(questionId);
        if (!question) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (authorId !== question.authorId.toString()) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        await this.QuestionsRepository.delete(question);
        return (0, either_1.right)({});
    }
}
exports.DeleteQuestionUseCase = DeleteQuestionUseCase;
//# sourceMappingURL=delete-question.js.map