import { Speech } from '@entity/Speech'

export interface SpeechRepository {
  findById(id: string): Promise<Speech | null>
  save(speech: Speech): Promise<void>
  deleteById(id: string): Promise<void>
}
