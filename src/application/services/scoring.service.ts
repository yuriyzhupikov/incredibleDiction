import { ScoringDomainService } from '@service/ScoringDomainService'

import { AudioFile } from '@value-object/AudioFile'
import { Score } from '@value-object/Score'

/** Service for calculating accuracy scores. */
export class ScoringService {
  /** @param {ScoringDomainService} scoringDomainService - Domain service for score calculation. */
  constructor(private readonly scoringDomainService: ScoringDomainService) {}

  /**
   * Calculates the accuracy score based on user speech and reference text.
   *
   * @param {AudioFile} userAudio - The user's speech as a Phrase value object.
   * @param {AudioFile} referenceAudio - The reference text as a Phrase value object.
   * @returns {Score} - The calculated score.
   */
  calculateScore(userAudio: AudioFile, referenceAudio: AudioFile): Score {
    return this.scoringDomainService.calculateScore(userAudio, referenceAudio)
  }
}
