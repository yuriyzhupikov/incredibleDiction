import { deleteFile, getPathFile, writeFile } from '@lib/file'

import { AudioStorageRepository } from '@repository/AudioStorageRepository'

/**
 *
 */
export class FileSystemAudioStorage implements AudioStorageRepository {
  private readonly basePath: string

  /** @param basePath */
  constructor(basePath: string) {
    this.basePath = basePath
  }

  /**
   * @param userId
   * @param fileName
   * @param fileBuffer
   */
  async save(userId: string, fileName: string, fileBuffer: Buffer): Promise<string> {
    const filePath = getPathFile(this.basePath, userId, fileName)
    await writeFile(filePath, fileBuffer)
    return filePath
  }

  /**
   *
   * @param userId
   * @param fileName
   */
  async delete(userId: string, fileName: string): Promise<void> {
    const filePath = getPathFile(this.basePath, userId, fileName)
    await deleteFile(filePath)
  }
}
