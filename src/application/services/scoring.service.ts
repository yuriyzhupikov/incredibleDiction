import { windowedDTW } from '@lib/audio'

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
   * @param {AudioFile} originAudio - The user's speech as a Phrase value object.
   * @returns {Score} - The calculated score.
   */
  calculateScore(userAudio: AudioFile, originAudio: AudioFile): Score {
    const userSample = userAudio.getSample()
    const originalSample = originAudio.getSample()
    const rawScore = windowedDTW(userSample, originalSample, 256)
    const score = this.scoringDomainService.calculateScore(rawScore)
    return score
  }
}
