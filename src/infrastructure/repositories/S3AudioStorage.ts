import { deleteFromS3, uploadToS3 } from '@lib/aws-s3'

import { AudioStorageRepository } from '@repository/AudioStorageRepository'

/**
 * Repository for audio storage in AWS S3.
 */
export class S3AudioStorage implements AudioStorageRepository {
  private readonly bucketName: string

  /**
   * @param {string} bucketName - The S3 bucket name for storing audio files.
   */
  constructor(bucketName: string) {
    this.bucketName = bucketName
  }

  /**
   * Saves an audio file to S3.
   * @param {string} userId - The user ID.
   * @param {string} fileName - The name of the file to save.
   * @param {Buffer} fileBuffer - The audio file buffer.
   * @returns {Promise<string>} - The S3 object key where the audio was saved.
   */
  async save(userId: string, fileName: string, fileBuffer: Buffer): Promise<string> {
    const key = `${userId}/${fileName}`
    return await uploadToS3(this.bucketName, key, fileBuffer)
  }

  /**
   * Deletes an audio file from S3.
   * @param {string} userId - The user ID.
   * @param {string} fileName - The name of the file to delete.
   * @returns {Promise<void>} - Resolves when the file is deleted.
   */
  async delete(userId: string, fileName: string): Promise<void> {
    const key = `${userId}/${fileName}`
    await deleteFromS3(this.bucketName, key)
  }
}
