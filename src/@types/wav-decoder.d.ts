/** Module for decoding WAV audio files. */
declare module 'wav-decoder' {
  /**
   * Decodes a WAV file buffer into audio data.
   *
   * @param {Buffer} buffer - A `Buffer` containing the WAV file data.
   * @param {any} opts - Optional decoding options (currently unused or implementation-dependent).
   * @returns A promise that resolves to an object containing the decoded audio data.
   *
   *   The returned object includes:
   *
   *   - `numberOfChannels`: The number of audio channels (e.g., 1 for mono, 2 for stereo).
   *   - `length`: The total number of samples across all channels.
   *   - `sampleRate`: The sample rate of the audio in Hz.
   *   - `channelData`: An array of `Float32Array` objects, each representing the audio samples for a channel.
   */
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
