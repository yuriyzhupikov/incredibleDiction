import { Readable, Writable, Duplex } from 'node:stream'

import ffmpeg from 'fluent-ffmpeg'

/**
 * @param root0
 * @param root0.inputStream
 * @param root0.transformStream
 * @param root0.outputStream
 */
export const visualizeAudio = ({
  inputStream,
  transformStream,
  outputStream,
}: {
  inputStream: Readable
  transformStream: Duplex
  outputStream: Writable
}): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(inputStream)
      .inputFormat('wav')
      .format('f32le') // format PCM 32-bit float
      .audioChannels(1) // mono
      .audioFrequency(44100)
      // .audioFilters('afftdn=nf=-45')
      // .audioFilters('anoisesuppress=detections=0.3')
      .on('error', (err) => reject(err))
      .on('end', () => {
        outputStream.end()
        resolve()
      })
      .pipe(transformStream)
      .pipe(outputStream)
  })
}
