import { Either } from "../../../../core/types/either";
import type { AnswerComment } from "../../enterprise/entities/Answer-comment";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
interface FetRecentAnswerAnswerRequest {
    answerId: string;
    page: number;
}
type FetRecentAnswerCommentResponse = Either<null, {
    questionAnswers: AnswerComment[];
}>;
export declare class FetRecentAnswerCommentUseCase {
    private QuestionAnswersRepository;
    constructor(QuestionAnswersRepository: AnswerCommentsRepository);
    execute({ page, answerId }: FetRecentAnswerAnswerRequest): Promise<FetRecentAnswerCommentResponse>;
}
export {};
