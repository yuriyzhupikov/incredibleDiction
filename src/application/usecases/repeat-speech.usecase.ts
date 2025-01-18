import { AudioPlayer } from '@infrastructure/audio/AudioPlayer'
import { AudioRecorder } from '@infrastructure/audio/AudioRecorder'
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
   * @param {AudioRecorder} audioRecorder
   * @param {AudioPlayer} audioPlayer
   * @param {CLIInput} cliInput
   * @param {CLIOutput} cliOutput
   */
  constructor(
    private readonly speechService: SpeechService,
    private readonly scoringService: ScoringService,
    private readonly audioRecorder: AudioRecorder,
    private readonly audioPlayer: AudioPlayer,
    private readonly cliInput: CLIInput,
    private readonly cliOutput: CLIOutput,
  ) {}

  /** @param originalAudioPath */
  async execute(originalAudioPath: string): Promise<void> {
    while (true) {
      // 1. Воспроизвести оригинальный аудиофайл
      this.cliOutput.info('Слушайте оригинальный аудиофайл...')
      await this.audioPlayer.play(originalAudioPath)

      // 2. Записать речь пользователя
      const userAudioPath = `${process.cwd()}/uploads/audio/user1/user1-recording.wav`
      this.cliOutput.info('Повторите услышанное. Запись началась...')
      await this.audioRecorder.recordAudio(userAudioPath, 5) // Запись на 5 секунд

      // 3. Сравнить оригинал с записью пользователя
      this.cliOutput.info('Анализируем вашу запись...')
      const originalSample = await this.speechService.analyzeAudio(originalAudioPath)
      const userSample = await this.speechService.analyzeAudio(userAudioPath)

      const userAudio = new AudioFile(userAudioPath, userSample, 'wav')
      const originAudio = new AudioFile(originalAudioPath, originalSample, 'wav')

      const score = this.scoringService.calculateScore(userAudio, originAudio)

      // 4. Вывод результата
      this.cliOutput.info(`Ваша оценка: ${score.getValue()} из 100`)

      // 5. Проверить оценку и предложить повтор
      if (score.getValue() >= 70) {
        this.cliOutput.success('Поздравляем! Вы успешно повторили речь.')
        break
      } else {
        const choice = this.cliInput.prompt('Результат неудовлетворительный. Выберите действие: (1) Повторить (2) Завершить: ')

        if (choice === '2') {
          this.cliOutput.error(new Error(''), 'Вы завершили процесс.')
          break
        }
      }
    }
  }
}
