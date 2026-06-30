import { WatchedList } from '../../../../core/entities/watched-list';
import type { AnswerAttachment } from './answer-attachment';
export declare class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
    compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean;
}
