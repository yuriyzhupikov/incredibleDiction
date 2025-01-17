import { exec } from 'child_process'
import { promisify } from 'util'

import { record } from 'node-record-lpcm16'

const execAsync = promisify(exec)

/** @param audioFilePath */
export const convertAudioToText = async (audioFilePath: string): Promise<string> => {
  const result = await execAsync(`some-audio-to-text-tool ${audioFilePath}`)
  return result.trim()
}

/** @param options */
export const recordAudio = (options?: Parameters<typeof record>[0]): ReturnType<typeof record> => {
  return record(options)
}

/**
 *
 * @param samples
 * @param chunkSize
 */
export const normalize = (samples, chunkSize) => {
  const normalized = []
  const maxAmplitude = Math.max(...samples.map(Math.abs))
  for (let i = 0; i < samples.length; i += chunkSize) {
    const chunk = samples.slice(i, i + chunkSize)
    normalized.push(...chunk.map((sample) => sample / maxAmplitude))
  }

  return normalized
}

/**
 *
 * @param samples
 * @param windowSize
 */
export const smoothOptimized = (samples, windowSize) => {
  const smoothed = []
  const len = samples.length
  let sum = 0
  let count = 0

  for (let i = 0; i < len; i++) {
    // Добавляем текущий элемент в окно
    sum += samples[i]
    count++

    // Удаляем элемент, выходящий за пределы окна
    if (i >= windowSize) {
      sum -= samples[i - windowSize]
      count--
    }

    // Вычисляем среднее значение
    smoothed.push(sum / count)
  }

  return smoothed
}

/**
 *
 * @param samples
 * @param windowSize
 */
function smooth(samples, windowSize) {
  const smoothed = []
  const len = samples.length

  for (let i = 0; i < len; i++) {
    let sum = 0
    let count = 0

    // Суммируем значения в окне
    for (let j = Math.max(0, i - windowSize); j < Math.min(len, i + windowSize); j++) {
      sum += samples[j]
      count++
    }

    // Вычисляем среднее значение
    smoothed.push(sum / count)
  }

  return smoothed
}