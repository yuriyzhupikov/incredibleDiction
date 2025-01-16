import { AnalyzeSpeechUseCase } from '@application/usecase/analyze-speech.usecase'

import { CLIInput } from '../cli.input'
import { CLIOutput } from '../cli.output'

export class AnalyzeController {
  constructor(
    private readonly analyzeSpeechUseCase: AnalyzeSpeechUseCase,
    private readonly cliInput: CLIInput,
    private readonly cliOutput: CLIOutput,
  ) {}

  async handle(): Promise<void> {
    // 1. Запрашиваем у пользователя данные через CLI
    const audioFilePath = this.cliInput.prompt('Введите путь к аудиофайлу:')
    const referenceText = this.cliInput.prompt('Введите эталонный текст:')

    try {
      // 2. Вызываем Use Case для анализа речи
      const result = await this.analyzeSpeechUseCase.execute(audioFilePath, referenceText)

      // 3. Выводим результат в консоль
      this.cliOutput.success('Анализ завершён!')
      this.cliOutput.info(`Текст из аудио: ${result.getAnalyzedText()}`)
      this.cliOutput.info(`Эталонный текст: ${result.getReferenceText()}`)
      this.cliOutput.info(`Баллы за точность: ${result.getScore().getValue()}`)
    } catch (error) {
      // Обработка ошибок
      this.cliOutput.error('Ошибка во время анализа речи:')
      this.cliOutput.error(error.message)
    }
  }
}
