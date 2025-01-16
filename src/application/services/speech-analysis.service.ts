import { Phrase } from '@value-object/Phrase'

import { convertAudioToText } from '@lib/audio-processing'

export class SpeechService {
  async analyzeAudio(filePath: string): Promise<Phrase> {
    const text = await convertAudioToText(filePath)
    return new Phrase(text)
  }
}
