import { Speech } from '@entity/Speech'
import { SpeechRepository } from '@repository/SpeechRepository'

export class MockSpeechRepository implements SpeechRepository {
  private speeches: Map<string, Speech> = new Map()

  async findById(id: string): Promise<Speech | null> {
    return this.speeches.get(id) || null
  }

  async save(speech: Speech): Promise<void> {
    this.speeches.set(speech.getId(), speech)
  }

  async deleteById(id: string): Promise<void> {
    this.speeches.delete(id)
  }
}
