import { Either } from "../../../../core/types/either";
import type { Answer } from "../../enterprise/entities/Answer";
import type { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
import { NotAllowedError } from "../../../../core/erros/erros/not-allowed-error";
import { AnswerAttachmentsRepository } from '../repositories/answers-attachments-repository';
interface EditAnswerRequestUseCaseRequest {
    authorId: string;
    AnswerId: string;
    content: string;
    AttachmentsIds: string[];
}
type EditAnswerResponseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    Answer: Answer;
}>;
export declare class EditAnswerUseCase {
    private AnswerRepository;
    private answerAttachmentsRepository;
    constructor(AnswerRepository: AnswersRepository, answerAttachmentsRepository: AnswerAttachmentsRepository);
    execute({ authorId, AnswerId, content, AttachmentsIds }: EditAnswerRequestUseCaseRequest): Promise<EditAnswerResponseUseCaseResponse>;
}
export {};
