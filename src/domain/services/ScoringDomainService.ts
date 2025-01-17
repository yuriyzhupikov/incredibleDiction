import { getDistanceAudio } from '@lib/audio-processing'

import { AudioFile } from '@value-object/AudioFile'
import { Score } from '@value-object/Score'

/** Domain service for calculating accuracy scores based on speech and reference text. */
export class ScoringDomainService {
  /**
   * Calculates the score for speech accuracy.
   *
   * @param {AudioFile} userAudio - The user's speech as a AudioFile value object.
   * @param {AudioFile} referenceAudio - The reference as a AudioFile value object.
   * @returns {Score} - The calculated accuracy score.
   */
  calculateScore(userAudio: AudioFile, referenceAudio: AudioFile): Score {
    const rawScore = getDistanceAudio(userAudio.getSample(), referenceAudio.getSample())

    return new Score(rawScore)
  }
}
