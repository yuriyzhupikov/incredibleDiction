import { AudioFile } from '@value-object/AudioFile'
import { Phrase } from '@value-object/Phrase'

/** The class for representing speech. */
export class Speech {
  /**
   * @param {string} id The unique identifier of the speech.
   * @param {AudioFile} audio The audio file as a Value Object.
   * @param {Phrase} [text] Text representation (may be missing).
   */
  private constructor(
    private readonly id: string,
    private readonly audio: AudioFile,
    private readonly text?: Phrase,
  ) {}

  /**
   * Factory method to create a Speech instance with validations.
   *
   * @param id
   * @param audio
   * @param text
   * @returns {Speech}
   */
  static create(id: string, audio: AudioFile, text?: Phrase): Speech {
    if (!id) throw new Error('ID cannot be empty')
    // Additional validations can go here
    return new Speech(id, audio, text)
  }

  /** Example method to get text representation */
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
