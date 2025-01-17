import { SpeechRepository } from '@repository/SpeechRepository'

import { Speech } from '@entity/Speech'

/**
 *
 */
export class MockSpeechRepository implements SpeechRepository {
  private speeches: Map<string, Speech> = new Map()

  /** @param id */
  async findById(id: string): Promise<Speech | null> {
    return this.speeches.get(id) || null
  }

  /** @param speech */
  async save(speech: Speech): Promise<void> {
    this.speeches.set(speech.getId(), speech)
  }

  /**
   *
   * @param id
   */
  async deleteById(id: string): Promise<void> {
    this.speeches.delete(id)
  }
}
