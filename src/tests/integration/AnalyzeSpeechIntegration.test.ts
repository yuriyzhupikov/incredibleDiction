import { strictEqual } from 'node:assert'
import { test } from 'node:test'

import { ScoringService } from '@application/service/scoring.service'
import { SpeechService } from '@application/service/speech-analysis.service'
import { AnalyzeSpeechUseCase } from '@application/usecase/analyze-speech.usecase'
import { AudioProcessor } from '@infrastructure/audio/AudioProcessor'
import { ScoringDomainService } from '@service/ScoringDomainService'

test('AnalyzeSpeechUseCase: анализирует аудио и возвращает корректный результат', async () => {
  const audioProcessor = new AudioProcessor()
  const speechService = new SpeechService(audioProcessor)
  const scoringDomainService = new ScoringDomainService()
  const scoringService = new ScoringService(scoringDomainService)

  const analyzeSpeechUseCase = new AnalyzeSpeechUseCase(speechService, scoringService)

  const audioFilePath = './tests/mocks/audio/test.wav'
  const referenceText = 'This is a test phrase'

  const result = await analyzeSpeechUseCase.execute(audioFilePath, referenceText)

  strictEqual(result.analyzedText, 'This is a test phrase')
  strictEqual(result.score.getValue(), 100)
})
