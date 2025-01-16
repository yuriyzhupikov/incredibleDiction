import { ScoringDomainService } from '@service/ScoringDomainService'
import { Phrase } from '@value-object/Phrase'
import { Score } from '@value-object/Score'

export class ScoringService {
  constructor(private readonly scoringDomainService: ScoringDomainService) {}

  calculateScore(userSpeech: Phrase, referenceText: Phrase): Score {
    // Используем доменный сервис для расчёта баллов
    return this.scoringDomainService.calculateScore(userSpeech, referenceText)
  }
}
