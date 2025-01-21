// import path from 'path'
//
// import ffmpeg from 'fluent-ffmpeg'
//
// //ffmpeg -f alsa -ac 1 -ar 16000 -i default -t 5 -filter:a "atempo=1.5" -af "highpass=f=200, lowpass=f=3000" record_voice4.wav
//
// const convertToWav = (inputPath, outputPath) => {
//   return new Promise((resolve, reject) => {
//     ffmpeg(inputPath)
//       .toFormat('wav')
//       .audioFrequency(16000)
//       .audioChannels(1)
//       .on('end', () => resolve(outputPath))
//       .on('error', (err) => reject(err))
//       .save(outputPath)
//   })
// }
//
// const inputFile = process.argv[2]
// if (!inputFile) {
//   process.exit(1)
// }
//
// const outputFile = path.basename(inputFile, path.extname(inputFile)) + '.wav'
//
// convertToWav(inputFile, outputFile)
//   .then((file) => console.log('Ok:', file))
//   .catch((err) => console.error('Error:', err))
