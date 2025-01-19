import { Score } from '@value-object/Score'

/** Class representing the result of an analysis. */
export class AnalysisResult {
  /**
   * @param {string} speechId ID of the analyzed speech.
   * @param {Score} score The score as a Value Object.
   */
  constructor(
    private readonly speechId: string,
    private readonly score: Score,
  ) {}

  /**
   * Retrieves the ID of the analyzed speech.
   *
   * @returns {string} The ID of the analyzed speech.
   */
  getSpeechId(): string {
    return this.speechId
  }

  /**
   * Retrieves the analysis score.
   *
   * @returns {Score} The analysis score.
   */
  getScore(): Score {
    return this.score
  }

  /**
   * Aggregates multiple results into one.
   *
   * @param {AnalysisResult[]} results
   * @returns {AnalysisResult}
   */
  static aggregate(results: AnalysisResult[]): AnalysisResult {
    const combinedScore = results.reduce((sum, result) => sum + result.score.getValue(), 0) / results.length
    return new AnalysisResult(results[0].speechId, new Score(combinedScore))
  }
}
