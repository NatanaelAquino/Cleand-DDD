import { Answer } from "../../enterprise/entities/Answer";
import type { AnswersRepository } from "../repositories/answers-repository";
import { Either } from "../../../../core/types/either";
interface AnswerQuestionRequest {
    instructorId: string;
    questionId: string;
    attachmentsIds: string[];
    content: string;
}
type AnswerQuestionResponse = Either<null, {
    answer: Answer;
}>;
export declare class AnswerQuestionUseCase {
    private answersRepository;
    constructor(answersRepository: AnswersRepository);
    execute({ instructorId, questionId, content, attachmentsIds }: AnswerQuestionRequest): Promise<AnswerQuestionResponse>;
}
export {};
