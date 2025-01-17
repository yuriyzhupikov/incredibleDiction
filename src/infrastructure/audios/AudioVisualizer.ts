import { amplitudeScreenTransformStream, createConsoleWriteStream, createFileReadStream } from '@lib/stream'
import { visualizeAudio } from '@lib/visualize'

/**
 * Provides functionality for audio visualization.
 */
export class AudioVisualizer {
  /**
   * Displays the waveform of an audio file in the console.
   * @param {string} audioFilePath - The path to the audio file.
   * @returns {Promise<void>} - Resolves when visualization is complete.
   */
  async displayWaveform(audioFilePath: string): Promise<void> {
    const inputStream = createFileReadStream(audioFilePath)
    const outputStream = createConsoleWriteStream()
    const transformStream = amplitudeScreenTransformStream(100, 20)
    await visualizeAudio({ inputStream, transformStream, outputStream })
  }
}
