import { Readable, Writable, Duplex } from 'node:stream'

import ffmpeg from 'fluent-ffmpeg'

/**
 * Processes an audio stream and applies transformations to visualize audio data.
 *
 * @param {Object} params
 * @param {Readable} params.inputStream - The input audio stream.
 * @param {Duplex} params.transformStream - The stream to transform audio data.
 * @param {Writable} params.outputStream - The output stream to write transformed data.
 * @returns {Promise<void>}
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
      .format('f32le')
      .audioChannels(1)
      .audioFrequency(44100)
      .on('error', reject)
      .on('end', () => {
        outputStream.end()
        resolve()
      })
      .pipe(transformStream)
      .pipe(outputStream)
  })
}
