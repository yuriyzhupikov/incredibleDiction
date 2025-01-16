import { Phrase } from '@value-object/Phrase'
import { Score } from '@value-object/Score'

export class AnalysisResult {
  constructor(
    private readonly speechId: string, // ID анализируемой речи
    private readonly referenceText: Phrase, // Эталонный текст
    private readonly analyzedText: Phrase, // Проанализированный текст
    private readonly score: Score, // Балл как Value Object
  ) {}

  // Получение идентификатора речи
  getSpeechId(): string {
    return this.speechId
  }

  // Получение эталонного текста
  getReferenceText(): Phrase {
    return this.referenceText
  }

  // Получение текста пользователя
  getAnalyzedText(): Phrase {
    return this.analyzedText
  }

  // Получение баллов
  getScore(): Score {
    return this.score
  }
}
