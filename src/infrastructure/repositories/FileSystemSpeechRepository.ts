import { Speech } from '@entity/Speech'
import { SpeechRepository } from '@repository/SpeechRepository'

import { deleteFile, getPathFile, readFile, writeFile } from '@lib/file'

export class FileSystemSpeechRepository implements SpeechRepository {
  private readonly basePath: string

  constructor(basePath: string) {
    this.basePath = basePath
  }

  async findById(id: string): Promise<Speech | null> {
    const filePath = getPathFile(this.basePath, `${id}.json`)
    try {
      const data = await readFile(filePath, 'utf-8')
      return JSON.parse(data) as Speech
    } catch (error) {
      return null
    }
  }

  async save(speech: Speech): Promise<void> {
    const filePath = getPathFile(this.basePath, `${speech.getId()}.json`)
    await writeFile(filePath, JSON.stringify(speech))
  }

  async deleteById(id: string): Promise<void> {
    const filePath = getPathFile(this.basePath, `${id}.json`)
    try {
      await deleteFile(filePath)
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`)
    }
  }
}
