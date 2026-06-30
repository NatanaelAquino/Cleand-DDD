export class Slug {
  public value: string

  static create(text: string) {
    return new Slug(text)
  }

  private constructor(value: string) {
    this.value = value
  }

  static createFromText(text: string) {
    const slugText = text
    .normalize('NFD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '- ')
    .replace(/[^\w-]+/g, '')
    .replace(/_/g, '-')
    .replace(/--+/g, '-')
    .replace(/-$/, '')

    
    return new Slug(slugText)
  }
}