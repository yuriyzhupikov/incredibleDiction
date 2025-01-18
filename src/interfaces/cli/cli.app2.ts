import { ScoringDomainService } from '@service/ScoringDomainService'

import { ScoringService } from '@application/service/scoring.service'
import { SpeechService } from '@application/service/speech-analysis.service'
import { RepeatSpeechUseCase } from '@application/usecase/repeat-speech.usecase'
import { AudioPlayer } from '@infrastructure/audio/AudioPlayer'
import { AudioRecorder } from '@infrastructure/audio/AudioRecorder'

import { CLIInput } from './cli.input'
import { CLIOutput } from './cli.output'
;(async () => {
  const cliInput = new CLIInput()
  const cliOutput = new CLIOutput()

  const audioPlayer = new AudioPlayer()
  const audioRecorder = new AudioRecorder()
  const speechService = new SpeechService()
  const scoringService = new ScoringService(new ScoringDomainService())

  const repeatSpeechUseCase = new RepeatSpeechUseCase(speechService, scoringService, audioRecorder, audioPlayer, cliInput, cliOutput)

  // Указываем путь к оригинальному аудиофайлу
  const originalAudioPath = './original-speech.wav'

  // Запуск сценария
  try {
    await repeatSpeechUseCase.execute(originalAudioPath)
  } catch (error) {
    cliOutput.error(error, 'Error executing repeatSpeechUseCase.execute()')
  }
})()
