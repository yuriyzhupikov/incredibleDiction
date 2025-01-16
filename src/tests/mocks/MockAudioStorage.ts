import { AudioStorageRepository } from '@repository/AudioStorageRepository'

export class MockAudioStorage implements AudioStorageRepository {
  private storage: Map<string, Map<string, Buffer>> = new Map()

  async save(userId: string, fileName: string, fileBuffer: Buffer): Promise<string> {
    if (!this.storage.has(userId)) {
      this.storage.set(userId, new Map())
    }

    this.storage.get(userId)!.set(fileName, fileBuffer)

    return `mock://${userId}/${fileName}`
  }

  async delete(userId: string, fileName: string): Promise<void> {
    this.storage.get(userId)?.delete(fileName)
  }
}
