import record from 'node-record-lpcm16'

import { createFileWriteStream } from '@lib/stream'

export class AudioRecorder {
  async recordAudio(outputFile: string, duration: number): Promise<void> {
    console.log(`Запись началась: ${duration} секунд`)
    const file = createFileWriteStream(outputFile, { encoding: 'binary' })

    const recording = record.record({ sampleRate: 16000 }).stream().pipe(file)

    await new Promise((resolve) =>
      setTimeout(() => {
        recording.end()
        console.log('Запись завершена.')
        resolve(null)
      }, duration * 1000),
    )
  }
}
