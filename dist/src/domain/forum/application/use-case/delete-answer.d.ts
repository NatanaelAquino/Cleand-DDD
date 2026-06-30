import { NotAllowedError } from "../../../../core/erros/erros/not-allowed-error";
import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
import { Either } from "../../../../core/types/either";
import type { AnswersRepository } from "../repositories/answers-repository";
interface DeleteAnswerRequestUseCaseRequest {
    authorId: string;
    answerId: string;
}
type DeleteAnswerResponseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;
export declare class DeleteAnswerUseCase {
    private AnswersRepository;
    constructor(AnswersRepository: AnswersRepository);
    execute({ authorId, answerId }: DeleteAnswerRequestUseCaseRequest): Promise<DeleteAnswerResponseUseCaseResponse>;
}
export {};
