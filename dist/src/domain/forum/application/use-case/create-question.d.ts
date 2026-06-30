import { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { Either } from "../../../../core/types/either";
interface CreateQuestionRequestUseCaseRequest {
    authorId: string;
    title: string;
    content: string;
    AttachmentIds: string[];
}
type CreateQuestionResponseUseCaseResponse = Either<null, {
    question: Question;
}>;
export declare class CreateQuestionUseCase {
    private QuestionsRepository;
    constructor(QuestionsRepository: QuestionsRepository);
    execute({ authorId, title, content, AttachmentIds }: CreateQuestionRequestUseCaseRequest): Promise<CreateQuestionResponseUseCaseResponse>;
}
export {};
