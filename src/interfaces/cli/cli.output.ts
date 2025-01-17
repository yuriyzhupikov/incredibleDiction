/**
 *
 */
export class CLIOutput {
  // Вывод успешного сообщения
  /**
   *
   * @param message
   */
  success(message: string): void {
    console.log(`✅ ${message}`)
  }

  // Вывод информационного сообщения
  /** @param message */
  info(message: string): void {
    console.log(`ℹ️ ${message}`)
  }

  // Вывод ошибки
  /**
   *
   * @param message
   */
  error(message: string): void {
    console.error(`❌ ${message}`)
  }
}
