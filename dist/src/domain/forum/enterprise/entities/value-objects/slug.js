"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slug = void 0;
class Slug {
    static create(text) {
        return new Slug(text);
    }
    constructor(value) {
        this.value = value;
    }
    static createFromText(text) {
        const slugText = text
            .normalize('NFD')
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '- ')
            .replace(/[^\w-]+/g, '')
            .replace(/_/g, '-')
            .replace(/--+/g, '-')
            .replace(/-$/, '');
        return new Slug(slugText);
    }
}
exports.Slug = Slug;
//# sourceMappingURL=slug.js.map