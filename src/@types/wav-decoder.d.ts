declare module 'wav-decoder' {
  async function decode(
    buffer: Buffer,
    opts?: any,
  ): Promise<{
    numberOfChannels: number
    length: number
    sampleRate: number
    channelData: globalThis.Float32Array[]
  }>
}
