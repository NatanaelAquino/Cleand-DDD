"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChooseQuestionBestAnswerUseCase = void 0;
const either_1 = require("../../../../core/types/either");
const resource_not_found_error_1 = require("../../../../core/erros/erros/resource-not-found-error");
const not_allowed_error_1 = require("../../../../core/erros/erros/not-allowed-error");
class ChooseQuestionBestAnswerUseCase {
    constructor(answersRepository, questionRespository) {
        this.answersRepository = answersRepository;
        this.questionRespository = questionRespository;
    }
    async execute({ answerId, authorId }) {
        const answer = await this.answersRepository.findById(answerId);
        if (!answer) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const question = await this.questionRespository.findById(answer.questionId.toString());
        if (!question) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (authorId != question.authorId.toString()) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        question.bestAnswerId = answer.id;
        await this.questionRespository.save(question);
        return (0, either_1.right)({
            question
        });
    }
}
exports.ChooseQuestionBestAnswerUseCase = ChooseQuestionBestAnswerUseCase;
//# sourceMappingURL=choose-question-best-answer.js.map