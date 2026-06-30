"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditQuestionUseCase = void 0;
const question_attachment_list_1 = require("../../enterprise/entities/question-attachment-list");
const question_attachment_1 = require("../../enterprise/entities/question-attachment");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const either_1 = require("../../../../core/types/either");
const resource_not_found_error_1 = require("../../../../core/erros/erros/resource-not-found-error");
const not_allowed_error_1 = require("../../../../core/erros/erros/not-allowed-error");
class EditQuestionUseCase {
    constructor(QuestionsRepository, QuestionAttachmentsRepository) {
        this.QuestionsRepository = QuestionsRepository;
        this.QuestionAttachmentsRepository = QuestionAttachmentsRepository;
    }
    async execute({ authorId, questionId, title, content, AttachmentsIds }) {
        const question = await this.QuestionsRepository.findById(questionId);
        if (!question) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (question.authorId.toString() !== authorId) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        const currentQuestionAttachments = await this.QuestionAttachmentsRepository.findManyByQuestionId(questionId);
        const questionAttachmentList = new question_attachment_list_1.QuestionAttachmentList(currentQuestionAttachments);
        const questionAttachment = AttachmentsIds?.map(attachmentId => {
            return question_attachment_1.QuestionAttachment.create({
                attachmentId: new unique_entity_id_1.UniqueEntityID(attachmentId),
                questionId: question.id
            });
        });
        questionAttachmentList.update(questionAttachment ?? []);
        question.Attachment = questionAttachmentList;
        question.title = title;
        question.content = content;
        question.Attachment = questionAttachmentList;
        await this.QuestionsRepository.save(question);
        return (0, either_1.right)({
            question
        });
    }
}
exports.EditQuestionUseCase = EditQuestionUseCase;
//# sourceMappingURL=edit-question.js.map