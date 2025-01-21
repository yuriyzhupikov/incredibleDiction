import { AudioProcessor } from '@infrastructure/audio/AudioProcessor'
import { AudioFile } from '@value-object/AudioFile'

import { CLIInput } from '../../interfaces/cli/cli.input'
import { CLIOutput } from '../../interfaces/cli/cli.output'
import { ScoringService } from '../services/scoring.service'
import { SpeechService } from '../services/speech-analysis.service'

/** Use case for testing speech and calculating accuracy scores. */
export class RepeatSpeechUseCase {
  /**
   * @param {SpeechService} speechService - Service for speech analysis.
   * @param {ScoringService} scoringService - Service for calculating scores.
   * @param {AudioProcessor} audioProcessor - Service for processing audio.
   * @param {CLIInput} cliInput - CLI input interface for user interaction.
   * @param {CLIOutput} cliOutput - CLI output interface for displaying messages.
   */
  constructor(
    private readonly speechService: SpeechService,
    private readonly scoringService: ScoringService,
    private readonly audioProcessor: AudioProcessor,
    private readonly cliInput: CLIInput,
    private readonly cliOutput: CLIOutput,
  ) {}

  /**
   * Executes the use case for speech repetition and scoring.
   *
   * @param {string} originalAudioPath - Path to the original audio file to be played and analyzed.
   * @returns {Promise<void>}
   */
  async execute(originalAudioPath: string): Promise<void> {
    do {
      this.cliOutput.info('Listen to the original audio file...')
      await this.audioProcessor.play(originalAudioPath)

      this.cliOutput.info('Repeat what you heard. Recording has started...')
      const userAudioPath = `${process.cwd()}/uploads/audio/user1/user1-recording.wav`
      await this.audioProcessor.record(userAudioPath, 5)

      this.cliOutput.info('Analyzing your recording...')
      const originalSample = await this.speechService.analyzeAudio(originalAudioPath)
      const userSample = await this.speechService.analyzeAudio(userAudioPath)

      const userAudio = new AudioFile(userAudioPath, userSample, 'wav')
      const originAudio = new AudioFile(originalAudioPath, originalSample, 'wav')

      const score = this.scoringService.calculateScore(userAudio, originAudio)

      this.cliOutput.info(`Your score: ${score.getValue()} out of 100`)
      await this.audioProcessor.displayWaveformToConsole(userAudioPath, 80, 15)

      if (score.getValue() >= 70) {
        this.cliOutput.success('Congratulations! You successfully repeated the speech.')
        break
      } else {
        const choice = this.cliInput.prompt('Try again? Choose an option: (1) Retry (2) Finish: ')

        if (choice === '2') {
          this.cliOutput.error(new Error(''), 'You have ended the process.')
          break
        }
      }
    } while (true)
  }
}
