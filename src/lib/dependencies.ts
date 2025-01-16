import child_process from 'node:child_process'
import { promises as fsPromises } from 'node:fs'
import path from 'node:path'
import util from 'node:util'

import * as aws from '@aws-sdk/client-s3'
import ffmpeg from 'fluent-ffmpeg'

type NodeDependencies = {
  fs: typeof fsPromises
  path: typeof import('node:path')
  util: typeof import('node:util')
  child_process: typeof import('node:child_process')
}

type NpmDependencies = {
  aws: typeof import('@aws-sdk/client-s3')
  ffmpeg: typeof ffmpeg
}

const node: NodeDependencies = {
  fs: fsPromises,
  path,
  util,
  child_process,
}

const npm: NpmDependencies = {
  aws,
  ffmpeg,
}

export const dependencies = { node, npm }
