import { AudioStorageRepository } from '@repository/AudioStorageRepository'

import { deleteFile, getPathFile, writeFile } from '@lib/file'

export class FileSystemAudioStorage implements AudioStorageRepository {
  private readonly basePath: string

  constructor(basePath: string) {
    this.basePath = basePath
  }

  async save(userId: string, fileName: string, fileBuffer: Buffer): Promise<string> {
    const filePath = getPathFile(this.basePath, userId, fileName)
    await writeFile(filePath, fileBuffer)
    return filePath
  }

  async delete(userId: string, fileName: string): Promise<void> {
    const filePath = getPathFile(this.basePath, userId, fileName)
    await deleteFile(filePath)
  }
}
