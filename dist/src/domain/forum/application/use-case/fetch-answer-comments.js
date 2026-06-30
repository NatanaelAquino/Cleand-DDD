"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetRecentAnswerCommentUseCase = void 0;
const either_1 = require("../../../../core/types/either");
class FetRecentAnswerCommentUseCase {
    constructor(QuestionAnswersRepository) {
        this.QuestionAnswersRepository = QuestionAnswersRepository;
    }
    async execute({ page, answerId }) {
        const questionAnswers = await this.QuestionAnswersRepository.findMyByQuestionId(answerId, { page });
        return (0, either_1.right)({
            questionAnswers
        });
    }
}
exports.FetRecentAnswerCommentUseCase = FetRecentAnswerCommentUseCase;
//# sourceMappingURL=fetch-answer-comments.js.map