import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";

interface CreateQuestionRequestUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionResponseUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {

  constructor(private QuestionsRepository: QuestionsRepository) { }

  async execute({
    authorId,
    title,
    content
  }: CreateQuestionRequestUseCaseRequest): Promise<CreateQuestionResponseUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    await this.QuestionsRepository.create(question)

    return {
      question
    }
  }


}

