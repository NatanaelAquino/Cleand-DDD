"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadNotificationUseCase = void 0;
const either_1 = require("../../../../core/types/either");
const resource_not_found_error_1 = require("../../../../core/erros/erros/resource-not-found-error");
const not_allowed_error_1 = require("../../../../core/erros/erros/not-allowed-error");
class ReadNotificationUseCase {
    constructor(NotificationsRepository) {
        this.NotificationsRepository = NotificationsRepository;
    }
    async execute({ recipientID, notificationId, }) {
        const notification = await this.NotificationsRepository.findById(notificationId);
        if (!notification) {
            (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (recipientID !== notification?.recipientId.toString()) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        notification.read();
        await this.NotificationsRepository.save(notification);
        return (0, either_1.right)({
            notification,
        });
    }
}
exports.ReadNotificationUseCase = ReadNotificationUseCase;
//# sourceMappingURL=read.notification.js.map