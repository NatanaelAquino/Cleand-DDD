"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetRecentQuestionsUseCase = void 0;
const either_1 = require("../../../../core/types/either");
class FetRecentQuestionsUseCase {
    constructor(questionsRepository) {
        this.questionsRepository = questionsRepository;
    }
    async execute({ page }) {
        const question = await this.questionsRepository.findManyRecent({ page });
        return (0, either_1.right)({
            questions: question
        });
    }
}
exports.FetRecentQuestionsUseCase = FetRecentQuestionsUseCase;
//# sourceMappingURL=fetch-recent-topics.js.map