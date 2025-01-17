import { AudioRecorder } from '@infrastructure/audio/AudioRecorder'

import { CLIInput } from '../cli.input'
import { CLIOutput } from '../cli.output'

/**
 *
 */
export class RecordController {
  /**
   *
   * @param audioRecorder
   * @param cliInput
   * @param cliOutput
   */
  constructor(
    private readonly audioRecorder: AudioRecorder,
    private readonly cliInput: CLIInput,
    private readonly cliOutput: CLIOutput,
  ) {}

  /**
   *
   */
  async handle(): Promise<void> {
    try {
      // 1. Получаем путь для сохранения аудиофайла
      const outputFile = this.cliInput.prompt('Введите путь для сохранения аудиофайла (например, ./audio/output.wav):')

      // 2. Получаем длительность записи от пользователя
      const durationStr = this.cliInput.prompt('Введите длительность записи (в секундах):')
      const duration = parseInt(durationStr, 10)

      if (isNaN(duration) || duration <= 0) {
        throw new Error('Неверное значение для длительности записи.')
      }

      // 3. Запускаем процесс записи
      this.cliOutput.info('Запись началась...')
      await this.audioRecorder.recordAudio(outputFile, duration)

      // 4. Уведомляем об успешной записи
      this.cliOutput.success(`Запись успешно завершена и сохранена в ${outputFile}`)
    } catch (error: Error) {
      // Обработка ошибок
      this.cliOutput.error('Произошла ошибка во время записи аудио:')
      this.cliOutput.error(error.message)
    }
  }
}
