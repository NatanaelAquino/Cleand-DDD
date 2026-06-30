import type { Question } from "../../enterprise/entities/question";
import type { AnswersRepository } from "../repositories/answers-repository";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { Either } from "../../../../core/types/either";
import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
import { NotAllowedError } from "../../../../core/erros/erros/not-allowed-error";
interface ChooseQuestionBestAnswerRequest {
    authorId: string;
    answerId: string;
}
type ChooseQuestionBestAnswerResponse = Either<ResourceNotFoundError | NotAllowedError, {
    question: Question;
}>;
export declare class ChooseQuestionBestAnswerUseCase {
    private answersRepository;
    private questionRespository;
    constructor(answersRepository: AnswersRepository, questionRespository: QuestionsRepository);
    execute({ answerId, authorId }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse>;
}
export {};
