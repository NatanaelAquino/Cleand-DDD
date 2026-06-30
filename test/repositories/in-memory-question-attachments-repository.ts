import { QuestionAttachment } from './../../src/domain/forum/enterprise/entities/question-attachment';
import { QuestionAttachmentsRepository } from '../../src/domain/forum/application/repositories/question-attachments-repository';


export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
  public items: QuestionAttachment[] = []


  async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() === questionId
    )

    return questionAttachments
  }
  async deleteManyByQuestionId(questionId: string){
    this.items = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )
  }
}