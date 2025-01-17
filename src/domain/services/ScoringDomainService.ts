import { Phrase } from '@value-object/Phrase'
import { Score } from '@value-object/Score'

/**
 * Domain service for calculating accuracy scores based on speech and reference text.
 */
export class ScoringDomainService {
  /**
   * Calculates the score for speech accuracy.
   * @param {Phrase} userSpeech - The user's speech as a Phrase value object.
   * @param {Phrase} referenceText - The reference text as a Phrase value object.
   * @returns {Score} - The calculated accuracy score.
   */
  calculateScore(userSpeech: Phrase, referenceText: Phrase): Score {
    const userNormalized = userSpeech.normalize()
    const referenceNormalized = referenceText.normalize()

    // Calculate differences using the Levenshtein distance algorithm
    const differences = this.calculateLevenshteinDistance(userNormalized.getValue(), referenceNormalized.getValue())

    // Formula for score calculation: 100 - 10 * number of differences
    const rawScore = Math.max(0, 100 - differences * 10)

    return new Score(rawScore)
  }

  /**
   * Calculates the Levenshtein distance between two strings.
   * @param {string} a - The first string.
   * @param {string} b - The second string.
   * @returns {number} - The Levenshtein distance between the two strings.
   */
  private calculateLevenshteinDistance(a: string, b: string): number {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
      Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)))

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // Deletion
          matrix[i][j - 1] + 1, // Insertion
          matrix[i - 1][j - 1] + cost, // Substitution
        )
      }
    }

    return matrix[a.length][b.length]
  }
}
