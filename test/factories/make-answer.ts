import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Answer, type AnswerProps } from "../../src/domain/forum/enterprise/entities/Answer"
import { faker } from "@faker-js/faker"

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID
) {
  return Answer.create({
    authorId: new UniqueEntityID(),
    content: faker.lorem.text(),
    questionId: new UniqueEntityID(),
    ...override
  }, id)
}