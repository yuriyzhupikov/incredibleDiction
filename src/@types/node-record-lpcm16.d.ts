/** Module for recording audio in LPCM 16-bit format using Node.js. */
declare module 'node-record-lpcm16' {
  import { Readable } from 'stream'

  /** Options for configuring the audio recording. */
  interface RecordOptions {
    /** The sample rate of the recording in Hz. Default is 16000. */
    sampleRate?: number

    /** The number of audio channels (e.g., 1 for mono, 2 for stereo). Default is 1. */
    channels?: number

    /** The amplitude threshold for detecting sound. Default is 0. */
    threshold?: number

    /** Whether to end recording on silence detection. Default is false. */
    endOnSilence?: boolean

    /** The duration of silence (in seconds) that triggers the end of recording when `endOnSilence` is true. Default is 1 second. */
    silence?: number
  }

  /** Recorder instance for managing audio recording. */
  interface Recorder {
    /**
     * Starts recording audio with the specified options.
     *
     * @param {RecordOptions} options - Configuration options for recording.
     * @returns The recorder instance.
     */
    record(options?: RecordOptions): Recorder

    /**
     * Returns a readable stream of the recorded audio data.
     *
     * @returns A readable stream of audio data in LPCM 16-bit format.
     */
    stream(): Readable
  }

  /** The main recorder instance. */
  const recorder: Recorder

  export = recorder
}
