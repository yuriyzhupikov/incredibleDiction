import { strictEqual } from 'node:assert'
import { test } from 'node:test'

import { Phrase } from '@value-object/Phrase'

test('Phrase: нормализация текста приводит его к нижнему регистру', () => {
  const phrase = new Phrase('  Hello WORLD  ')
  const normalizedPhrase = phrase.normalize()

  strictEqual(normalizedPhrase.getValue(), 'hello world')
})

test('Phrase: равные фразы считаются одинаковыми после нормализации', () => {
  const phrase1 = new Phrase('Hello World')
  const phrase2 = new Phrase(' hello world ')

  strictEqual(phrase1.equals(phrase2), true)
})
