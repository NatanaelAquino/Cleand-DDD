import { Either } from "../../../../core/types/either";
import type { QuestionComment } from "../../enterprise/entities/question-comment";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";
interface FetRecentQuestionsAnswerRequest {
    questionId: string;
    page: number;
}
type FetRecentQuestionsCommentResponse = Either<null, {
    questionComments: QuestionComment[];
}>;
export declare class FetRecentQuestionsCommentUseCase {
    private QuestionCommentsRepository;
    constructor(QuestionCommentsRepository: QuestionCommentsRepository);
    execute({ page, questionId }: FetRecentQuestionsAnswerRequest): Promise<FetRecentQuestionsCommentResponse>;
}
export {};
