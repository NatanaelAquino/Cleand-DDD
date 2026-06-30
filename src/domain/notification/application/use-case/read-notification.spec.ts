import { Notification } from "./../../enterprise/entities/notification";
import { expect } from "vitest";
import { InMemoryNotificationsRepository } from "../../../../../test/repositories/in-memory-notifications-repositories";
import { ReadNotificationUseCase } from "./read.notification";
import { makeNotification } from "../../../../../test/factories/make-notification";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "../../../../core/erros/erros/not-allowed-error";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;
describe("Read Notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("Should be able to read a question", async () => {
    const notification = makeNotification();

    inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      recipientID: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.items[0]?.readAt).toEqual(
      expect.any(Date),
    );
  });
  it("Should not be able to delete a notification from another user", async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID("2"),
    });

    inMemoryNotificationsRepository.create(notification);
    
    const result = await sut.execute({
      recipientID: "3",
      notificationId: notification.id.toString(),
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
