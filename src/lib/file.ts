import fsPromises from 'fs/promises'
import path from 'path'

/**
 * Joins multiple path segments into a single path.
 *
 * @param {...string} paths - Path segments to join.
 * @returns {string}
 */
export const getPathFile = (...paths: string[]) => {
  return path.join(...paths)
}

/**
 * Reads the content of a file.
 *
 * @param {string} filePath - The file path.
 * @param {BufferEncoding} [encoding='utf-8'] - The encoding of the file. Default is `'utf-8'`
 * @returns {Promise<string>}
 */
export const readFileString = async (filePath: string, encoding: BufferEncoding = 'utf-8'): Promise<string> => {
  return await fsPromises.readFile(filePath, encoding)
}

/**
 * Reads the content of a file.
 *
 * @param {string} filePath - The file path.
 * @returns {Promise<Buffer>}
 */
export const readFileBuffer = async (filePath: string): Promise<Buffer> => {
  return await fsPromises.readFile(filePath)
}

/**
 * Writes data to a file, creating directories if necessary.
 *
 * @param {string} filePath - The file path.
 * @param {string | Buffer} data - The data to write.
 * @returns {Promise<void>}
 */
export const writeFile = async (filePath: string, data: string | Buffer): Promise<void> => {
  await fsPromises.mkdir(path.dirname(filePath), { recursive: true })
  await fsPromises.writeFile(filePath, data)
}

/**
 * Deletes a file if it exists.
 *
 * @param {string} filePath - The file path.
 * @returns {Promise<void>}
 */
export const deleteFile = async (filePath: string): Promise<void> => {
  try {
    await fsPromises.unlink(filePath)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error
    }
  }
}

/**
 * Checks if a file exists.
 *
 * @param {string} filePath - The file path.
 * @returns {Promise<boolean>}
 */
export const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fsPromises.access(filePath)
    return true
  } catch {
    return false
  }
}
