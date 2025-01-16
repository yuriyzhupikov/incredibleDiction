export class CLIOutput {
  // Вывод успешного сообщения
  success(message: string): void {
    console.log(`✅ ${message}`)
  }

  // Вывод информационного сообщения
  info(message: string): void {
    console.log(`ℹ️ ${message}`)
  }

  // Вывод ошибки
  error(message: string): void {
    console.error(`❌ ${message}`)
  }
}
