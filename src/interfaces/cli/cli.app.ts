import { ScoringDomainService } from '@service/ScoringDomainService'

import { ScoringService } from '@application/service/scoring.service'
import { SpeechService } from '@application/service/speech-analysis.service'
import { RepeatSpeechUseCase } from '@application/usecase/repeat-speech.usecase'
import { AudioProcessor } from '@infrastructure/audio/AudioProcessor'

import { CLIInput } from './cli.input'
import { CLIOutput } from './cli.output'
;(async () => {
  const cliInput = new CLIInput()
  const cliOutput = new CLIOutput()

  const audioProcessor = new AudioProcessor()
  const speechService = new SpeechService()
  const scoringService = new ScoringService(new ScoringDomainService())

  const repeatSpeechUseCase = new RepeatSpeechUseCase(speechService, scoringService, audioProcessor, cliInput, cliOutput)

  const originalAudioPath = `${process.cwd()}/uploads/audio/samples/short_voice.wav`

  try {
    await repeatSpeechUseCase.execute(originalAudioPath)
  } catch (error) {
    cliOutput.error(error, 'Error executing repeatSpeechUseCase.execute()')
  }
})()
