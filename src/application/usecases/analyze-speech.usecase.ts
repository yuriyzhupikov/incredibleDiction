import { ScoringService } from '@application/service/scoring.service'
import { SpeechService } from '@application/service/speech-analysis.service'
import { AnalysisResult } from '@entity/AnalysisResult'

export class AnalyzeSpeechUseCase {
  constructor(
    private readonly speechService: SpeechService,
    private readonly scoringService: ScoringService,
  ) {}

  async execute(audioFilePath: string, referenceText: string): Promise<AnalysisResult> {
    // 1. Анализируем аудио
    const analyzedText = await this.speechService.analyzeAudio(audioFilePath)

    // 2. Считаем очки
    const score = this.scoringService.calculateScore(analyzedText, referenceText)

    // 3. Возвращаем результат анализа
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
