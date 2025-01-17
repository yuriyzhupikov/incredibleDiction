import { AudioFile } from '@value-object/AudioFile'
import { Phrase } from '@value-object/Phrase'

/**
 *
 */
export class Speech {
  /**
   *
   * @param id
   * @param audio
   * @param text
   */
  constructor(
    private readonly id: string, // Уникальный идентификатор речи
    private readonly audio: AudioFile, // Аудиофайл как Value Object
    private readonly text?: Phrase, // Текстовое представление (может отсутствовать)
  ) {}

  // Получение текста речи
  /**
   *
   */
  getText(): Phrase | undefined {
    return this.text
  }

  // Получение аудио
  /**
   *
   */
  getAudio(): AudioFile {
    return this.audio
  }

  // Получение идентификатора
  /**
   *
   */
  getId(): string {
    return this.id
  }
}
