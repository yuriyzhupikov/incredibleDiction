import { SpeechRepository } from '@repository/SpeechRepository'

import { Speech } from '@entity/Speech'

/** Mock implementation of the SpeechRepository interface. Provides in-memory storage for Speech entities. */
export class MockSpeechRepository implements SpeechRepository {
  private speeches: Map<string, Speech> = new Map()

  /**
   * Finds a speech by its ID.
   *
   * @param {string} id - The ID of the speech to find.
   * @returns {Promise<Speech | null>} The speech entity or null if not found.
   */
  async findById(id: string): Promise<Speech | null> {
    return this.speeches.get(id) || null
  }

  /**
   * Saves a speech entity to the repository.
   *
   * @param {Speech} speech - The speech entity to save.
   * @returns {Promise<void>} Resolves when the speech is saved.
   */
  async save(speech: Speech): Promise<void> {
    this.speeches.set(speech.getId(), speech)
  }

  /**
   * Deletes a speech entity by its ID.
   *
   * @param {string} id - The ID of the speech to delete.
   * @returns {Promise<void>} Resolves when the speech is deleted.
   */
  async deleteById(id: string): Promise<void> {
    this.speeches.delete(id)
  }
}
