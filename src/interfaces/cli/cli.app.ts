import { ScoringService } from '@application/service/scoring.service'
import { SpeechService } from '@application/service/speech-analysis.service'
import { AnalyzeSpeechUseCase } from '@application/usecase/analyze-speech.usecase'
import { AudioRecorder } from '@infrastructure/audio/AudioRecorder'
import { ScoringDomainService } from '@service/ScoringDomainService'

import { CLIInput } from './cli.input'
import { CLIOutput } from './cli.output'
import { RecordController } from './controllers/record.controller'
import { ScoreController } from './controllers/score.controller'

// Конфигурируем зависимости
const cliInput = new CLIInput()
const cliOutput = new CLIOutput()

const speechService = new SpeechService()
const scoringDomainService = new ScoringDomainService()
const scoringService = new ScoringService(scoringDomainService)
const analyzeSpeechUseCase = new AnalyzeSpeechUseCase(speechService, scoringService)

// Подключаем контроллеры
const recordController = new RecordController(new AudioRecorder(), cliInput, cliOutput)
const scoreController = new ScoreController(analyzeSpeechUseCase, cliInput, cliOutput)

// Главный метод CLI
;(async () => {
  console.log('Добро пожаловать в приложение CLI!')
  console.log('Выберите команду:')
  console.log('Записать аудио: record')
  console.log('Оценить точность речи: analyze')

  const args = process.argv.slice(2)
  switch (args[0]) {
    case 'record':
      await recordController.handle()
      break
    case 'analyze':
      await scoreController.handle()
      break
    default:
      console.log('❌ Неизвестная команда. Используйте record или analyze.')
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
