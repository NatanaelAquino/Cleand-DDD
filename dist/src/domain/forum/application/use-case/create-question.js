"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuestionUseCase = void 0;
const question_attachment_1 = require("./../../enterprise/entities/question-attachment");
const question_1 = require("../../enterprise/entities/question");
const question_attachment_list_1 = require("../../enterprise/entities/question-attachment-list");
const either_1 = require("../../../../core/types/either");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
class CreateQuestionUseCase {
    constructor(QuestionsRepository) {
        this.QuestionsRepository = QuestionsRepository;
    }
    async execute({ authorId, title, content, AttachmentIds }) {
        const question = question_1.Question.create({
            authorId: new unique_entity_id_1.UniqueEntityID(authorId),
            title,
            content,
        });
        const questionAttachment = AttachmentIds.map(attachmentId => {
            return question_attachment_1.QuestionAttachment.create({
                attachmentId: new unique_entity_id_1.UniqueEntityID(attachmentId),
                questionId: question.id
            });
        });
        question.Attachment = new question_attachment_list_1.QuestionAttachmentList(questionAttachment);
        await this.QuestionsRepository.create(question);
        return (0, either_1.right)({
            question
        });
    }
}
exports.CreateQuestionUseCase = CreateQuestionUseCase;
//# sourceMappingURL=create-question.js.map