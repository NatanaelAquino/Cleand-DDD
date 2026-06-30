import { Question, type QuestionProps } from "../../src/domain/forum/enterprise/entities/question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Slug } from "../../src/domain/forum/enterprise/entities/value-objects/slug"
import { faker } from "@faker-js/faker"


export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID
) {
  return Question.create({
    authorId: new UniqueEntityID('1'),
    title: faker.lorem.sentence(),
    content: faker.lorem.text(),
    slug: Slug.create(faker.lorem.slug()),
    ...override
  }, id)
}