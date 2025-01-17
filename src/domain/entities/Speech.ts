import { AudioFile } from '@value-object/AudioFile'
import { Phrase } from '@value-object/Phrase'

/**
 * The class for representing speech.
 */
export class Speech {
  /**
   *
   * @param {string} id The unique identifier of the speech.
   * @param {AudioFile} audio The audio file as a Value Object.
   * @param {Phrase} [text] Text representation (may be missing).
   */
  constructor(
    private readonly id: string,
    private readonly audio: AudioFile,
    private readonly text?: Phrase,
  ) {}

  /**
   * Getting the text of speech.
   *
   * @returns {Phrase | undefined} The text representation of speech, or undefined if there is no text.
   */
  getText(): Phrase | undefined {
    return this.text
  }

  /**
   * Getting the audio.
   *
   * @returns {AudioFile} The audio file of the speech.
   */
  getAudio(): AudioFile {
    return this.audio
  }

  /**
   * Getting the ID.
   *
   * @returns {string} The unique identifier of the speech.
   */
  getId(): string {
    return this.id
  }
}
