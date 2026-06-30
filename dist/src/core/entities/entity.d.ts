import { UniqueEntityID } from "./unique-entity-id";
export declare abstract class Entity<Props> {
    private _id;
    protected props: Props;
    get id(): UniqueEntityID;
    protected constructor(props: Props, id?: UniqueEntityID);
    equals(entity: Entity<any>): boolean;
}
