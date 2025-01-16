export class AudioFile {
  constructor(
    private readonly path: string,
    private readonly format: string,
    private readonly size: number,
  ) {
    if (!path || !format) {
      throw new Error('Invalid audio file')
    }
  }

  getPath(): string {
    return this.path
  }

  getFormat(): string {
    return this.format
  }

  getSize(): number {
    return this.size
  }
}
