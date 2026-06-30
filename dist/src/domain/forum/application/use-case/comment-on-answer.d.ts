import type { AnswerCommentsRepository } from './../repositories/answer-comments-repository';
import type { AnswersRepository } from "../repositories/answers-repository";
import { AnswerComment } from '../../enterprise/entities/Answer-comment';
import { Either } from "../../../../core/types/either";
import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
interface AnswerCommentRequestUseCaseRequest {
    authorId: string;
    answerId: string;
    content: string;
}
type AnswerCommentResponseUseCaseResponse = Either<ResourceNotFoundError, {
    answerComment: AnswerComment;
}>;
export declare class AnswerCommentUseCase {
    private AnswersRepository;
    private AnswerCommentsRepository;
    constructor(AnswersRepository: AnswersRepository, AnswerCommentsRepository: AnswerCommentsRepository);
    execute({ authorId, answerId, content }: AnswerCommentRequestUseCaseRequest): Promise<AnswerCommentResponseUseCaseResponse>;
}
export {};
