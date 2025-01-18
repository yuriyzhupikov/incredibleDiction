import { ScoringDomainService } from '@service/ScoringDomainService'

import { ScoringService } from '@application/service/scoring.service'
import { SpeechService } from '@application/service/speech-analysis.service'
import { AnalyzeSpeechUseCase } from '@application/usecase/analyze-speech.usecase'
import { RecordController } from '@controller/record.controller'
import { ScoreController } from '@controller/score.controller'
import { AudioRecorder } from '@infrastructure/audio/AudioRecorder'

import { CLIInput } from './cli.input'
import { CLIOutput } from './cli.output'

// Configure dependencies
const cliInput = new CLIInput()
const cliOutput = new CLIOutput()

const speechService = new SpeechService()
const scoringDomainService = new ScoringDomainService()
const scoringService = new ScoringService(scoringDomainService)
const analyzeSpeechUseCase = new AnalyzeSpeechUseCase(speechService, scoringService)

// Initialize controllers
const recordController = new RecordController(new AudioRecorder(), cliInput, cliOutput)
const scoreController = new ScoreController(analyzeSpeechUseCase, cliInput, cliOutput)

// ;(async () => {
//   console.log('Welcome to the CLI application!')
//   console.log('Choose a command:')
//   console.log('Record audio: record')
//   console.log('Analyze speech accuracy: analyze')
//
//   const args = process.argv.slice(2)
//   switch (args[0]) {
//     case 'record':
//       await recordController.handle()
//       break
//     case 'analyze':
//       await scoreController.handle()
//       break
//     default:
//       console.log('❌ Unknown command. Use record or analyze.')
//   }
// })()

;(async () => {
  console.log('Welcome to the IncredibleDiction CLI app!')
  console.log('Choose command:')
  console.log('1 - Record audio')
  console.log('2 - Evaluate the accuracy of speech')

  const choice = cliInput.prompt('Enter the command number:')

  switch (choice) {
    case '1':
      await recordController.handle()
      break
    case '2':
      await scoreController.handle()
      break
    default:
      cliOutput.error(new Error(''), '❌ Unknown command.')
  }
})()
