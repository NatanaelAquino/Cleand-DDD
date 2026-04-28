import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { right, type Either } from "@/core/types/either";

interface CreateQuestionRequestUseCaseRequest {
  authorId: string
  title: string
  content: string
}

type CreateQuestionResponseUseCaseResponse = Either<null, {
  question: Question
}>

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

    return right({
      question
    })
  }


}

