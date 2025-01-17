/**
 * Interface for the audio storage repository.
 */
export interface AudioStorageRepository {
  /**
   * Saves an audio file.
   *
   * @param {string} userId - The user identifier.
   * @param {string} fileName - The name of the file.
   * @param {Buffer} fileBuffer - The file data.
   * @returns {Promise<string>} The path to the saved file (or URL in case of cloud storage).
   */
  save(userId: string, fileName: string, fileBuffer: Buffer): Promise<string>

  /**
   * Deletes an audio file.
   *
   * @param {string} userId - The user identifier.
   * @param {string} fileName - The name of the file.
   * @returns {Promise<void>}
   */
  delete(userId: string, fileName: string): Promise<void>
}
