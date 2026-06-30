import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
import { Either } from "../../../../core/types/either";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
interface GetQuestionBySlugRequest {
    slug: string;
}
type GetQuestionBySlugResponse = Either<ResourceNotFoundError, {
    question: Question;
}>;
export declare class GetQuestionBySlugUseCase {
    private questionsRepository;
    constructor(questionsRepository: QuestionsRepository);
    execute({ slug }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse>;
}
export {};
