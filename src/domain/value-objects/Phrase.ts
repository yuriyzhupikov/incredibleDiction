/** Class representing a phrase. */
export class Phrase {
  /**
   * Creates an instance of Phrase.
   *
   * @param {string} value - The value of the phrase.
   * @throws {Error} Throws an error if the value is empty or only whitespace.
   */
  constructor(private readonly value: string) {
    if (!value || value.trim() === '') {
      throw new Error('Phrase cannot be empty')
    }
  }

  /**
   * Retrieves the value of the phrase.
   *
   * @returns {string} The value of the phrase.
   */
  getValue(): string {
    return this.value
  }

  /**
   * Normalizes the phrase by converting it to lowercase and trimming whitespace.
   *
   * @returns {Phrase} A new Phrase instance with the normalized value.
   */
  normalize(): Phrase {
    const normalized = this.value.toLowerCase().trim()
    return new Phrase(normalized)
  }

  /**
   * Compares the current phrase with another for equality.
   *
   * @param {Phrase} other - The other phrase to compare with.
   * @returns {boolean} True if the normalized values of both phrases are equal, otherwise false.
   */
  equals(other: Phrase): boolean {
    return this.normalize().getValue() === other.normalize().getValue()
  }
}
