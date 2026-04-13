import type { Question } from "../../enterprise/entities/question"
import type { AnswersRepository } from "../repositories/answers-repository"
import type { QuestionsRepository } from "../repositories/questions-repository"

interface ChooseQuestionBestAnswerRequest {
  authorId: string
  answerId: string
}
interface ChooseQuestionBestAnswerResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {

  constructor(
    private answersRepository: AnswersRepository,
    private questionRespository: QuestionsRepository
  ) { }



  async execute({ answerId, authorId }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
    const answer = await this.answersRepository.findById(answerId)
    console.log(answer)

    if (!answer) {
      throw new Error('Answer not found')
    }
    const question = await this.questionRespository.findById(answer.questionId.toString())
    if (!question) {
      throw new Error('question not found')
    }
    if (authorId != question.authorId.toString()) {
      throw new Error('not allowed')
    }
    question.bestAnswerId = answer.id
    await this.questionRespository.save(question)

    return {
      question
    }

  }
}

