import { ScoringService } from '@application/service/scoring.service'
import { SpeechService } from '@application/service/speech-analysis.service'
import { AnalysisResult } from '@entity/AnalysisResult'

/**
 * Use case for analyzing speech and calculating accuracy scores.
 */
export class AnalyzeSpeechUseCase {
  /**
   * @param {SpeechService} speechService - Service for speech analysis.
   * @param {ScoringService} scoringService - Service for calculating scores.
   */
  constructor(
    private readonly speechService: SpeechService,
    private readonly scoringService: ScoringService,
  ) {}

  /**
   * Executes the speech analysis process.
   * @param {string} audioFilePath - The path to the audio file.
   * @param {string} referenceText - The reference text for comparison.
   * @returns {Promise<AnalysisResult>} - The result of the speech analysis.
   */
  async execute(audioFilePath: string, referenceText: string): Promise<AnalysisResult> {
    const analyzedText = await this.speechService.analyzeAudio(audioFilePath)
    const score = this.scoringService.calculateScore(analyzedText, referenceText)
    return new AnalysisResult(audioFilePath, referenceText, analyzedText, score)
  }
}

// Use Cases:
//
//   Реализуют конкретные пользовательские сценарии.
//   Содержат высокоуровневую логику и координируют вызовы сервисов и доменных слоёв.
//   Это "директора", которые организуют выполнение сценариев.
//   Application Services:
//
//   Выполняют низкоуровневые задачи приложения (например, обработка аудио, запись данных).
// Абстрагируют инфраструктуру и обеспечивают удобный API для Use Cases.
//   Это "исполнители", которые делают работу по инструкциям Use Case.
