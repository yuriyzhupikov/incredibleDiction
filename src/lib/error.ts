/**
 * @param {unknown} error
 * @param {string} contextMessage
 */
export const handleError = (error: unknown, contextMessage: string): void => {
  if (error instanceof Error) {
    const msg = error.message ? `${contextMessage}: ${error.message}` : contextMessage
    console.error(msg)
  } else {
    console.error(`${contextMessage}: An unknown error occurred.`, error)
  }
}
