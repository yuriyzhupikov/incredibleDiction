// import assert from 'node:assert'
// import { describe, test } from 'node:test'
//
// import { ScoringDomainService } from '@service/ScoringDomainService'
//
// import { ScoringService } from '@application/service/scoring.service'
// import { AudioFile } from '@value-object/AudioFile'
//
// const scoringDomainService = new ScoringDomainService()
// const scoringService = new ScoringService(scoringDomainService)
//
// describe('E2E: ScoringService with realistic scenario', (t) => {
//   test('E2E: Different audio files in the form of an array of bytes', async () => {
//     const originalSample = new Float32Array([1, 2, 4])
//     const userSample = new Float32Array([1, 2, 3])
//
//     const userAudio = new AudioFile('userAudioPath', userSample, 'wav')
//     const originAudio = new AudioFile('originalAudioPath', originalSample, 'wav')
//
//     const result = scoringService.calculateScore(userAudio, originAudio)
//
//     assert.strictEqual(result.getValue(), !result.isPassing(), 'There was a mismatch')
//   })
//   test('E2E: Identical audio files in the form of an array of bytes', async () => {
//     const originalSample = new Float32Array([1, 2, 3])
//     const userSample = new Float32Array([1, 2, 3])
//
//     const userAudio = new AudioFile('userAudioPath', userSample, 'wav')
//     const originAudio = new AudioFile('originalAudioPath', originalSample, 'wav')
//
//     const result = scoringService.calculateScore(userAudio, originAudio)
//
//     assert.strictEqual(result.getValue(), result.isPassing(), 'Full compliance')
//   })
// })
