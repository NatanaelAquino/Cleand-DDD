import type { QuestionsRepository } from "../repositories/questions-repository";
import type { Question } from "../../enterprise/entities/question";
import { NotAllowedError } from './erros/not-allowed-error';
import { ResourceNotFoundError } from './erros/resource-not-found-error';
import { left, right, type Either } from '@/core/types/either';

interface EditQuestionRequestUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionResponseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
  question: Question
}>

export class EditQuestionUseCase {

  constructor(private QuestionsRepository: QuestionsRepository) { }

  async execute({
    authorId,
    questionId,
    title,
    content
  }: EditQuestionRequestUseCaseRequest): Promise<EditQuestionResponseUseCaseResponse> {
    const question = await this.QuestionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    question.title = title

    question.content = content

    await this.QuestionsRepository.save(question)

    return right( {
      question
    })
  }


}

