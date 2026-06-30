import { Question } from './../../enterprise/entities/question';
import type { QuestionsRepository } from "../repositories/questions-repository";
import type { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository';
import { Either } from '../../../../core/types/either';
import { ResourceNotFoundError } from '../../../../core/erros/erros/resource-not-found-error';
import { NotAllowedError } from '../../../../core/erros/erros/not-allowed-error';
interface EditQuestionRequestUseCaseRequest {
    authorId: string;
    questionId: string;
    title: string;
    content: string;
    AttachmentsIds?: string[];
}
type EditQuestionResponseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    question: Question;
}>;
export declare class EditQuestionUseCase {
    private QuestionsRepository;
    private QuestionAttachmentsRepository;
    constructor(QuestionsRepository: QuestionsRepository, QuestionAttachmentsRepository: QuestionAttachmentsRepository);
    execute({ authorId, questionId, title, content, AttachmentsIds }: EditQuestionRequestUseCaseRequest): Promise<EditQuestionResponseUseCaseResponse>;
}
export {};
