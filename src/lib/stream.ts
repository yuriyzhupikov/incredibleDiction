import fs, { PathLike, ReadStream, WriteStream } from 'node:fs'
import { Transform, TransformCallback, Writable } from 'node:stream'

export const amplitudeScreenTransformStream = (maxWidth: number, maxHeight: number) => {
  let buffer = Buffer.alloc(0)
  const amplitudes = []

  return new Transform({
    transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
      buffer = Buffer.concat([buffer, chunk])

      // Обрабатываем только полные семплы (32-бит float = 4 байта)
      while (buffer.length >= 4) {
        const sample = buffer.readFloatLE(0) // Считываем 1 семпл
        buffer = buffer.subarray(4)

        const amplitude = Math.abs(sample) // Нормализуем амплитуду
        amplitudes.push(amplitude) // Сохраняем амплитуду
      }

      callback()
    },
    flush(callback: TransformCallback) {
      // Нормализуем данные по ширине экрана
      const step = Math.ceil(amplitudes.length / maxWidth) // Шаг выборки данных
      const normalizedAmplitudes = []

      for (let i = 0; i < amplitudes.length; i += step) {
        // Берем максимум из группы для сохранения формы волны
        const group = amplitudes.slice(i, i + step)
        // const avg = group.reduce((sum, next) => sum + next) / group.length
        const max = Math.max(...group)
        normalizedAmplitudes.push(max)
      }

      // Нормализуем данные по высоте экрана
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

export const createConsoleWriteStream = () => {
  return new Writable({
    write(chunk, encoding, callback) {
      process.stdout.write(chunk.toString())
      callback()
    },
  })
}

export const createFileReadStream = (path: PathLike, options?: BufferEncoding): ReadStream => {
  return fs.createReadStream(path, options)
}

export const createFileWriteStream = (path: PathLike, options?: BufferEncoding): WriteStream => {
  return fs.createWriteStream(path, options)
}
