import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })

/**
 * @param bucketName
 * @param key
 * @param body
 */
export const uploadToS3 = async (bucketName: string, key: string, body: Buffer): Promise<string> => {
  await s3.send(new PutObjectCommand({ Bucket: bucketName, Key: key, Body: body }))
  return `https://${bucketName}.s3.amazonaws.com/${key}`
}

/**
 * @param bucketName
 * @param key
 */
export const deleteFromS3 = async (bucketName: string, key: string): Promise<void> => {
  await s3.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }))
}
