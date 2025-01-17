import { ScoringDomainService } from '@service/ScoringDomainService'

import { Phrase } from '@value-object/Phrase'
import { Score } from '@value-object/Score'

/**
 *
 */
export class ScoringService {
  /** @param scoringDomainService */
  constructor(private readonly scoringDomainService: ScoringDomainService) {}

  /**
   * @param userSpeech
   * @param referenceText
   */
  calculateScore(userSpeech: Phrase, referenceText: Phrase): Score {
    // Используем доменный сервис для расчёта баллов
    return this.scoringDomainService.calculateScore(userSpeech, referenceText)
  }
}
