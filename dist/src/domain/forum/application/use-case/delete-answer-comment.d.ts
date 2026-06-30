import { NotAllowedError } from "../../../../core/erros/erros/not-allowed-error";
import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
import { Either } from "../../../../core/types/either";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
interface DeleteAnswerCommentRequestUseCaseRequest {
    authorId: string;
    answerCommentId: string;
}
type DeleteAnswerCommentResponseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;
export declare class DeleteAnswerCommentUseCase {
    private AnswerCommentsRepository;
    constructor(AnswerCommentsRepository: AnswerCommentsRepository);
    execute({ authorId, answerCommentId }: DeleteAnswerCommentRequestUseCaseRequest): Promise<DeleteAnswerCommentResponseUseCaseResponse>;
}
export {};
