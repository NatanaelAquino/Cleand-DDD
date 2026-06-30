"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendNotificationUseCase = void 0;
const notification_1 = require("../../enterprise/entities/notification");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const either_1 = require("../../../../core/types/either");
class SendNotificationUseCase {
    constructor(NotificationsRepository) {
        this.NotificationsRepository = NotificationsRepository;
    }
    async execute({ recipientId, title, content, }) {
        const notification = notification_1.Notification.create({
            recipientId: new unique_entity_id_1.UniqueEntityID(recipientId),
            title,
            content,
        });
        await this.NotificationsRepository.create(notification);
        return (0, either_1.right)({
            notification,
        });
    }
}
exports.SendNotificationUseCase = SendNotificationUseCase;
//# sourceMappingURL=send-notification.js.map