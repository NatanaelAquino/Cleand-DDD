"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../../../../core/entities/entity");
class Student extends entity_1.Entity {
    static create(props, id) {
        const question = new Student({
            ...props,
        }, id);
        return question;
    }
}
exports.default = Student;
//# sourceMappingURL=student.js.map