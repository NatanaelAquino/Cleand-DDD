import { Entity } from "@/core/entities/entity"
import type { UniqueEntityID } from "@/core/entities/unique-entity-id"
interface InstructorProps {
    name: string
}
class Instructor extends Entity<InstructorProps> {

    static create(props: InstructorProps, id?: UniqueEntityID) {
    const question = new Instructor({
      ...props,
    }, id)
    return question
  }
}

export default Instructor