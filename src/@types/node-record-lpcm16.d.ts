declare module 'node-record-lpcm16' {
  import { Readable } from 'stream'

  interface RecordOptions {
    sampleRate?: number
    channels?: number
    threshold?: number
    endOnSilence?: boolean
    silence?: number
  }

  interface Recorder {
    record(options?: RecordOptions): Recorder
    stream(): Readable
  }

  const recorder: Recorder

  export = recorder
}
