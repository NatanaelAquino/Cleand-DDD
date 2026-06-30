import { Notification } from "../../enterprise/entities/notification";
import type { NotificationRepository } from "../repositories/notifications-repositories";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Either, right } from "../../../../core/types/either";

export interface SendNotificationRequestUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

export type SendNotificationResponseUseCaseResponse = Either<
  null,
  {
    notification: Notification;
  }
>;

export class SendNotificationUseCase {
  constructor(private NotificationsRepository: NotificationRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationRequestUseCaseRequest): Promise<SendNotificationResponseUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    });

    await this.NotificationsRepository.create(notification);

    return right({
      notification,
    });
  }
}
