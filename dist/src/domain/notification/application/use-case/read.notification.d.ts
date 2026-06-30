import { Either } from "../../../../core/types/either";
import { Notification } from "../../enterprise/entities/notification";
import type { NotificationRepository } from "../repositories/notifications-repositories";
import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
import { NotAllowedError } from "../../../../core/erros/erros/not-allowed-error";
interface ReadNotificationRequestUseCaseRequest {
    recipientID: string;
    notificationId: string;
}
type ReadNotificationResponseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    notification: Notification;
}>;
export declare class ReadNotificationUseCase {
    private NotificationsRepository;
    constructor(NotificationsRepository: NotificationRepository);
    execute({ recipientID, notificationId, }: ReadNotificationRequestUseCaseRequest): Promise<ReadNotificationResponseUseCaseResponse>;
}
export {};
