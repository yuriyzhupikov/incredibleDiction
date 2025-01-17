import { question } from 'readline-sync'

/** Handles user input from the console. */
export class CLIInput {
  /**
   * Prompts the user for input.
   *
   * @param {string} userQuestion - The question to display to the user.
   * @returns {string} - The user's input.
   */
  prompt(userQuestion: string): string {
    return question(`${userQuestion}\n> `)
  }
}
