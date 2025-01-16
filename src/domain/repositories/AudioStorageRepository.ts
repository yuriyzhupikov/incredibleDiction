export interface AudioStorageRepository {
  /**
   * Сохраняет аудиофайл.
   * @param userId - Идентификатор пользователя.
   * @param fileName - Имя файла.
   * @param fileBuffer - Данные файла.
   * @returns Путь к сохраненному файлу (или URL в случае облачного хранилища).
   */
  save(userId: string, fileName: string, fileBuffer: Buffer): Promise<string>

  /**
   * Удаляет аудиофайл.
   * @param userId - Идентификатор пользователя.
   * @param fileName - Имя файла.
   */
  delete(userId: string, fileName: string): Promise<void>
}
