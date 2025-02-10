import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

export const s3 = new S3Client({ region: process.env.AWS_REGION })

/**
 * @param {string} bucketName
 * @param {string} key
 * @param {Buffer} body
 * @returns {string}
 */
export const uploadToS3 = async (bucketName: string, key: string, body: Buffer): Promise<string> => {
  await s3.send(new PutObjectCommand({ Bucket: bucketName, Key: key, Body: body }))
  return `https://${bucketName}.s3.amazonaws.com/${key}`
}

/**
 * @param {string} bucketName
 * @param {string} key
 */
export const deleteFromS3 = async (bucketName: string, key: string): Promise<void> => {
  await s3.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }))
}
