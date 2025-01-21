import { AudioFile } from '@value-object/AudioFile'
import { Score } from '@value-object/Score'

/** Domain service for calculating accuracy scores based on speech and reference text. */
export class ScoringDomainService {
  /**
   * Calculates the score for speech accuracy.
   *
   * @param {AudioFile} rawScore - The user's speech as a AudioFile value object.
   * @returns {Score} - The calculated accuracy score.
   */
  calculateScore(rawScore: number): Score {
    return new Score(rawScore)
  }
}
