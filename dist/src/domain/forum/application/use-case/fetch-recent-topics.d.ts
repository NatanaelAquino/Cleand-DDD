import { type Either } from "../../../../core/types/either";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
interface FetRecentQuestionsRequest {
    page: number;
}
type FetRecentQuestionsResponse = Either<null, {
    questions: Question[];
}>;
export declare class FetRecentQuestionsUseCase {
    private questionsRepository;
    constructor(questionsRepository: QuestionsRepository);
    execute({ page }: FetRecentQuestionsRequest): Promise<FetRecentQuestionsResponse>;
}
export {};
