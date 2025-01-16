import { AnalyzeSpeechUseCase } from '@application/usecase/analyze-speech.usecase'

import { CLIInput } from '../cli.input'
import { CLIOutput } from '../cli.output'

export class ScoreController {
  constructor(
    private readonly analyzeSpeechUseCase: AnalyzeSpeechUseCase,
    private readonly cliInput: CLIInput,
    private readonly cliOutput: CLIOutput,
  ) {}

  async handle(): Promise<void> {
    try {
      // 1. Получаем путь к аудиофайлу
      const audioFilePath = this.cliInput.prompt('Введите путь к аудиофайлу:')

      // 2. Получаем эталонный текст
      const referenceText = this.cliInput.prompt('Введите эталонный текст:')

      // 3. Вызываем Use Case для анализа речи
      const result = await this.analyzeSpeechUseCase.execute(audioFilePath, referenceText)

      // 4. Выводим результат
      this.cliOutput.success('Оценка точности речи завершена!')
      this.cliOutput.info(`Текст из аудио: ${result.getAnalyzedText()}`)
      this.cliOutput.info(`Эталонный текст: ${result.getReferenceText()}`)
      this.cliOutput.info(`Баллы за точность: ${result.getScore().getValue()}`)
    } catch (error) {
      // Обработка ошибок
      this.cliOutput.error('Произошла ошибка во время анализа речи:')
      this.cliOutput.error(error.message)
    }
  }
}
