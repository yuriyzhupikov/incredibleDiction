import { AudioRecorder } from '@infrastructure/audio/AudioRecorder'

import { CLIInput } from '../cli.input'
import { CLIOutput } from '../cli.output'

/**
 * Controller to manage audio recording.
 */
export class RecordController {
  /**
   * @param {AudioRecorder} audioRecorder - The audio recorder instance.
   * @param {CLIInput} cliInput - CLI input handler.
   * @param {CLIOutput} cliOutput - CLI output handler.
   */
  constructor(
    private readonly audioRecorder: AudioRecorder,
    private readonly cliInput: CLIInput,
    private readonly cliOutput: CLIOutput,
  ) {}

  /**
   * Handles the recording workflow.
   * @returns {Promise<void>} - Resolves when the recording process completes.
   */
  async handle(): Promise<void> {
    try {
      const outputFile = this.cliInput.prompt('Enter the path to save the audio file (e.g., ./audio/output.wav):')
      const durationStr = this.cliInput.prompt('Enter the recording duration (in seconds):')
      const duration = parseInt(durationStr, 10)

      if (isNaN(duration) || duration <= 0) {
        throw new Error('Invalid value for recording duration.')
      }

      this.cliOutput.info('Recording started...')
      await this.audioRecorder.recordAudio(outputFile, duration)

      this.cliOutput.success(`Recording successfully completed and saved to ${outputFile}`)
    } catch (error: Error) {
      this.cliOutput.error('An error occurred during audio recording:')
      this.cliOutput.error(error.message)
    }
  }
}