import { NotificationRepository } from '../../src/domain/notification/application/repositories/notifications-repositories';
import { Notification } from '../../src/domain/notification/enterprise/entities/notification';


export class InMemoryNotificationsRepository implements NotificationRepository {
  public items: Notification[] = [];

  async create(notification: Notification) {
    this.items.push(notification);
  }
  async findById(id: string){
    const notificationComment = this.items.find((item) => item.id.toString() === id);
    return notificationComment ?? null;
  }

   async save(notification: Notification): Promise<void> {
    const itemsIndex = this.items.findIndex((item) => item.id === notification.id);

    this.items[itemsIndex] = notification;
  }
}
