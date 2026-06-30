import { AnswerAttachment } from "./../../enterprise/entities/answer-attachment";

import { Answer } from "../../enterprise/entities/Answer";
import type { AnswersRepository } from "../repositories/answers-repository";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";
import { Either, right } from "../../../../core/types/either";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

interface AnswerQuestionRequest {
  instructorId: string;
  questionId: string;
  attachmentsIds: string[];
  content: string;
}
type AnswerQuestionResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    attachmentsIds
  }: AnswerQuestionRequest): Promise<AnswerQuestionResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });

    const answerAttachments = attachmentsIds.map((attachmentsIds) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentsIds),
        answerId: answer.id, 
      });
    });

    answer.attachments = new AnswerAttachmentList(answerAttachments);

    await this.answersRepository.create(answer);
    return right({
      answer,
    });
  }
}
