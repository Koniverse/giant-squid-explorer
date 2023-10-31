import type { ProcessorConfig } from './processorConfig'
import fs from 'fs'
import { assertNotNull } from '@subsquid/substrate-processor'

export const BLACKLIST_CONFIG: IBlackListConfing = getJSON(
  'assets/blacklist-config.json'
)

interface IBlackListConfing {
  blacklistItems: string[]
  argsStringMaxLengthLimit: number
}

function getJSON(filename: string) {
  const data = fs.readFileSync(filename).toString()
  //console.log(data)
  return JSON.parse(data)
}

export function getChainConfig(): ProcessorConfig {
  switch (process.env.CHAIN) {
    case 'kusama':
      return require('./chains/kusama').config
    default:
      throw new Error(`Unsupported chain ${process.env.CHAIN}`)
  }
}

export const CHAIN_CONFIG = getChainConfig()
