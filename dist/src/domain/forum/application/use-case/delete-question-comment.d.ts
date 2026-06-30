import { NotAllowedError } from "../../../../core/erros/erros/not-allowed-error";
import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
import { Either } from "../../../../core/types/either";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";
interface DeleteQuestionCommentRequestUseCaseRequest {
    authorId: string;
    questionCommentId: string;
}
type DeleteQuestionCommentResponseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;
export declare class DeleteQuestionCommentUseCase {
    private QuestionCommentsRepository;
    constructor(QuestionCommentsRepository: QuestionCommentsRepository);
    execute({ authorId, questionCommentId }: DeleteQuestionCommentRequestUseCaseRequest): Promise<DeleteQuestionCommentResponseUseCaseResponse>;
}
export {};
