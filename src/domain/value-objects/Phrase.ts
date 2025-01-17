/**
 *
 */
export class Phrase {
  /**
   *
   * @param value
   */
  constructor(private readonly value: string) {
    if (!value || value.trim() === '') {
      throw new Error('Phrase cannot be empty')
    }
  }

  /**
   *
   */
  getValue(): string {
    return this.value
  }

  /**
   *
   */
  normalize(): Phrase {
    const normalized = this.value.toLowerCase().trim()
    return new Phrase(normalized)
  }

  /**
   *
   * @param other
   */
  equals(other: Phrase): boolean {
    return this.normalize().getValue() === other.normalize().getValue()
  }
}
