import { ScoringDomainService } from '@service/ScoringDomainService'

import { Phrase } from '@value-object/Phrase'
import { Score } from '@value-object/Score'

/**
 * Service for calculating accuracy scores.
 */
export class ScoringService {
  /**
   * @param {ScoringDomainService} scoringDomainService - Domain service for score calculation.
   */
  constructor(private readonly scoringDomainService: ScoringDomainService) {}

  /**
   * Calculates the accuracy score based on user speech and reference text.
   * @param {Phrase} userSpeech - The user's speech as a Phrase value object.
   * @param {Phrase} referenceText - The reference text as a Phrase value object.
   * @returns {Score} - The calculated score.
   */
  calculateScore(userSpeech: Phrase, referenceText: Phrase): Score {
    return this.scoringDomainService.calculateScore(userSpeech, referenceText)
  }
}
