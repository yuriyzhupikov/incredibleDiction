import { Phrase } from '@value-object/Phrase'
import { Score } from '@value-object/Score'

/**
 * Class representing the result of an analysis.
 */
export class AnalysisResult {
  /**
   *
   * @param {string} speechId ID of the analyzed speech.
   * @param {Phrase} referenceText The reference text.
   * @param {Phrase} analyzedText The analyzed text.
   * @param {Score} score The score as a Value Object.
   */
  constructor(
    private readonly speechId: string,
    private readonly referenceText: Phrase,
    private readonly analyzedText: Phrase,
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
   * Retrieves the reference text.
   *
   * @returns {Phrase} The reference text.
   */
  getReferenceText(): Phrase {
    return this.referenceText
  }

  /**
   * Retrieves the analyzed text.
   *
   * @returns {Phrase} The analyzed text.
   */
  getAnalyzedText(): Phrase {
    return this.analyzedText
  }

  /**
   * Retrieves the analysis score.
   *
   * @returns {Score} The analysis score.
   */
  getScore(): Score {
    return this.score
  }
}
