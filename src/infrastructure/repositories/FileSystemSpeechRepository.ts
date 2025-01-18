import { handleError } from '@lib/error'
import { deleteFile, getPathFile, readFile, writeFile } from '@lib/file'

import { SpeechRepository } from '@repository/SpeechRepository'

import { Speech } from '@entity/Speech'

/** Repository for speech data storage in the file system. */
export class FileSystemSpeechRepository implements SpeechRepository {
  private readonly basePath: string

  /** @param {string} basePath - The base directory for storing speech data. */
  constructor(basePath: string) {
    this.basePath = basePath
  }

  /**
   * Finds a speech record by ID.
   *
   * @param {string} id - The ID of the speech record.
   * @returns {Promise<Speech | null>} - The speech record or null if not found.
   */
  async findById(id: string): Promise<Speech | null> {
    const filePath = getPathFile(this.basePath, `${id}.json`)
    try {
      const data = await readFile(filePath, 'utf-8')
      return JSON.parse(data.toString()) as Speech
    } catch (error) {
      handleError(error, 'Parsing error string')
      return null
    }
  }

  /**
   * Saves a speech record to the file system.
   *
   * @param {Speech} speech - The speech record to save.
   * @returns {Promise<void>} - Resolves when the record is saved.
   */
  async save(speech: Speech): Promise<void> {
    const filePath = getPathFile(this.basePath, `${speech.getId()}.json`)
    await writeFile(filePath, JSON.stringify(speech))
  }

  /**
   * Deletes a speech record by ID.
   *
   * @param {string} id - The ID of the speech record.
   * @returns {Promise<void>} - Resolves when the record is deleted.
   */
  async deleteById(id: string): Promise<void> {
    const filePath = getPathFile(this.basePath, `${id}.json`)
    try {
      await deleteFile(filePath)
    } catch (error) {
      handleError(error, 'Error deleting file')
    }
  }
}
