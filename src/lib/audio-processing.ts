import { exec } from 'child_process'
import { promisify } from 'util'

import { record } from 'node-record-lpcm16'

const execAsync = promisify(exec)

export const convertAudioToText = async (audioFilePath: string): Promise<string> => {
  const result = await execAsync(`some-audio-to-text-tool ${audioFilePath}`)
  return result.trim()
}

export const normalizeAudio = async (audioFilePath: string): Promise<void> => {
  await execAsync(`normalize-audio ${audioFilePath}`)
}

export const recordAudio = (options?: Parameters<typeof record>[0]): ReturnType<typeof record> => {
  return record(options)
}
