export class Score {
  constructor(private readonly value: number) {
    if (value < 0 || value > 100) {
      throw new Error('Score must be between 0 and 100')
    }
  }

  getValue(): number {
    return this.value
  }

  isPassing(): boolean {
    return this.value >= 70 // Например, 70 и выше считается успешным
  }
}
