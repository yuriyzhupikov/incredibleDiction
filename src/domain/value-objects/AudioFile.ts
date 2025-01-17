/**
 * Class representing an audio file.
 */
export class AudioFile {
  /**
   * Creates an instance of AudioFile.
   *
   * @param {string} path - The file path.
   * @param {string} format - The file format.
   * @param {number} size - The file size in bytes.
   * @throws {Error} Throws an error if the path or format is invalid.
   */
  constructor(
    private readonly path: string,
    private readonly format: string,
    private readonly size: number,
  ) {
    if (!path || !format) {
      throw new Error('Invalid audio file')
    }
  }

  /**
   * Retrieves the file path.
   *
   * @returns {string} The file path.
   */
  getPath(): string {
    return this.path
  }

  /**
   * Retrieves the file format.
   *
   * @returns {string} The file format.
   */
  getFormat(): string {
    return this.format
  }

  /**
   * Retrieves the file size.
   *
   * @returns {number} The file size in bytes.
   */
  getSize(): number {
    return this.size
  }
}
