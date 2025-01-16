import fs from 'fs/promises'
import path from 'path'

export const getPathFile = (...paths: string[]) => {
  return path.join(...paths)
}

export const readFile = async (filePath: string, encoding: BufferEncoding = 'utf-8'): Promise<string> => {
  return await fs.readFile(filePath, encoding)
}

export const writeFile = async (filePath: string, data: string | Buffer): Promise<void> => {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, data)
}

export const deleteFile = async (filePath: string): Promise<void> => {
  try {
    await fs.unlink(filePath)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error
    }
  }
}

export const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}
