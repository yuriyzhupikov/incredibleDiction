import { decodeWav } from '@lib/audio'

import { Phrase } from '@value-object/Phrase'

/** Service for analyzing speech audio. */
export class SpeechService {
  /**
   * Analyzes an audio file and extracts text.
   *
   * @param {string} audioFilePath - The path to the audio file.
   * @returns {Promise<Phrase>} - The extracted text as a Phrase value object.
   */
  async analyzeAudio(audioFilePath: string): Promise<globalThis.Float32Array> {
    return await decodeWav(audioFilePath)
    // const text = await convertAudioToText(filePath)
    // return new Phrase(text)
  }
}
