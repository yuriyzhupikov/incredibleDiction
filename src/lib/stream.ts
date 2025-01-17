import fs, { PathLike, ReadStream, WriteStream } from 'node:fs'
import { Transform, TransformCallback, Writable } from 'node:stream'

/**
 * Creates a Transform stream for audio amplitude visualization.
 * @param {number} maxWidth - The maximum width for the visualization.
 * @param {number} maxHeight - The maximum height for the visualization.
 * @returns {Transform}
 */
export const amplitudeScreenTransformStream = (maxWidth: number, maxHeight: number) => {
  let buffer = Buffer.alloc(0)
  const amplitudes: number[] = []

  return new Transform({
    transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
      buffer = Buffer.concat([buffer, chunk])

      while (buffer.length >= 4) {
        const sample = buffer.readFloatLE(0)
        buffer = buffer.subarray(4)

        const amplitude = Math.abs(sample)
        amplitudes.push(amplitude)
      }

      callback()
    },
    flush(callback: TransformCallback) {
      const step = Math.ceil(amplitudes.length / maxWidth)
      const normalizedAmplitudes = []

      for (let i = 0; i < amplitudes.length; i += step) {
        const group = amplitudes.slice(i, i + step)
        const max = Math.max(...group)
        normalizedAmplitudes.push(max)
      }

      const maxAmplitude = Math.max(...normalizedAmplitudes) || 1
      const scaledAmplitudes = normalizedAmplitudes.map((amp) => Math.floor((amp / maxAmplitude) * maxHeight))
      const lines = Array.from({ length: maxHeight }, () => Array(maxWidth).fill(' '))

      for (let x = 0; x < scaledAmplitudes.length; x++) {
        const height = scaledAmplitudes[x]
        for (let y = 0; y < height; y++) {
          lines[maxHeight - y - 1][x] = '█'
        }
      }

      const output = lines.map((line) => line.join('')).join('\n')
      callback(null, output + '\n')
    },
  })
}

/**
 * Creates a Writable stream for writing to the console.
 * @returns {Writable}
 */
export const createConsoleWriteStream = () => {
  return new Writable({
    write(chunk, encoding, callback) {
      process.stdout.write(chunk.toString())
      callback()
    },
  })
}

/**
 * Creates a Readable stream for reading from a file.
 * @param {PathLike} path - The file path.
 * @param {Object} [options] - Options for the Readable stream.
 * @returns {ReadStream}
 */
export const createFileReadStream = (path: PathLike, options?: any): ReadStream => {
  return fs.createReadStream(path, options)
}

/**
 * Creates a Writable stream for writing to a file.
 * @param {PathLike} path - The file path.
 * @param {Object} [options] - Options for the Writable stream.
 * @returns {WriteStream}
 */
export const createFileWriteStream = (path: PathLike, options?: any): WriteStream => {
  return fs.createWriteStream(path, options)
}
