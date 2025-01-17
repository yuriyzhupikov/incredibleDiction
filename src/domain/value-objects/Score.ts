/**
 * Class representing a score.
 */
export class Score {
  /**
   * Creates an instance of Score.
   *
   * @param {number} value - The score value.
   * @throws {Error} Throws an error if the score is not between 0 and 100.
   */
  constructor(private readonly value: number) {
    if (value < 0 || value > 100) {
      throw new Error('Score must be between 0 and 100')
    }
  }

  /**
   * Retrieves the score value.
   *
   * @returns {number} The score value.
   */
  getValue(): number {
    return this.value
  }

  /**
   * Checks if the score is passing.
   *
   * @returns {boolean} True if the score is 70 or higher, otherwise false.
   */
  isPassing(): boolean {
    return this.value >= 70 // For example, 70 and above is considered passing
  }
}
