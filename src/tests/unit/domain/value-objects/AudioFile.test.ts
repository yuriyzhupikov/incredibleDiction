import assert from 'node:assert'
import { describe, test } from 'node:test'

import { AudioFile } from '@value-object/AudioFile'

describe('AudioFile class tests', (t) => {
  test('should create an AudioFile instance successfully', () => {
    const path = '/path/to/audio.wav'
    const sample = new Float32Array([0.1, 0.2, 0.3])
    const format = 'wav'

    const audioFile = new AudioFile(path, sample, format)

    assert.strictEqual(audioFile.getPath(), path, 'Path should match the input value')
    assert.deepStrictEqual(audioFile.getSample(), sample, 'Sample should match the input value')
    assert.strictEqual(audioFile.getFormat(), format, 'Format should match the input value')
  })

  test('should throw an error for missing path or format', () => {
    assert.throws(() => new AudioFile('', new Float32Array([0.1]), 'wav'), /Invalid audio file/, 'Should throw for empty path')
    assert.throws(() => new AudioFile('/path/to/audio.wav', new Float32Array([0.1]), ''), /Invalid audio file/, 'Should throw for empty format')
  })

  test('should correctly return properties', () => {
    const path = '/path/to/audio.mp3'
    const sample = new Float32Array([1.0, 0.5])
    const format = 'mp3'

    const audioFile = new AudioFile(path, sample, format)

    assert.strictEqual(audioFile.getPath(), path, 'getPath() should return the correct path')
    assert.deepStrictEqual(audioFile.getSample(), sample, 'getSample() should return the correct sample')
    assert.strictEqual(audioFile.getFormat(), format, 'getFormat() should return the correct format')
  })
})
