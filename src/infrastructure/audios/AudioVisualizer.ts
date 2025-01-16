import { amplitudeScreenTransformStream, createConsoleWriteStream, createFileReadStream } from '@lib/stream'
import { visualizeAudio } from '@lib/visualize'

export class AudioVisualizer {
  async displayWaveform(audioFilePath: string): Promise<void> {
    const inputStream = createFileReadStream(audioFilePath)
    const outputStream = createConsoleWriteStream()
    const transformStream = amplitudeScreenTransformStream(100, 20)
    await visualizeAudio({ inputStream, transformStream, outputStream })
  }
}
