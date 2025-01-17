import readlineSync from 'readline-sync'

/**
 * Handles user input from the console.
 */
export class CLIInput {
  /**
   * Prompts the user for input.
   * @param {string} question - The question to display to the user.
   * @returns {string} - The user's input.
   */
  prompt(question: string): string {
    return readlineSync.question(`${question}\n> `)
  }
}
