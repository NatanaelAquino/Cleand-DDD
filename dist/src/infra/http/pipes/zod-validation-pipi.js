"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const v3_1 = require("zod-validation-error/v3");
const v3_2 = require("zod/v3");
class ZodValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value) {
        try {
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        }
        catch (error) {
            if (error instanceof v3_2.ZodError) {
                throw new common_1.BadRequestException({
                    message: 'Validation failed',
                    statusCode: 400,
                    error: (0, v3_1.fromZodError)(error),
                });
            }
            throw new common_1.BadRequestException('Validation failed');
        }
    }
}
exports.ZodValidationPipe = ZodValidationPipe;
//# sourceMappingURL=zod-validation-pipi.js.map