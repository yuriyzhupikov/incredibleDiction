import assert from 'node:assert'
import { describe, test } from 'node:test'

import { ScoringDomainService } from '@service/ScoringDomainService'

describe('ScoringDomainService class tests', (t) => {
  test('should calculate a valid score', () => {
    const service = new ScoringDomainService()
    const rawScore = 4

    const score = service.calculateScore(rawScore)

    assert.strictEqual(score.getValue(), rawScore, 'Score value should match rawScore')
    assert.strictEqual(score.isPassing(), true, 'The score must be 5 or lower')
  })

  test('should throw an error for invalid rawScore', () => {
    const service = new ScoringDomainService()

    assert.throws(() => service.calculateScore(-5), /Score must be than more 0/, 'Should throw for invalid rawScore')
  })
})
