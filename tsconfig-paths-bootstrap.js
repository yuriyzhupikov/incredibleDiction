const tsconfigPathsBootstrap = require('tsconfig-paths')
const tsConfig = require('./tsconfig.json')

tsconfigPathsBootstrap.register({
  baseUrl: tsConfig.compilerOptions.outDir,
  paths: tsConfig.compilerOptions.paths,
})
