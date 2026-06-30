"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FechRecentQuestionsController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_pipi_1 = require("../pipes/zod-validation-pipi");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
const pageQuerySchema = zod_1.z.string().optional().default('1').transform(Number).pipe(zod_1.z.number().min(1));
const quesryValidationPipe = new zod_validation_pipi_1.ZodValidationPipe(pageQuerySchema);
let FechRecentQuestionsController = class FechRecentQuestionsController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handle(page) {
        const questions = await this.prisma.question.findMany({
            take: 1,
            skip: (page - 1) * 1,
            orderBy: {
                createdAt: "desc",
            },
        });
        return { questions };
    }
};
exports.FechRecentQuestionsController = FechRecentQuestionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("page", quesryValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FechRecentQuestionsController.prototype, "handle", null);
exports.FechRecentQuestionsController = FechRecentQuestionsController = __decorate([
    (0, common_1.Controller)("questions"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], FechRecentQuestionsController);
//# sourceMappingURL=fetch-recent-questions.controller%20copy.js.map