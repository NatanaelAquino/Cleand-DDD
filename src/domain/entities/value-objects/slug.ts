export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  static create(text: string) {
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