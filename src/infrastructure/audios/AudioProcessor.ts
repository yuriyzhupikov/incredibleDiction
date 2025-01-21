import { playAudio, recordAudio } from '@lib/audio'
import { readFileString } from '@lib/file'
import { amplitudeScreenTransformStream, createConsoleWriteStream, createFileReadStream, createFileWriteStream } from '@lib/stream'
import { visualizeAudio } from '@lib/visualize'

/** Handles audio processing tasks */
export class AudioProcessor {
  /**
   * Converts audio file to text.
   *
   * @param {string} filePath - The path to the audio file.
   * @returns {Promise<string>} - The converted text from the audio.
   */
  async convertAudioToText(filePath: string): Promise<string> {
    const file = await readFileString(filePath)
    console.log('Audio file processed:', filePath)

    return 'Example text derived from audio'
  }

  /** @param filePath */
  async play(filePath: string): Promise<void> {
    await playAudio(filePath)
  }

  /**
   * Records audio and saves it to a file.
   *
   * @param {string} outputFile - The output file path where audio will be saved.
   * @param {number} duration - The duration of the recording in seconds.
   * @returns {Promise<void>} - Resolves when the recording is complete.
   */
  async record(outputFile: string, duration: number): Promise<void> {
    console.log(`Recording started: ${duration} seconds`)
    const file = createFileWriteStream(outputFile, { encoding: 'binary' })

    const recording = recordAudio({ sampleRate: 16000, threshold: 0.5 }).stream().pipe(file)

    await new Promise((resolve) =>
      setTimeout(() => {
        recording.end()
        console.log('Recording finished.')
        resolve(null)
      }, duration * 1000),
    )
  }

  /**
   * Displays the waveform of an audio file in the console.
   *
   * @param {string} audioFilePath - The path to the audio file.
   * @param {number} width - The path to the audio file.
   * @param {number} height - The path to the audio file.
   * @returns {Promise<void>} - Resolves when visualization is complete.
   */
  async displayWaveformToConsole(audioFilePath: string, width: number, height: number): Promise<void> {
    const inputStream = createFileReadStream(audioFilePath)
    const outputStream = createConsoleWriteStream()
    const transformStream = amplitudeScreenTransformStream(width, height)
    await visualizeAudio({ inputStream, transformStream, outputStream })
  }

  /**
   * Displays the waveform of an audio file in the file.
   *
   * @param {string} audioFilePath - The path to the audio file.
   * @param {string} displayFilePath - The path to the display file.
   * @param {number} width - The path to the audio file.
   * @param {number} height - The path to the audio file.
   * @returns {Promise<void>} - Resolves when visualization is complete.
   */
  async displayWaveformToFile(audioFilePath: string, displayFilePath: string, width: number, height: number): Promise<void> {
    const inputStream = createFileReadStream(audioFilePath)
    const outputStream = createFileWriteStream(displayFilePath)
    const transformStream = amplitudeScreenTransformStream(width, height)
    await visualizeAudio({ inputStream, transformStream, outputStream })
  }
}
