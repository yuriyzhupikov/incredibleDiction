import { convertAudioToText } from '@lib/audio-processing'

import { Phrase } from '@value-object/Phrase'

/**
 * Service for analyzing speech audio.
 */
export class SpeechService {
  /**
   * Analyzes an audio file and extracts text.
   * @param {string} filePath - The path to the audio file.
   * @returns {Promise<Phrase>} - The extracted text as a Phrase value object.
   */
  async analyzeAudio(filePath: string): Promise<Phrase> {
    const text = await convertAudioToText(filePath)
    return new Phrase(text)
  }
}