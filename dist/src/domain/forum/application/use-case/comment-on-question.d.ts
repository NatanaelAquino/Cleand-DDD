import type { QuestionCommentsRepository } from './../repositories/question-comments-repository';
import type { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { Either } from "../../../../core/types/either";
import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
interface QuestionCommentRequestUseCaseRequest {
    authorId: string;
    questionId: string;
    content: string;
}
type QuestionCommentResponseUseCaseResponse = Either<ResourceNotFoundError, {
    questionComment: QuestionComment;
}>;
export declare class QuestionCommentUseCase {
    private QuestionsRepository;
    private QuestionCommentsRepository;
    constructor(QuestionsRepository: QuestionsRepository, QuestionCommentsRepository: QuestionCommentsRepository);
    execute({ authorId, questionId, content }: QuestionCommentRequestUseCaseRequest): Promise<QuestionCommentResponseUseCaseResponse>;
}
export {};
