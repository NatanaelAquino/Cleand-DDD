import { left, right, type Either } from "@/core/types/either"
import type { Question } from "../../enterprise/entities/question"
import type { AnswersRepository } from "../repositories/answers-repository"
import type { QuestionsRepository } from "../repositories/questions-repository"
import { ResourceNotFoundError } from "./erros/resource-not-found-error"
import { NotAllowedError } from "./erros/not-allowed-error"

interface ChooseQuestionBestAnswerRequest {
  authorId: string
  answerId: string
}
type ChooseQuestionBestAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError
  , {
    question: Question
  }>

export class ChooseQuestionBestAnswerUseCase {

  constructor(
    private answersRepository: AnswersRepository,
    private questionRespository: QuestionsRepository
  ) { }



  async execute({ answerId, authorId }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
    const answer = await this.answersRepository.findById(answerId)
    console.log(answer)

    if (!answer) {
     return left(new ResourceNotFoundError())
    }
    const question = await this.questionRespository.findById(answer.questionId.toString())
    if (!question) {
     return left(new ResourceNotFoundError())
    }
    if (authorId != question.authorId.toString()) {
      return left(new NotAllowedError())
    }
    question.bestAnswerId = answer.id
    await this.questionRespository.save(question)

    return right({
      question
    })

  }
}

