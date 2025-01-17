import { recordAudio } from '@lib/audio-processing'
import { createFileWriteStream } from '@lib/stream'

/**
 * Manages audio recording tasks.
 */
export class AudioRecorder {
  /**
   * Records audio and saves it to a file.
   * @param {string} outputFile - The output file path where audio will be saved.
   * @param {number} duration - The duration of the recording in seconds.
   * @returns {Promise<void>} - Resolves when the recording is complete.
   */
  async recordAudio(outputFile: string, duration: number): Promise<void> {
    console.log(`Recording started: ${duration} seconds`)
    const file = createFileWriteStream(outputFile, { encoding: 'binary' })

    const recording = recordAudio({ sampleRate: 16000 }).stream().pipe(file)

    await new Promise((resolve) =>
      setTimeout(() => {
        recording.end()
        console.log('Recording finished.')
        resolve(null)
      }, duration * 1000),
    )
  }
}
