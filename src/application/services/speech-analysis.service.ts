import { convertAudioToText } from '@lib/audio-processing'

import { Phrase } from '@value-object/Phrase'

/**
 *
 */
export class SpeechService {
  /**
   *
   * @param filePath
   */
  async analyzeAudio(filePath: string): Promise<Phrase> {
    const text = await convertAudioToText(filePath)
    return new Phrase(text)
  }
}
