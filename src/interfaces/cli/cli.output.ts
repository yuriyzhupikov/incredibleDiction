/** Outputs messages to the console. */
export class CLIOutput {
  /**
   * Outputs a success message.
   *
   * @param {string} message - The success message to display.
   */
  success(message: string): void {
    console.log(`✅ ${message}`)
  }

  /**
   * Outputs an informational message.
   *
   * @param {string} message - The informational message to display.
   */
  info(message: string): void {
    console.log(`ℹ️ ${message}`)
  }

  /**
   * Outputs an error message.
   *
   * @param {string} message - The error message to display.
   */
  error(message: string): void {
    console.error(`❌ ${message}`)
  }
}
