import { Either } from "../../../../core/types/either";
import type { Answer } from "../../enterprise/entities/Answer";
import type { AnswersRepository } from "../repositories/answers-repository";
interface FetRecentQuestionsAnswerRequest {
    questionId: string;
    page: number;
}
type FetRecentQuestionsAnserResponse = Either<null, {
    answer: Answer[];
}>;
export declare class FetRecentQuestionsAnserUseCase {
    private answerRespository;
    constructor(answerRespository: AnswersRepository);
    execute({ page, questionId }: FetRecentQuestionsAnswerRequest): Promise<FetRecentQuestionsAnserResponse>;
}
export {};
