import { strictEqual } from 'node:assert'
import { exec } from 'node:child_process'
import { test } from 'node:test'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

test('CLI: успешно запускает команду анализа речи', async () => {
  const { stdout } = await execAsync('node dist/interfaces/cli/cli.app.js analyze ./tests/mocks/audio/test.wav "This is a test phrase"')

  strictEqual(stdout.includes('✅ Оценка точности речи завершена!'), true)
  strictEqual(stdout.includes('Баллы за точность: 100'), true)
})
