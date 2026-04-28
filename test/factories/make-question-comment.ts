import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import  { QuestionComment, type QuestionCommetnProps } from "@/domain/forum/enterprise/entities/question-comment"
import { faker } from "@faker-js/faker"

export function makeQuestionComment(
  override: Partial<QuestionCommetnProps> = {},
  id?: UniqueEntityID
) {
  return QuestionComment.create({
    authorId: new UniqueEntityID(),
    content: faker.lorem.text(),
    questionId: new UniqueEntityID(),
    ...override
  }, id)
}