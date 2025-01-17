import { ScoringService } from '@application/service/scoring.service'
import { SpeechService } from '@application/service/speech-analysis.service'
import { AnalysisResult } from '@entity/AnalysisResult'
import { AudioFile } from '@value-object/AudioFile'

/** Use case for analyzing speech and calculating accuracy scores. */
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
   *
   * @param {string} userAudioFilePath - The path to the audio file.
   * @param {string} referenceAudioFilePath - The reference text for comparison.
   * @returns {Promise<AnalysisResult>} - The result of the speech analysis.
   */
  async execute(userAudioFilePath: string, referenceAudioFilePath: string): Promise<AnalysisResult> {
    const userSample = await this.speechService.analyzeAudio(userAudioFilePath)
    const referenceSample = await this.speechService.analyzeAudio(referenceAudioFilePath)

    const userAudioFile = new AudioFile(userAudioFilePath, userSample, 'wav')
    const referenceAudioFile = new AudioFile(referenceAudioFilePath, referenceSample, 'wav')

    const score = this.scoringService.calculateScore(userAudioFile, referenceAudioFile)
    return new AnalysisResult(userAudioFilePath, score)
  }
}
