"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetRecentQuestionsCommentUseCase = void 0;
const either_1 = require("../../../../core/types/either");
class FetRecentQuestionsCommentUseCase {
    constructor(QuestionCommentsRepository) {
        this.QuestionCommentsRepository = QuestionCommentsRepository;
    }
    async execute({ page, questionId }) {
        const questionComments = await this.QuestionCommentsRepository.findMyByQuestionId(questionId, { page });
        return (0, either_1.right)({
            questionComments
        });
    }
}
exports.FetRecentQuestionsCommentUseCase = FetRecentQuestionsCommentUseCase;
//# sourceMappingURL=fetch-question-comments.js.map