import { Phrase } from '@value-object/Phrase'
import { Score } from '@value-object/Score'

export class ScoringDomainService {
  // Метод расчёта баллов за точность речи
  calculateScore(userSpeech: Phrase, referenceText: Phrase): Score {
    const userNormalized = userSpeech.normalize()
    const referenceNormalized = referenceText.normalize()

    // Считаем различия с помощью алгоритма Левенштейна
    const differences = this.calculateLevenshteinDistance(userNormalized.getValue(), referenceNormalized.getValue())

    // Формула расчёта очков: 100 - 10 * количество различий
    const rawScore = Math.max(0, 100 - differences * 10)

    return new Score(rawScore)
  }

  // Приватный метод расчёта расстояния Левенштейна
  private calculateLevenshteinDistance(a: string, b: string): number {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)))

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // Удаление
          matrix[i][j - 1] + 1, // Вставка
          matrix[i - 1][j - 1] + cost, // Замена
        )
      }
    }

    return matrix[a.length][b.length]
  }
}
