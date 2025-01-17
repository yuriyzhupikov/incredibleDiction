import { deleteFromS3, uploadToS3 } from '@lib/aws-s3'

import { AudioStorageRepository } from '@repository/AudioStorageRepository'

/**
 *
 */
export class S3AudioStorage implements AudioStorageRepository {
  private readonly bucketName: string

  /** @param bucketName */
  constructor(bucketName: string) {
    this.bucketName = bucketName
  }

  /**
   * @param userId
   * @param fileName
   * @param fileBuffer
   */
  async save(userId: string, fileName: string, fileBuffer: Buffer): Promise<string> {
    const key = `${userId}/${fileName}`
    return await uploadToS3(this.bucketName, key, fileBuffer)
  }

  /**
   *
   * @param userId
   * @param fileName
   */
  async delete(userId: string, fileName: string): Promise<void> {
    const key = `${userId}/${fileName}`
    await deleteFromS3(this.bucketName, key)
  }
}
