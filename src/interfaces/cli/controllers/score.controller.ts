import { AnalyzeSpeechUseCase } from '@application/usecase/analyze-speech.usecase'

import { CLIInput } from '../cli.input'
import { CLIOutput } from '../cli.output'

/** Controller to evaluate speech accuracy. */
export class ScoreController {
  /**
   * @param {AnalyzeSpeechUseCase} analyzeSpeechUseCase - The use case for analyzing speech.
   * @param {CLIInput} cliInput - CLI input handler.
   * @param {CLIOutput} cliOutput - CLI output handler.
   */
  constructor(
    private readonly analyzeSpeechUseCase: AnalyzeSpeechUseCase,
    private readonly cliInput: CLIInput,
    private readonly cliOutput: CLIOutput,
  ) {}

  /**
   * Handles the scoring workflow.
   *
   * @returns {Promise<void>} - Resolves when the process completes.
   */
  async handle(): Promise<void> {
    try {
      const audioFilePath = this.cliInput.prompt('Enter the path to the audio file:')
      const referenceText = this.cliInput.prompt('Enter the reference text:')

      const result = await this.analyzeSpeechUseCase.execute(audioFilePath, referenceText)

      this.cliOutput.success('Speech accuracy evaluation completed!')
      this.cliOutput.info(`Text from audio: ${result.getAnalyzedText()}`)
      this.cliOutput.info(`Reference text: ${result.getReferenceText()}`)
      this.cliOutput.info(`Accuracy score: ${result.getScore().getValue()}`)
    } catch (error) {
      this.cliOutput.error(error, 'An error occurred during speech analysis:')
    }
  }
}
