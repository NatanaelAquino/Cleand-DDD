import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { Either } from "../../../../core/types/either";
import { NotAllowedError } from "../../../../core/erros/erros/not-allowed-error";
interface DeleteQuestionRequestUseCaseRequest {
    authorId: string;
    questionId: string;
}
type DeleteQuestionResponseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;
export declare class DeleteQuestionUseCase {
    private QuestionsRepository;
    constructor(QuestionsRepository: QuestionsRepository);
    execute({ authorId, questionId }: DeleteQuestionRequestUseCaseRequest): Promise<DeleteQuestionResponseUseCaseResponse>;
}
export {};
