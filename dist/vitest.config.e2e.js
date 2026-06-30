"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unplugin_swc_1 = __importDefault(require("unplugin-swc"));
const config_1 = require("vitest/config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = (0, config_1.defineConfig)({
    test: {
        include: ['**/*.e2e-spec.ts'],
        setupFiles: ['./test/setup-e2e.ts'],
        globals: true,
        root: './',
        hookTimeout: 600000,
        testTimeout: 600000,
    },
    resolve: {
        tsconfigPaths: true,
    },
    plugins: [
        unplugin_swc_1.default.vite({
            module: {
                type: 'es6',
            }
        })
    ],
});
//# sourceMappingURL=vitest.config.e2e.js.map