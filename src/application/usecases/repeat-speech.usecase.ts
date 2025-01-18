import { AudioProcessor } from '@infrastructure/audio/AudioProcessor'
import { AudioFile } from '@value-object/AudioFile'

import { CLIInput } from '../../interfaces/cli/cli.input'
import { CLIOutput } from '../../interfaces/cli/cli.output'
import { ScoringService } from '../services/scoring.service'
import { SpeechService } from '../services/speech-analysis.service'

/** Use case for testing speech and calculating accuracy scores. */
export class RepeatSpeechUseCase {
  /**
   * @param {SpeechService} speechService
   * @param {ScoringService} scoringService
   * @param {AudioProcessor} audioProcessor
   * @param {CLIInput} cliInput
   * @param {CLIOutput} cliOutput
   */
  constructor(
    private readonly speechService: SpeechService,
    private readonly scoringService: ScoringService,
    private readonly audioProcessor: AudioProcessor,
    private readonly cliInput: CLIInput,
    private readonly cliOutput: CLIOutput,
  ) {}

  /** @param originalAudioPath */
  async execute(originalAudioPath: string): Promise<void> {
    do {
      this.cliOutput.info('Слушайте оригинальный аудиофайл...')
      await this.audioProcessor.play(originalAudioPath)

      this.cliOutput.info('Повторите услышанное. Запись началась...')
      const userAudioPath = `${process.cwd()}/uploads/audio/user1/user1-recording.wav`
      await this.audioProcessor.record(userAudioPath, 5)

      this.cliOutput.info('Анализируем вашу запись...')
      const originalSample = await this.speechService.analyzeAudio(originalAudioPath)
      const userSample = await this.speechService.analyzeAudio(userAudioPath)

      const userAudio = new AudioFile(userAudioPath, userSample, 'wav')
      const originAudio = new AudioFile(originalAudioPath, originalSample, 'wav')

      const score = this.scoringService.calculateScore(userAudio, originAudio)

      this.cliOutput.info(`Ваша оценка: ${score.getValue()} из 100`)
      await this.audioProcessor.displayWaveformToConsole(userAudioPath)

      if (score.getValue() >= 70) {
        this.cliOutput.success('Поздравляем! Вы успешно повторили речь.')
        break
      } else {
        const choice = this.cliInput.prompt('Попробуйте ещё раз? Выберите действие: (1) Повторить (2) Завершить: ')

        if (choice === '2') {
          this.cliOutput.error(new Error(''), 'Вы завершили процесс.')
          break
        }
      }
    } while (true)
  }
}
