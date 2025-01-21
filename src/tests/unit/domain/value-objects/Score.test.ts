import assert from 'node:assert'
import { describe, test } from 'node:test'

import { Score } from '@value-object/Score'

describe('Score class tests', (t) => {
  test('should create a Score instance successfully', () => {
    const scoreValue = 3
    const score = new Score(scoreValue)

    assert.strictEqual(score.getValue(), scoreValue, 'Value should match the input value')
    assert.strictEqual(score.isPassing(), true, `The score must be ${score.getThreshold()} or lower`)
  })

  test('should correctly identify failing scores', () => {
    const scoreValue = 22
    const score = new Score(scoreValue)

    assert.strictEqual(score.isPassing(), false, `Score should not be passable for values above ${score.getThreshold()}`)
  })

  test('should throw an error for invalid scores', () => {
    assert.throws(() => new Score(-10), /Score must be than more 0/, 'Should throw for negative values')
  })
})
