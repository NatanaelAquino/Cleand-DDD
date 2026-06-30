import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

interface AttachmentProps {
  title: string
  link: string
  parentId: 'answer' | 'question'
}
export class Attachment extends Entity<AttachmentProps> {
  get title() {
    return this.props.title
  }
  get link() {
    return this.props.link
  }
  get parentId() {
    return this.props.parentId
  }
  static create(props: AttachmentProps, id?: UniqueEntityID) {
    const attachment = new Attachment(props, id)
    return attachment
  }

}