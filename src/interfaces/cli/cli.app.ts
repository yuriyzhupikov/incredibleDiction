import { ScoringDomainService } from '@service/ScoringDomainService'

import { ScoringService } from '@application/service/scoring.service'
import { SpeechService } from '@application/service/speech-analysis.service'
import { AnalyzeSpeechUseCase } from '@application/usecase/analyze-speech.usecase'
import { AudioRecorder } from '@infrastructure/audio/AudioRecorder'

import { CLIInput } from './cli.input'
import { CLIOutput } from './cli.output'
import { RecordController } from './controllers/record.controller'
import { ScoreController } from './controllers/score.controller'

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

// Main CLI method
;(async () => {
  console.log('Welcome to the CLI application!')
  console.log('Choose a command:')
  console.log('Record audio: record')
  console.log('Analyze speech accuracy: analyze')

  const args = process.argv.slice(2)
  switch (args[0]) {
    case 'record':
      await recordController.handle()
      break
    case 'analyze':
      await scoreController.handle()
      break
    default:
      console.log('❌ Unknown command. Use record or analyze.')
  }

  // // Главный метод CLI
  // ;(async () => {
  //   console.log('Добро пожаловать в приложение CLI!')
  //   console.log('Выберите команду:')
  //   console.log('1 - Записать аудио')
  //   console.log('2 - Оценить точность речи')
  //
  //   const choice = cliInput.prompt('Введите номер команды:')
  //
  //   switch (choice) {
  //     case '1':
  //       await recordController.handle()
  //       break
  //     case '2':
  //       await scoreController.handle()
  //       break
  //     default:
  //       cliOutput.error('Неизвестная команда.')
  //   }
  // })()
})()
