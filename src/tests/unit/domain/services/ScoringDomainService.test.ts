import { strictEqual, deepStrictEqual } from 'node:assert'
import { test } from 'node:test'

import { ScoringDomainService } from '@service/ScoringDomainService'
import { Phrase } from '@value-object/Phrase'

test('ScoringDomainService: совпадающие тексты дают 100 баллов', () => {
  const scoringService = new ScoringDomainService()
  const userSpeech = new Phrase('This is a test phrase')
  const referenceText = new Phrase('This is a test phrase')

  const score = scoringService.calculateScore(userSpeech, referenceText)

  strictEqual(score.getValue(), 100)
})

test('ScoringDomainService: различия в текстах снижают баллы', () => {
  const scoringService = new ScoringDomainService()
  const userSpeech = new Phrase('This is a phrase')
  const referenceText = new Phrase('This is a test phrase')

  const score = scoringService.calculateScore(userSpeech, referenceText)

  strictEqual(score.getValue() < 100, true)
})
