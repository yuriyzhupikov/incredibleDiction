import { playAudio } from '@lib/audio'

/**
 *
 */
export class AudioPlayer {
  /**
   *
   */
  async play(filePath: string): Promise<void> {
    await playAudio(filePath)
  }
}
