export const config = {
  audioPath: process.env.AUDIO_PATH || './audio',
  dbConnectionString: process.env.DB_CONNECTION || 'mongodb://localhost:27017',
  audioUploadPath: './uploads/audio',
}
