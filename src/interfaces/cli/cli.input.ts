import readlineSync from 'readline-sync'

export class CLIInput {
  // Метод для запроса данных у пользователя
  prompt(question: string): string {
    return readlineSync.question(`${question}\n> `)
  }
}
