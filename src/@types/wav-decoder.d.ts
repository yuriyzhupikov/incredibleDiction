declare module 'wav-decoder' {
  function decodeSync(buffer: Buffer, opts?: any)
  async function decode(
    buffer: Buffer,
    opts?: any,
  ): Promise<{
    numberOfChannels: number
    length: number
    sampleRate: number
    channelData: Float32Array<number>[]
  }>
}
