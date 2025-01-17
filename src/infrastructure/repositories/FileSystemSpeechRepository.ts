import { deleteFile, getPathFile, readFile, writeFile } from '@lib/file'

import { SpeechRepository } from '@repository/SpeechRepository'

import { Speech } from '@entity/Speech'

/**
 *
 */
export class FileSystemSpeechRepository implements SpeechRepository {
  private readonly basePath: string

  /** @param basePath */
  constructor(basePath: string) {
    this.basePath = basePath
  }

  /** @param id */
  async findById(id: string): Promise<Speech | null> {
    const filePath = getPathFile(this.basePath, `${id}.json`)
    try {
      const data = await readFile(filePath, 'utf-8')
      return JSON.parse(data) as Speech
    } catch (error) {
      return null
    }
  }

  /** @param speech */
  async save(speech: Speech): Promise<void> {
    const filePath = getPathFile(this.basePath, `${speech.getId()}.json`)
    await writeFile(filePath, JSON.stringify(speech))
  }

  /**
   *
   * @param id
   */
  async deleteById(id: string): Promise<void> {
    const filePath = getPathFile(this.basePath, `${id}.json`)
    try {
      await deleteFile(filePath)
    } catch (error: Error) {
      console.error(`Error deleting file: ${error.message}`)
    }
  }
}
