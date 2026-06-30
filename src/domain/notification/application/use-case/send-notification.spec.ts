import { beforeEach, describe, expect, it } from "vitest";

import { SendNotificationUseCase } from "./send-notification";
import { InMemoryNotificationsRepository } from "../../../../../test/repositories/in-memory-notifications-repositories";


let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;
describe("send Notification", () => {
  beforeEach(() => {
    
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("Should be able to send a question", async () => {
    const result = await sut.execute({
      recipientId: "1",
      title: "Nova Notificação",
      content: "conteudo notificação",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    );
  });
});
