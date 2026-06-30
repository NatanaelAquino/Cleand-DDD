"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetRecentQuestionsAnserUseCase = void 0;
const either_1 = require("../../../../core/types/either");
class FetRecentQuestionsAnserUseCase {
    constructor(answerRespository) {
        this.answerRespository = answerRespository;
    }
    async execute({ page, questionId }) {
        const answer = await this.answerRespository.findMyByQuestionId(questionId, { page });
        return (0, either_1.right)({
            answer
        });
    }
}
exports.FetRecentQuestionsAnserUseCase = FetRecentQuestionsAnserUseCase;
//# sourceMappingURL=fetch-question-answer.js.map