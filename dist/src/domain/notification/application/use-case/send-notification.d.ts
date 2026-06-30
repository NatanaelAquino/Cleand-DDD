import { Notification } from "../../enterprise/entities/notification";
import type { NotificationRepository } from "../repositories/notifications-repositories";
import { Either } from "../../../../core/types/either";
export interface SendNotificationRequestUseCaseRequest {
    recipientId: string;
    title: string;
    content: string;
}
export type SendNotificationResponseUseCaseResponse = Either<null, {
    notification: Notification;
}>;
export declare class SendNotificationUseCase {
    private NotificationsRepository;
    constructor(NotificationsRepository: NotificationRepository);
    execute({ recipientId, title, content, }: SendNotificationRequestUseCaseRequest): Promise<SendNotificationResponseUseCaseResponse>;
}
