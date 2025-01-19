/** Class representing an audio file. */
export class AudioFile {
  /**
   * Creates an instance of AudioFile.
   *
   * @param {string} path - The file path.
   * @param {Float32Array} sample - Sdf
   * @param {string} format - The file format.
   * @throws {Error} Throws an error if the path or format is invalid.
   */
  constructor(
    private readonly path: string,
    private readonly sample: globalThis.Float32Array,
    private readonly format: string,
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
   * Retrieves the sample of file.
   *
   * @returns {Float32Array} The sample of file.
   */
  getSample(): globalThis.Float32Array {
    return this.sample
  }

  /**
   * Retrieves the file format.
   *
   * @returns {string} The file format.
   */
  getFormat(): string {
    return this.format
  }
}
