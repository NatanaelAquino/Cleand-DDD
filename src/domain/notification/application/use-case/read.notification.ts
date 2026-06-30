import { Either, left, right } from "../../../../core/types/either";
import { Notification } from "../../enterprise/entities/notification";
import type { NotificationRepository } from "../repositories/notifications-repositories";
import { ResourceNotFoundError } from "../../../../core/erros/erros/resource-not-found-error";
import { NotAllowedError } from "../../../../core/erros/erros/not-allowed-error";

interface ReadNotificationRequestUseCaseRequest {
  recipientID: string;
  notificationId: string;
}

type ReadNotificationResponseUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification;
  }
>;

export class ReadNotificationUseCase {
  constructor(private NotificationsRepository: NotificationRepository) {}

  async execute({
    recipientID,
    notificationId,
  }: ReadNotificationRequestUseCaseRequest): Promise<ReadNotificationResponseUseCaseResponse> {
    const notification =
      await this.NotificationsRepository.findById(notificationId);

    if (!notification) {
      left(new ResourceNotFoundError());
    }

    if (recipientID !== notification?.recipientId.toString()) {
      return left(new NotAllowedError());
    }

    notification.read();

    await this.NotificationsRepository.save(notification);

    return right({
      notification,
    });
  }
}
