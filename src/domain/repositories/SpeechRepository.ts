import { Speech } from '@entity/Speech'

/**
 * Interface for the speech repository.
 */
export interface SpeechRepository {
  /**
   * Finds a speech by its ID.
   *
   * @param {string} id - The ID of the speech.
   * @returns {Promise<Speech | null>} The speech if found, otherwise null.
   */
  findById(id: string): Promise<Speech | null>

  /**
   * Saves a speech.
   *
   * @param {Speech} speech - The speech to save.
   * @returns {Promise<void>}
   */
  save(speech: Speech): Promise<void>

  /**
   * Deletes a speech by its ID.
   *
   * @param {string} id - The ID of the speech to delete.
   * @returns {Promise<void>}
   */
  deleteById(id: string): Promise<void>
}
