import { Entity } from "@/core/entities/entity"
import type { UniqueEntityID } from "@/core/entities/unique-entity-id"


interface StudentProps {
    name: string
    email: string
}
class Student extends Entity<StudentProps> {

    static create(props: StudentProps, id?: UniqueEntityID) {
    const question = new Student({
      ...props,
    }, id)
    return question
  }
}

export default Student