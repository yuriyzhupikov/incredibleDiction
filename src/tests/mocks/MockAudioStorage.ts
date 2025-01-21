import { AudioStorageRepository } from '@repository/AudioStorageRepository'

/** Mock implementation of the AudioStorageRepository interface. Provides in-memory storage for audio files. */
export class MockAudioStorage implements AudioStorageRepository {
  private storage: Map<string, Map<string, Buffer>> = new Map()

  /**
   * Saves a file buffer for a given user.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} fileName - The name of the file.
   * @param {Buffer} fileBuffer - The file's data as a buffer.
   * @returns {Promise<string>} A mock file URL.
   */
  async save(userId: string, fileName: string, fileBuffer: Buffer): Promise<string> {
    if (!this.storage.has(userId)) {
      this.storage.set(userId, new Map())
    }

    this.storage.get(userId)!.set(fileName, fileBuffer)

    return `mock://${userId}/${fileName}`
  }

  /**
   * Deletes a file for a given user.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} fileName - The name of the file to delete.
   * @returns {Promise<void>} Resolves when the file is deleted.
   */
  async delete(userId: string, fileName: string): Promise<void> {
    this.storage.get(userId)?.delete(fileName)
  }
}
