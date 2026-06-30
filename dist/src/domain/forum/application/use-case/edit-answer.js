"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditAnswerUseCase = void 0;
const answer_attachment_list_1 = require("./../../enterprise/entities/answer-attachment-list");
const either_1 = require("../../../../core/types/either");
const resource_not_found_error_1 = require("../../../../core/erros/erros/resource-not-found-error");
const not_allowed_error_1 = require("../../../../core/erros/erros/not-allowed-error");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const answer_attachment_1 = require("../../enterprise/entities/answer-attachment");
class EditAnswerUseCase {
    constructor(AnswerRepository, answerAttachmentsRepository) {
        this.AnswerRepository = AnswerRepository;
        this.answerAttachmentsRepository = answerAttachmentsRepository;
    }
    async execute({ authorId, AnswerId, content, AttachmentsIds }) {
        const Answer = await this.AnswerRepository.findById(AnswerId);
        if (!Answer) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (Answer.authorId.toString() !== authorId) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(AnswerId);
        const answerAttachmentList = new answer_attachment_list_1.AnswerAttachmentList(currentAnswerAttachments);
        const answerAttachment = AttachmentsIds?.map(attachmentId => {
            return answer_attachment_1.AnswerAttachment.create({
                attachmentId: new unique_entity_id_1.UniqueEntityID(attachmentId),
                answerId: Answer.id
            });
        });
        answerAttachmentList.update(answerAttachment);
        Answer.attachments = answerAttachmentList;
        Answer.content = content;
        await this.AnswerRepository.save(Answer);
        return (0, either_1.right)({
            Answer
        });
    }
}
exports.EditAnswerUseCase = EditAnswerUseCase;
//# sourceMappingURL=edit-answer.js.map