import { exec } from 'child_process'
import { promisify } from 'util'

import { readFileBuffer } from '@lib/file'

import DynamicTimeWarping from 'dynamic-time-warping'
import { record } from 'node-record-lpcm16'
import WavDecoder from 'wav-decoder'

const execAsync = promisify(exec)

type RecordAudioParam = Parameters<typeof record>[0]
type RecordAudioReturn = ReturnType<typeof record>

/**
 * Records audio using the microphone.
 *
 * @param {RecordAudioParam} [options] - Recording options.
 * @returns {RecordAudioReturn} An instance of the audio recording process.
 */
export const recordAudio = (options?: RecordAudioParam): RecordAudioReturn => {
  return record(options)
}

/**
 * Plays an audio file.
 *
 * @param {string} filePath - Path to the audio file (requires SoX installed).
 * @returns {Promise<void>} Resolves with the command output on success.
 */
export const playAudio = async (filePath: string): Promise<void> => {
  await execAsync(`play "${filePath}"`)
}

/**
 * Normalizes audio samples to have values in the range [0, 1].
 *
 * @param {Float32Array} samples - The input audio samples.
 * @param {number} chunkSize - Size of chunks to process.
 * @returns {Float32Array} The normalized audio samples.
 */
export const normalize = (samples: globalThis.Float32Array, chunkSize: number): globalThis.Float32Array => {
  const normalized: number[] = []
  let maxAmplitude = 0
  for (const sample of samples) {
    if (sample > maxAmplitude) maxAmplitude = sample
  }
  for (let i = 0; i < samples.length; i += chunkSize) {
    const chunk = samples.slice(i, i + chunkSize)
    normalized.push(...chunk.map((sample) => sample / maxAmplitude))
  }

  return new Float32Array(normalized)
}

/**
 * Smooths audio samples using a moving average.
 *
 * @param {Float32Array} samples - The input audio samples.
 * @param {number} windowSize - The size of the smoothing window.
 * @returns {Float32Array} The smoothed audio samples.
 */
export const smooth = (samples: globalThis.Float32Array, windowSize: number): globalThis.Float32Array => {
  const smoothed = []
  const len = samples.length
  let sum = 0
  let count = 0

  for (let i = 0; i < len; i++) {
    sum += samples[i]
    count++

    if (i >= windowSize) {
      sum -= samples[i - windowSize]
      count--
    }

    smoothed.push(sum / count)
  }

  return new Float32Array(smoothed)
}

/**
 * Computes the distance between user audio samples and reference samples using DTW.
 *
 * @param {Float32Array} userSamples - The user-provided audio samples.
 * @param {Float32Array} referenceSamples - The reference audio samples.
 * @returns {number} The calculated distance.
 */
export const getDistanceAudio = (userSamples: globalThis.Float32Array, referenceSamples: globalThis.Float32Array): number => {
  const dtw = new DynamicTimeWarping<globalThis.Float32Array>(referenceSamples, userSamples, (a, b) => Math.abs(a - b))
  return dtw.getDistance()
}

/**
 * Decodes a WAV file and extracts its audio samples.
 *
 * @param {string} filePath - Path to the WAV file.
 * @returns {Promise<Float32Array>} A promise that resolves to the audio samples (mono channel).
 */
export const decodeWav = async (filePath: string): Promise<globalThis.Float32Array> => {
  const buffer = await readFileBuffer(filePath)
  const decoded = await WavDecoder.decode(buffer)
  return decoded.channelData[0] // Mono
}

/**
 * Computes the average DTW distance over multiple windows of audio samples.
 *
 * @param {Float32Array} refSamples - The reference audio samples.
 * @param {Float32Array} userSamples - The user-provided audio samples.
 * @param {number} windowSize - The size of each window.
 * @returns {number} The average DTW distance.
 */
export const windowedDTW = (refSamples: globalThis.Float32Array, userSamples: globalThis.Float32Array, windowSize: number): number => {
  const numWindows = Math.ceil(Math.min(refSamples.length, userSamples.length) / windowSize)
  let totalDistance = 0

  for (let i = 0; i < numWindows; i++) {
    const refWindow = refSamples.slice(i * windowSize, (i + 1) * windowSize)
    const userWindow = userSamples.slice(i * windowSize, (i + 1) * windowSize)

    const dist = getDistanceAudio(userWindow, refWindow)
    totalDistance += dist
  }

  return totalDistance / numWindows
}
