"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../../../../core/entities/entity");
class Instructor extends entity_1.Entity {
    static create(props, id) {
        const question = new Instructor({
            ...props,
        }, id);
        return question;
    }
}
exports.default = Instructor;
//# sourceMappingURL=instructor.js.map