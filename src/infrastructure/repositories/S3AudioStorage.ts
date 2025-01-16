import { AudioStorageRepository } from '@repository/AudioStorageRepository'

import { deleteFromS3, uploadToS3 } from '@lib/aws-s3'

export class S3AudioStorage implements AudioStorageRepository {
  private readonly bucketName: string

  constructor(bucketName: string) {
    this.bucketName = bucketName
  }

  async save(userId: string, fileName: string, fileBuffer: Buffer): Promise<string> {
    const key = `${userId}/${fileName}`
    return await uploadToS3(this.bucketName, key, fileBuffer)
  }

  async delete(userId: string, fileName: string): Promise<void> {
    const key = `${userId}/${fileName}`
    await deleteFromS3(this.bucketName, key)
  }
}
