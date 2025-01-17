import { deleteFile, getPathFile, writeFile } from '@lib/file'

import { AudioStorageRepository } from '@repository/AudioStorageRepository'

/**
 * Repository for audio storage in the file system.
 */
export class FileSystemAudioStorage implements AudioStorageRepository {
  private readonly basePath: string

  /**
   * @param {string} basePath - The base directory for storing audio files.
   */
  constructor(basePath: string) {
    this.basePath = basePath
  }

  /**
   * Saves an audio file to the file system.
   * @param {string} userId - The user ID.
   * @param {string} fileName - The name of the file to save.
   * @param {Buffer} fileBuffer - The audio file buffer.
   * @returns {Promise<string>} - The file path where the audio was saved.
   */
  async save(userId: string, fileName: string, fileBuffer: Buffer): Promise<string> {
    const filePath = getPathFile(this.basePath, userId, fileName)
    await writeFile(filePath, fileBuffer)
    return filePath
  }

  /**
   * Deletes an audio file from the file system.
   * @param {string} userId - The user ID.
   * @param {string} fileName - The name of the file to delete.
   * @returns {Promise<void>} - Resolves when the file is deleted.
   */
  async delete(userId: string, fileName: string): Promise<void> {
    const filePath = getPathFile(this.basePath, userId, fileName)
    await deleteFile(filePath)
  }
}
